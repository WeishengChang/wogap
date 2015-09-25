var SERVER_PATH = '../laravel/public/index.php/';
App.Router.map(function() {
	this.route('home');
	this.route('logout');
	this.route('management', function() {
		this.route('player', {path: '/player', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
		});
		this.route('playerHero');
		this.route('playerCP');
		this.route('playeritem', {path: '/playeritem', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
		});
		this.route('playerEquipment');
		this.route('playerDepot');
		this.route('playerExchange');
		this.route('playerChExp');
		this.route('playerSkill');
		this.route('playerSkillSetup');
		this.route('playerMission');
		this.route('playerKey');
		this.route('playerPet');
		this.route('playerMercenary');
		this.route('playerBuff');
		this.route('playerMessage');
		this.route('playerLog');
		this.route('playerMail');
		this.route('playerFriend');
		
		this.route('item', {path: '/item/:type'});
		this.route('itemUsed');
		this.route('itemStone');
		this.route('itemPlus');
		this.route('itemKey');
		this.route('itemHonor');
		this.route('itemSale');
		this.route('itemSyn');
		this.route('exchange');
		this.route('exchangeBook');
		this.route('team');
		this.route('teamJoin');
		this.route('avatar');
		this.route('character');
		this.route('characterSkill');
		this.route('monster');
	});
	this.route('config');
	this.route('stats', function() {
		this.route('bars', function() {
			this.route('basics', {path: '/basics/:field'});
			this.route('steps');
		});
	});
});

Ember.Route.reopen({
	getParentRoute: function(){
    var route = this;
    var handlerInfos = route.router.router.currentHandlerInfos;
    var parent, current;

    for (var i=0, l=handlerInfos.length; i<l; i++) {
      current = handlerInfos[i].handler;
      if((current.routeName === route.routeName)||(current.routeName.match(/./) && current.routeName.split('.')[1] === route.routeName )){
        return parent.routeName;
      }
      parent = current;
    }
  }
});
App.variable = {
	sex: {1: '男', 2: '女'},
	s_property: {1: '地', 2: '水', 3: '火', 4: '木', 5: '風', 6: '毒'},
	userlv: {0: 'PC(普通玩家)', 1: 'SA(系統管理員)', 2: 'GM(遊戲管理員)'}
};
App.TabRoute = Ember.Route.extend({
	panel: null,
	renderTemplate: function() {
		this.render({outlet: "tabOutlet"});
	},
	__attachToTab: function() { //新增內容到頁籤
		Ember.run.scheduleOnce('afterRender', this, function() {
			var $view = $('#tabOutlet');
			var $tabs = $('#tabs');
			$view.removeAttr('id').before('<div id="#tabOutlet"/>').detach().append('<div class="__"/>');
			$tabs.tabs('add', {
				title: this.title || "新頁籤",
				content: $view,
				tools: [{
					iconCls: 'icon-mini-lock-off',
					handler: function() {
						console.log(this, arguments);
					}
				}]
			});
			this.panel = $tabs.tabs('getSelected');
			$view.find('div.__').last().unwrap().remove();
		});
	}.on('activate'),
	__detachFromTab: function() { //把頁籤移除
		var $tab = $('#tabs');
		$tab.tabs('close', $tab.tabs('getTabIndex', this.panel));
	}.on('deactivate')
});

App.TabDatagridRoute = App.TabRoute.extend({
	gridPanel: null,
	getDatagrid: function() {
		return this.gridPanel;
	},
	model: function() {
		//最後會回傳gridParams, 供DialogRoute做存取用
		//example: 要使用PlayerRoute的model，targetModel要設定為player
		//               之後就能在DialogRoute中呼叫this.model()抓回model(gridParams)
		var route = this;
		if(this.gridParamsUrl) {
			return $.getJSON(this.gridParamsUrl).then(function(json) {
				if(route.gridParams && route.gridParams.columns) {
					route.gridParams.columns = [_mixColumns(json.columns[0] || [], route.gridParams.columns)];
					delete json.columns;
				}
				route.gridParams = $.extend(route.gridParams || {}, json || {});
				delete route.gridParamsUrl;
				_filterHidden(route);
				//console.log(route.gridParams);
				return [route, route.gridParams || {}];
			});
		} else {
			return [route, this.gridParams || {}];
		}
		
		function _mixColumns(A, B) {
			//先建立A的MAP
			var AMap = {};
			$.each(A, function(i, column) {
				AMap[column.field] = i;
			});
			//透過field把參數融入
			$.each(B, function(i, column) {
				if(!AMap[column.field]) {
					return;
				}
				A[AMap[column.field]] = $.extend(A[AMap[column.field]], column);
			});
			return A;
		}
		
		//將hidden columns 從fields中移除，並在getSelected時從原始資料中抓取資料
		//不移除hidden column時，繪製有大量column(不論是否有顯示)的表格會相當慢
		//TODO: 實作自訂顯示的column時要有對應的mappings
		function _filterHidden(route) { 
			var newColumnGroups = [];
			$.each(route.gridParams.columns, function(i, group) {
				var newColumns = [];
				$.each(group, function(k, column) {
					if(column.hidden !== true) {
						newColumns.push(column);
					}
				});
				newColumnGroups.push(newColumns);
			});
			
			route.gridParams._rawColumns = route.gridParams.columns;
			route.gridParams.columns = newColumnGroups;
			route.gridParams.onLoadSuccess = function(data) {
				route.gridParams._rawData = data.rows;
			};
		}
	},
	afterRender: function() {
		this._super();
		if(!this.gridParams && !this.gridParams) return;
		var route = this;
		//綁上資料表格參數
		//讓easyUI的toolbar新增action屬性(string)，可以對應到Ember Route 的Action
		if(route.gridParams && route.gridParams.toolbar) {
			$.each(route.gridParams.toolbar, function(i, item) {
				if(item.action) {
					var oldHandler = item.handler || $.noop;
					item.handler = function() {
						oldHandler.apply(this, arguments);
						route.send(item.action);
					};
				}
			});
		}
		//實體化
		this.gridPanel = $('<div/>').appendTo(this.panel).datagrid(route.gridParams);
	},
	actions: {
		add: function() { //按下[新增]的按鈕
			delete this.gridParams['selected'];
		},
		edit: function() { //按下[編輯]的按鈕
			var row = $(this.getDatagrid()).datagrid('getSelected');
			if(!row) {
				alert('沒有選擇列');
				return false;
			}
			//暫存選取列的資料，供editor dialog做載入用
			this.gridParams['selected'] = this.gridParams._rawData[ $(this.getDatagrid()).datagrid('getRowIndex', row) ];
		},
		del: function(url) {
			var route = this;
			if(typeof url === 'string') {
				$.post(SERVER_PATH+url).done(function(data) {
					$.messager.notification("刪除成功");
					if(data.reload === true) {
						route.send("reloadGrid");
					}
				}).fail(function(xhr) {
					$.messager.notification(xhr.responseJSON);
				});
			} else {
				var row = $(this.getDatagrid()).datagrid('getSelected');
				if(!row) {
					alert('沒有選擇列');
					return false;
				}
				if(!confirm('確定刪除？')) {
					return false;
				}
				//暫存選取列的資料，供editor dialog做載入用
				this.gridParams['selected'] = this.gridParams._rawData[ $(this.getDatagrid()).datagrid('getRowIndex', row) ];
				return true;
			}
		},
		reloadGrid: function() { //名字設為reload會進入未知的無窮迴圈，待除錯
			//console.log('invoke...');
			this.gridPanel.datagrid("reload");
			return false;
		}
	}
});

App.Dialog = Ember.Mixin.create({
	$_dialog: null,
	formData: {},
	getDialog: function() {
		return this.$_dialog;
	},
	_createDialog: function() {
		var route = this;
		this.$_dialog = $('<div style="width:600px;height:400px"/>').appendTo('body').dialog({
			closed: true,
			modal: true,
			buttons: this.buttons || [
				{
					text: '儲存',
					iconCls: 'icon-ok',
					handler: function() {
						route.formData = route.$_dialog.find('form').serialize();
						if(!route.url) {  //預設解析方式：player.add => ../server/index.php/player/add
							route.url = "../laravel/public/index.php/"+route.routeName.split(".").join("/");
						}
						//預設對url送出POST要求
						$.post(route.url, route.formData).done(function(data) {
							if(data.msg) {
								alert(data.msg);
							}
							
							if(data.reload === true) {
								//console.log('first send reload');
								route.send("reload");
							}
							route.$_dialog.dialog('close');
							//route.send('close');
						}).fail(function(xhr) {
							$.messager.notification(xhr.responseJSON);
						});
					}
				},
				{
					text: '取消',
					handler: function() {
						route.$_dialog.dialog('close');
						//route.send('close');
					}
				}
			],
			onClose: function() {
				route.send("close");
			}
		});
	}.on('activate'),
	_removeDialog: function() {
		this.$_dialog.dialog('close');
		this.$_dialog.remove();
	}.on('deactivate')
});

App.EditorRoute = Ember.Route.extend(App.Dialog, {
	title: "編輯器",
	targetModel: "",
	loadSelected: false,
	_cache_switch_list: [],
	parentRoute: null,
	model: function(params, transition) { //用來回傳selected row的資料
		var data = this.modelFor(this.targetModel);
		this.parentRoute = data[0];
			return data[1];
		
		
	},
	actions: {
		close: function() {
			//console.log('editor close, transition to', this.getParentRoute());
			this.transitionTo(this.getParentRoute());
			return false;
		},
		reload: function() {
			//console.log('editor send reload to parent');
			this.parentRoute.send("reloadGrid");
		}
	},
	afterRender: function() {
		var $dialog = this.getDialog();
		this._super();
		$dialog
			.dialog("setTitle", this.title)
			.html(this.createFormGroup.call(this))
			.dialog("open");
		$.parser.parse($dialog.find('table'));
		//先分析easyui的UI，再做form.load
		if(this.get('loadSelected') === true) {
			var selected = this.model().selected;
			if(!selected) { //沒資料就直接返回上一層
				this.transitionTo(this.getParentRoute());
			} else {
				$dialog.form('load', selected);
			}
			
		}
		//console.log(this.model.columns);
	},
	createFormGroup: function() {
		var route = this;
		var gridParams = this.model();
		var columns = gridParams._rawColumns[0];
		var group = gridParams.columnsGroup;
		var exclude = [];
		var text = ['<form method="post"><table width="98%" align="center" style="margin-top: 6px">'];
		var createForm = this.createForm;
		var columnmap = {};
		this._cache_switch_list = []; //重設內容
		$.each(columns, function(i, v) { //建立field => index 的 map
			columnmap[v.field] = i;
		});
		if(group) {
			$.each(group, function(name, childs) {
				text.push('<tr><td colspan="4" class="editor-group-title">'+name+'</td></tr>');
				text.push(createForm.call(route, columns, childs, exclude, columnmap));
				exclude = exclude.concat(childs);
			});
			if(columns.length > exclude.length) {
				text.push('<tr><td colspan="4" class="editor-group-title">其他</td></tr>');
				text.push(createForm.call(route, columns, [], exclude));
			}
		} else {
			text.push(route.createForm(columns, [], []));
		}
		text.push('</table></form>');
		return text.join('');
	},
	createForm: function(columns, include, exclude, map) {
		var route = this;
		var text = [];
		var i = 0;
		if(include.length > 0) {
			//只顯示有引入的欄位
			$.each(include, function(i, field) {
				if(typeof map[field] === 'undefined' || $.inArray(field, exclude) !== -1) { //不存在或已顯示過的都要排除掉
					return;
				}
				var column = columns[map[field]];
				if(column.readonly === true) {
					return;
				}
				if(i%2 === 0) {
					text.push('<tr>');
				}
				text.push('<td>'+column.title+':</td><td>'+_parse(column)+'</td>');
				if(i%2 === 1) {
					text.push('</tr>');
				}
				++i;
			});
		} else {
			$.each(columns || [], function(k, column) {
				if($.inArray(k, exclude) !== -1 || $.inArray(column.field, exclude) !== -1) {
					return;
				}
				if(i%2 === 0) {
					text.push('<tr>');
				}
				text.push('<td>'+column.title+':</td><td>'+_parse(column)+'</td>');
				if(i%2 === 1) {
					text.push('</tr>');
				}
				++i;
			});
		}
		
		return text.join('');
		
		function _parse(column) { //分析column設定，轉化為表格物件
			var opts = [];
			if(column.required === true) {
				opts.push('required:true');
			}
			if(column.type === 'email') {
				opts.push("validType:'email'");
				column.type = 'text';
			}
			opts = opts.join(',');
			switch(column.type) {
				case 'switch-boolean':
					route._cache_switch_list.push(column.field);
					return '<input name="'+column.field+'" class="easyui-switchbutton" data-options="value:\'1\'"/>';
				case 'select':
					return '<select name="'+column.field+'">'+_parseList(column.list || [])+'</select>';
					break;
				default:
					//text.push('<input type="text" name="'+column.field+'" class="easyui-textbox" data-options="'+opts+'"/>');
					return '<input type="text" name="'+column.field+'" data-options="'+opts+'"/>'; //有效能問題，暫時不使用easyui-textbox
					break;
			}
		}
		
		function _parseList(list) {
			var text = [];
			if(typeof list === 'array') {
				$.each(list, function(i, v) {
					text.push('<option value="'+v+'">'+v+'</option>');
				});
			} else {
				$.each(list, function(i, v) {
					text.push('<option value="'+i+'">'+v+'</option>');
				});
			}
			return text.join('');
		}
	}
});

App.ApplicationController = Ember.Controller.extend({
    updateCurrentPath: function() {
        App.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});

App.ApplicationRoute = Ember.Route.extend({
	actions: {
		error: function(error, transition) {
			//console.log(arguments);
			alert(error.responseJSON);
			return true;
		}
	},
	afterRender: function() {
		this._super();
		//2014/07/16: init fluent menu manually via container
		$.parser.parse('body');
		//TODO: fluent menu的顯示狀態隨著route path而改變 (2014/08/15)
	}
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('management');
	}
});
App.ManagementRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('submenu', {outlet: 'submenu'});
	},
	afterRender: function() {
		$.parser.parse('#submenu');
	}
});

App.PlayerRoute = App.TabDatagridRoute.extend({
	title: "玩家管理",
	gridParamsUrl: 'json/grid.player.json',
	gridParams: {
		url: SERVER_PATH+'player/show',
		autoRowHeight: false,
		pagination: true,
		columns: [
			{field: "p_email", type: 'email'},
			{field: "p_st", type: 'switch-boolean'},
			{field: "p_lock", type: 'switch-boolean'},
			{field: "p_npc", type: 'switch-boolean'},
			{field: "p_img_set", type: 'switch-boolean'},
			{field: "p_pk_s", type: 'switch-boolean'},
			{field: "p_cp_st", type: 'switch-boolean'},
			{field: 'p_sex', type: 'select', list: App.variable.sex},
			{field: 's_property', type: 'select', list: App.variable.s_property},
			{field: 'p_userlv', type: 'select', list: App.variable.userlv}
		], //擴充
		columnsGroup: {
			"基本資料": ['p_id', 'p_name', 'p_password', 'p_email', 'p_ipadd', 'act_num', 'act_num_time', 'p_act_time', 'p_online_time', 'p_cdate', 'p_lock', 'p_lock_time', 'p_sex', 's_property', 'ch_id', 'p_place', 'p_birth', 'p_money', 'p_bank', 'p_cash', 'p_st', 'p_userlv', 'p_npc'],
			"原始能力": ['base_str', 'base_smart', 'base_agi', 'base_life', 'base_vit', 'base_au', 'base_be'],
			"能力": ['str', 'smart', 'agi', 'life', 'vit', 'au', 'be'],
			"戰力": ['hp', 'hpmax', 'sp', 'spmax', 'at', 'df', 'mat', 'mdf', 'p_lv', 'p_sat_name', 'p_exp', 'p_nextexp', 'p_win', 'p_lost'],
		},
		toolbar: [
			{
				iconCls: 'icon-add',
				text: '新增',
				iconAlign: 'top',
				action: "add"
			}, 
			{
				iconCls: 'icon-edit',
				text: '編輯',
				iconAlign: 'top',
				action: 'edit'
			}, 
			{
				iconCls: 'icon-remove',
				text: '刪除',
				iconAlign: 'top',
				action: 'del'
			}, '-',
			{
				iconCls: 'icon-pet',
				text: '已封鎖',
				iconAlign: 'top',
				handler: function() {}
			}
		]
	},
	actions: {
		add: function() {
			this._super();
			this.transitionTo("player.add");
		},
		edit: function() {
			if(this._super() === false) {
				return;
			}
			this.transitionTo("player.edit", this.gridParams.selected.p_id);
		},
		del: function() {
			if(this._super() === true && this._super('player/del/'+this.gridParams.selected.p_id) === false) {
				return;
			}
		}
	}
});
App.PlayerAddRoute = App.EditorRoute.extend({
	title: "新增玩家",
	targetModel: "player",
	actions: {
		save: function() {
		}
	}
});
App.PlayerEditRoute = App.EditorRoute.extend({
	title: "編輯玩家",
	targetModel: "player",
	loadSelected: true,
	actions: {
		save: function() {
		}
	}
});

App.PlayeritemRoute = App.TabDatagridRoute.extend({
	title: "玩家物品管理",
	gridParamsUrl: 'json/grid.playeritem.json',
	gridParams: {
		url: SERVER_PATH+'playeritem/show',
		autoRowHeight: false,
		pagination: true,
		columns: [
			{field: "a_id", type: 'itemlist'}
		], //擴充
		columnsGroup: {
			"基本資料": ['p_id', 'p_name'],
			"裝備": ['a_id', 'd_head_id', 'd_body_id', 'd_hand_id', 'd_foot_id', 'd_item_id'],
			"能力": ['d_stone_id', 'd_plus_id', 'd_key_id', 'd_honor_id'],
		},
		toolbar: [
			{
				iconCls: 'icon-edit',
				text: '編輯',
				iconAlign: 'top',
				action: 'edit'
			}
		]
	},
	actions: {
		edit: function() {
			if(this._super() === false) {
				return;
			}
			this.transitionTo("playeritem.edit", this.gridParams.selected.p_id);
		},
	}
});

App.PlayeritemEditRoute = App.EditorRoute.extend({
	title: "編輯玩家物品",
	targetModel: "playeritem",
	loadSelected: true,
	actions: {
		save: function() {
		}
	}
});

App.BarsController = Ember.Controller.extend({
	field: ['現金', '存款', '財富'],
	fieldMap: {
		'現金': ['數值分佈: %@', '人數級距', '現金'],
		'存款': ['數值分佈: %@', '人數級距', '存款'],
		'財富': ['財富分佈', '人數級距', '金額']
	}
});
App.BarsRoute = Ember.Route.extend({
	afterRender: function() {
		//console.log(this);
		$.Metro.initTabs('#bar-menu');
	}
});
App.BarsBasicsRoute = Ember.Route.extend({
	needs: 'bars',
	beforeModel: function() {
	var barsCtrl = this.controllerFor('bars');
	var field = arguments[0].params["bars.basics"].field;
		if(!barsCtrl.get('selectedField')) {
			if(field) {
				barsCtrl.set('selectedField', field);
			} else {
				alert('沒有選擇欄位');
				this.transitionTo('bars');
			}
		}
	},
	model: function(params) {
		var fieldMap = this.controllerFor('bars').get('fieldMap')[params.field]
		this.set('field', params.field);
		return $.post('control.php', {'f': 'stats', act: 'barsBasics', 'field': params.field}).done(function(data) {
			data.chartModel = {
				title: fieldMap[0].fmt(params.field),
				axes: {
					xaxis: {label: fieldMap[1]},
					yaxis: {label: fieldMap[2]}
				}
			};
			return data;
		});
	}
});