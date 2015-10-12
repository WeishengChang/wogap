var SERVER_PATH = '../laravel/public/index.php/';

function WOGDate(timestamp) {
	this.date = new Date(( +timestamp) * 1000);
	return this;
}
WOGDate.prototype.toString = function() {
	return this.date.toLocaleString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"});
};

App.Router.map(function() {
	this.route('home');
	this.route('logout');
	this.route('management', function() {
		this.route('player', {path: '/player', resetNamespace: true}, function() {
			/** manipulations */
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
			
			/** subroutes */
			this.route('item', {path: '/item'}, function() {
				this.route('edit', {path: '/edit/:id'});
			});
			this.route('equipment', {path: '/equipment'}, function() {
				this.route('edit', {path: '/edit/:id'});
			});
			this.route('depot', {path: '/depot'}, function() {
				this.route('edit', {path: '/edit/:id'});
			});
			this.route('exchange', {path: '/exchange'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('chexp', {path: '/chexp'}, function() {
				this.route('edit', {path: '/edit/:id'});
			});
			this.route('skill', {path: '/skill'}, function() {
				this.route('edit', {path: '/edit/:id'});
				this.route('setup', {path: '/setup'}, function() {
					this.route('edit', {path: '/edit/:id2'});
				});
			});
			this.route('mission', {path: '/mission'}, function() {
				this.route('edit', {path: '/edit/:id'});
			});
			this.route('pet', {path: '/pet'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('mercenary', {path: '/mercenary'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('buff', {path: '/buff'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('message', {path: '/message'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('log', {path: '/log'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('mail', {path: '/mail'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('friend', {path: '/friend'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('team', {path: '/team'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
				
				this.route('join', {path: '/join'}, function() {
					this.route('add');
					this.route('edit', {path: '/edit/:id'});
					this.route('delete');
				});
			});
		});
		this.route('item', {path: '/item/:type', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
			this.route('used', {path: '/used'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('stone', {path: '/stone'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('plus', {path: '/plus'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('key', {path: '/key'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('honor', {path: '/honor'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('syn', {path: '/syn'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
			this.route('sale', {path: '/sale'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
		});
		this.route('exchange', {path: '/exchange', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
			this.route('log', {path: '/log'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
		});
		this.route('character', {path: '/character', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
			this.route('skill', {path: '/skill'}, function() {
				this.route('add');
				this.route('edit', {path: '/edit/:id'});
				this.route('delete');
			});
		});
		this.route('playerHero');
		this.route('playerCP');
		this.route('playerKey');
		
		this.route('avatar', {path: '/avatar', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
		});
		this.route('monster', {path: '/monster', resetNamespace: true}, function() {
			this.route('add');
			this.route('edit', {path: '/edit/:id'});
			this.route('delete');
		});
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
	userlv: {0: 'PC(普通玩家)', 1: 'SA(系統管理員)', 2: 'GM(遊戲管理員)'},
	place: {0: "未知區域",
			1: "中央平原", 2: "試煉洞窟", 3: "黑暗沼澤", 4: "迷霧森林",
			5: "古代遺跡", 6: "久遠戰場", 7: "王者之路", 8: "幻獸森林",
			9: "星河異界", 10: "灼熱荒漠", 11: "無淵洞窟", 12: "天空之城",
			13: "水晶之間", 14: "失落古船", 15: "最果之島", 16: "冷峰寒地",
			17: "廢棄洞窟", 18: "日沒碉堡", 19: "靜止之城", 20: "黑耀神廟",
			21: "血之魔域", 22: "星落大地"},
	birth: {
		0: "中央大陸",
		1: "魔法王國",
		2: "熱帶雨林",
		3: "末日王城",
		4: "禁區"
	},
	"itemtype": {
		0: "武器",
		1: "頭部",
		2: "身體",
		3: "手部",
		4: "足部",
		5: "道具",
		6: "消耗品",
		7: "魔石",
		8: "勳章",
		9: "鑰匙",
		10: "精煉",
		11: "戰鬥道具"
	},
	"bagtype": {
		0: "武器",
		1: "頭部",
		2: "身體",
		3: "手部",
		4: "足部",
		5: "道具",
		7: "魔石",
		8: "勳章",
		9: "鑰匙",
		10: "精煉"
	},
	'exchangeChange': {
		0: '持平',
		1: '上漲',
		2: '下跌'
	},
	'mercenaryStatus': {
		0: '休息中',
		1: '戰鬥中'
	},
	"petStatus": {
		0: '攜帶',
		1: '拍賣',
		2: '獸欄'
	},
	"petType": {
		1: "積極",
		2: "冷酷",
		3: '鐵壁',
		4: '危急'
	},
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
						//console.log(this, arguments);
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
	cache: {},
	getDatagrid: function() {
		return this.gridPanel;
	},
	model: function(params) {
		//最後會回傳gridParams, 供DialogRoute做存取用
		//example: 要使用PlayerRoute的model，targetModel要設定為player
		//               之後就能在DialogRoute中呼叫this.model()抓回model(gridParams)
		var route = this;
		var promise = {};
		if (!route.gridParams.url) {
			//沒指定URL，則使用預設的格式: 當前route的subroute: show
			route.gridParams.url = SERVER_PATH+this.routeName.split('.').join('/')+'/show';
			/*if(params && params.mode && params.mode != 'undefined') {
				route.grindParams.url += '/'+params.mode;
			}*/
		}
		if (route.cacheUrl) {
			var temp = [];
			$.each(route.cacheUrl, function(k, url) {
				temp.push($.getJSON(url).then(function(data) {
					route.cache[k] = data;
				}));
			});
			promise.cache = Ember.RSVP.all(temp);
		}
		if (this.gridParamsUrl) {
			promise.params = $.getJSON(this.gridParamsUrl).then(function(json) {
				var params = route.gridParams;
				
				if (params && params.columns) {
					params.columns = [_mixColumns(json.columns[0] || [], params.columns)];
					delete json.columns;
				}
				params = $.extend(params || {}, json || {});
				route.gridParamsUrl = null;
				return params;
			});
		} else {
			promise.params = Ember.RSVP.resolve(false);
		}
		return Ember.RSVP.hash(promise).then(function(v) {
			//cache不需要回傳資料，由此再恢復到原先的接口
			if (v.params !== false) {
				if (route.fieldCallback) {
					v.params.columns[0] = route.fieldCallback.apply(route, [v.params.columns[0], route.cache]);
				}
				_filterHidden(route);
				_adjustGridParams(route, route.gridParams);
			}
			return [route, route.gridParams];
		});
		
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
		
		function _adjustGridParams(route, p) {
			if(p.adjust === true) return p;
			p.adjust = true;
			if(!route.actions) route.actions = {};
			$.each(p.toolbar, function(k, v) {
				var name;
				switch(v) {
					case 'add': 
						p.toolbar[k] = {iconCls: 'icon-add', text: '新增', iconAlign: 'top', action: 'add'}; 
						name = _routename(route.routeName+'.'+v);
						if(!App[name]) {
							App[name] = App.EditorRoute.extend({title: "新增"+route.title.substr(0, route.title.length-2)});
						}
						break;
					case 'edit': 
						p.toolbar[k] = {iconCls: 'icon-edit', text: '編輯', iconAlign: 'top', action: 'edit'}; 
						name = _routename(route.routeName+'.'+v);
						if(!App[name]) {
							App[name] = App.EditorRoute.extend({title: "編輯"+route.title.substr(0, route.title.length-2), loadSelected: true});
						}
						break;
					case 'delete': 
						p.toolbar[k] = {iconCls: 'icon-remove', text: '刪除', iconAlign: 'top', action: 'del'}; 
						
						break;
				}
			});
			return p;
		}
		
		function _routename(path) {
			var name = "";
			$.each(path.split('.'), function() {
				name += _ucfirst(this);
			});
			name += 'Route';
			return name;
		}
		function _ucfirst(str) {
			str += '';
			var f = str.charAt(0).toUpperCase();
			return f + str.substr(1);
		}

	},
	afterRender: function() {
		this._super();
		if(!this.gridParams && !this.gridParams) return;
		var route = this;
		var $panel = $(route.panel);
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
		//在ember的最後一個階段才做實體化，避免同時載入多個頁面
		Ember.run.scheduleOnce("destroy", function() {
			if($panel.is(':visible')) {
				route.gridPanel = $('<div/>').appendTo(route.panel).datagrid(route.gridParams);
			} else {
				$panel.panel({
					onOpen:function() {
						if(route.gridPanel) return;
						route.gridPanel = $('<div/>').appendTo(route.panel).datagrid(route.gridParams);
					}
				});
			}
		});
	},
	actions: {
		add: function() { //按下[新增]的按鈕的預設行為
			this.gridParams.selected = null;
			this.transitionTo(this.routeName+".add");
		},
		edit: function() { //按下[編輯]的按鈕
			var row = $(this.getDatagrid()).datagrid('getSelected');
			if(!row) {
				alert('沒有選擇列');
				return false;
			}
			//暫存選取列的資料，供editor dialog做載入用
			this.gridParams.selected = this.gridParams._rawData[ $(this.getDatagrid()).datagrid('getRowIndex', row) ];
			this.gridParams.selected.pkval = this.gridParams.selected[this.gridParams.primaryKey];
			this.transitionTo(this.routeName+".edit", this.gridParams.selected[this.gridParams.primaryKey || "id"]);
		},
		del: function(url) {
			var route = this;
			var row = $(this.getDatagrid()).datagrid('getSelected');
			if(!row) {
				alert('沒有選擇列');
				return false;
			}
			if(!confirm('確定刪除？')) {
				return false;
			}
			//暫存選取列的資料，供editor dialog做載入用
			this.gridParams.selected = this.gridParams._rawData[ $(this.getDatagrid()).datagrid('getRowIndex', row) ];
			$.post(SERVER_PATH+this.routeName.split('.').join('/')+'/del/'+this.gridParams.selected[this.gridParams.primaryKey]).done(function(data) {
				$.messager.notification("刪除成功");
				if(data.reload === true) {
					route.send("reloadGrid");
				}
			}).fail(function(xhr) {
				$.messager.notification(xhr.responseJSON);
			});
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
							$.messager.notification("編輯成功");
							if(data.reload === true) {
								//console.log('first send reload');
								route.send("reload");
							}
							route.$_dialog.dialog('close');
							//route.send('close');
						}).fail(function(xhr) {
							$.messager.notification(xhr.responseJSON.error ? xhr.responseJSON.error.message : xhr.responseJSON);
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
	cache: {},
	targetModel: "",
	loadSelected: false,
	_cache_switch_list: [],
	parentRoute: null,
	model: function(params, transition) { //用來回傳selected row的資料
		if(!this.targetModel) { //預設的targetModel是 parent route 的model
			var frag = this.routeName.split('.');
			frag.pop();
			this.targetModel = frag.join('.');
		}
		var data = this.modelFor(this.targetModel);
		this.parentRoute = data[0];
		if (data[0].cache) {
			this.cache = data[0].cache;
		}
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
		if(!this._cache_form) {
			this._cache_form = this.createFormGroup.call(this);
		}
		$dialog
			.dialog("setTitle", this.title)
			.html(this._cache_form)
			.dialog("open")
			.find('.ap-itemlist, .ap-itemlist2').textbox({
				onClickButton: __showEditor
				});
		$.parser.parse($dialog.find('table'));
		//先分析easyui的UI，再做form.load
		if(this.get('loadSelected') === true) {
			var selected = this.model().selected;
			if(!selected) { //沒資料就直接返回上一層
				this.transitionTo(this.getParentRoute());
			} else {
				$dialog.form('load', selected);
				//console.log(selected);
			}
		}
		
		function __showEditor() {
			console.log('click');
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
			//console.log(exclude, columns.length, exclude.length, remain);
			if(columns.length > exclude.length) {
				var remain = createForm.call(route, columns, [], exclude);
				//console.log(remain);
				if(remain) {
					text.push('<tr><td colspan="4" class="editor-group-title">其他</td></tr>');
					text.push(remain);
				}
			}
		} else {
			text.push(route.createForm(columns, [], []));
		}
		text.push('</table><input type="hidden" name="pkval" value=""/></form>');
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
					exclude.push(field);
					return;
				}
				if(i%2 === 0) {
					text.push('<tr>');
				}
				text.push('<td>'+column.title+':</td><td>'+_parse(column, route.cache)+'</td>');
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
				if(column.readonly === true) {
					exclude.push(column.field);
					return;
				}
				if(i%2 === 0) {
					text.push('<tr>');
				}
				text.push('<td>'+column.title+':</td><td>'+_parse(column, route.cache)+'</td>');
				if(i%2 === 1) {
					text.push('</tr>');
				}
				++i;
			});
		}
		
		return text.join('');
		
		function _parse(column, cache) { //分析column設定，轉化為表格物件
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
				case 'combobox':
					switch(true) {
						case $.isFunction(column.data):
							column.data = column.data.apply(cache, []);
							//console.log('<input name="'+column.field+'" class="easyui-combobox" data-options=\'data: '+JSON.stringify(column.data)+'\'>');
							return '<input name="'+column.field+'" class="easyui-combobox" data-options=\'data: '+JSON.stringify(column.data)+'\'>';
						case !!column.url:
							return '<input name="'+column.field+'" class="easyui-combobox" data-options=\'mode:"remote",url:"'+column.url+'",method:"get"\'>';
					}
					
				//case 'timestamp':
				//eturn '';
				case 'itemlist':
					return '<input type="text" name="'+column.field+'" class="easyui-textbox ap-itemlist" data-options="buttonText:\'編輯\','+opts+'"/>';
				case 'itemlist2':
					return '<input type="text" name="'+column.field+'" class="easyui-textbox ap-itemlist2" data-options="buttonText:\'編輯\','+opts+'"/>';
				default:
					//text.push('<input type="text" name="'+column.field+'" class="easyui-textbox" data-options="'+opts+'"/>');
					return '<input type="text" name="'+column.field+'" data-options="'+opts+'"/>'; //有效能問題，暫時不使用easyui-textbox
			}
		}
		
		function _parseList(list) {
			var text = [];
			if(Array.isArray(list)) {
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
		$('#tabs').tabs({
			onSelect: function() {
				//console.log(this, arguments);
			},
		});
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
	cacheUrl: {ch_name: 'json/cache.character.ch_name.json', 'avatar': 'json/cache.avatar.json'},
	gridParamsUrl: 'json/grid.player.json',
	gridParams: {
		primaryKey: 'p_id',
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
			{field: 'p_userlv', type: 'select', list: App.variable.userlv},
			{field: 'p_place', type: 'select', list: App.variable.place},
			{field: 'p_birth', type: 'select', list: App.variable.birth},
			{field: 'ch_id', type: 'combobox', url: SERVER_PATH+'character/combobox'},
			/*{field: 'ch_id', type: 'combobox', data: function() {
					var data = [];
					$.each(this.ch_name, function(id, name) {
						data.push({text: name, value: id});
					});
					return data;
			}},*/
			{field: 'i_img', type: 'combobox', data: function() {
					var data = [{text: '無', value: 0}];
					$.each(this.avatar, function(id, name) {
						data.push({text: name, value: id});
					});
					return data;
			}},
			{field: 'p_recomm', type: 'combobox', url: SERVER_PATH+'player/combobox_pc'}
	], //擴充
		columnsGroup: {
			"基本資料": ['p_id', 'p_name', 'p_password', 'p_email', 'p_ipadd', 'act_num', 'act_num_time', 'p_act_time', 'p_online_time', 'p_cdate', 'p_lock', 'p_lock_time', 'p_sex', 's_property', 'ch_id', 'p_place', 'p_birth', 'p_money', 'p_bank', 'p_cash', 'p_st', 'p_userlv', 'p_npc'],
			"原始能力": ['base_str', 'base_smart', 'base_agi', 'base_life', 'base_vit', 'base_au', 'base_be'],
			"能力": ['str', 'smart', 'agi', 'life', 'vit', 'au', 'be'],
			"戰力": ['hp', 'hpmax', 'sp', 'spmax', 'at', 'df', 'mat', 'mdf', 'p_lv', 'p_sat_name', 'p_exp', 'p_nextexp', 'p_win', 'p_lost'],
		},
		toolbar: ['add', 'edit', 'delete', '-',
			{
				iconCls: 'icon-pet',
				text: '已封鎖',
				iconAlign: 'top',
				handler: function() {}
			}
		],
		contextMenu: [{
			title: "編輯",
			action: 'edit'
		}]
	}
});

App.PlayerItemRoute = App.TabDatagridRoute.extend({
	title: "玩家物品管理",
	gridParamsUrl: 'json/grid.playeritem.json',
	gridParams: {
		primaryKey: 'p_id',
		autoRowHeight: false,
		pagination: true,
		columns: [
			{field: "a_id", type: 'itemlist', formatter: function(val, row) { return row.a_name || val; }},
			{field: "d_head_id", type: 'itemlist', formatter: function(val, row) { return row.head_name || val; }},
			{field: "d_body_id", type: 'itemlist', formatter: function(val, row) { return row.body_name || val; }},
			{field: "d_hand_id", type: 'itemlist', formatter: function(val, row) { return row.hand_name || val; }},
			{field: "d_foot_id", type: 'itemlist', formatter: function(val, row) { return row.foot_name || val; }},
			{field: "d_item_id", type: 'itemlist', formatter: function(val, row) { return row.item_name || val; }},
			{field: "d_stone_id", type: 'itemlist2', formatter: function(val, row) { return row.stone_name || val; }},
			{field: "d_key_id", type: 'itemlist2', formatter: function(val, row) { return row.key_name || val; }},
			{field: "d_honor_id", type: 'itemlist2', formatter: function(val, row) { return row.honor_name || val; }},
			{field: "d_plus_id", type: 'itemlist2', formatter: function(val, row) { return row.plus_name || val; }},
		], //擴充
		columnsGroup: {
			"基本資料": ['p_id'],
			"裝備": ['a_id', 'd_head_id', 'd_body_id', 'd_hand_id', 'd_foot_id', 'd_item_id'],
			"能力": ['d_stone_id', 'd_plus_id', 'd_key_id', 'd_honor_id'],
		},
		toolbar: ['edit']
	}
});

App.PlayerEquipmentRoute = App.TabDatagridRoute.extend({
	title: "玩家裝備管理",
	gridParamsUrl: 'json/grid.playerequipment.json',
	gridParams: {
		primaryKey: 'p_id',
		autoRowHeight: false,
		pagination: true,
		columns: [
			{field: "a_id", type: 'itemlist'}
		], //擴充
		columnsGroup: { //TODO: grouptype, 能將群組中的特定欄位組合成一個選取功能
			"基本資料": ['p_id'],
			"武器": ['a_id', 's_a_id', 'p_a_id'],
			"頭部": ['d_head_id', 's_head_id', 'p_head_id'],
			"身體": ['d_body_id', 's_body_id', 'p_body_id'],
			"手部": ['d_hand_id', 's_hand_id', 'p_hand_id'],
			"足部": ['d_foot_id', 's_foot_id', 'p_foot_id'],
			"道具": ['d_item_id', 'd_item_num', 's_item_id', 'p_item_id'],
			"消耗品": ['d_item_id2', 'd_item_num2'],
		},
		toolbar: ['edit']
	}
});

//倉庫
App.PlayerDepotRoute = App.TabDatagridRoute.extend({
	title: "玩家倉庫管理",
	gridParamsUrl: 'json/grid.player.depot.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		columns: [
			{field: "d_name", formatter: function(val, row) { return +row.d_type < 5 ?val:val+" * "+row.d_num;}}
		], //擴充
		columnsGroup: { //TODO: grouptype, 能將群組中的特定欄位組合成一個選取功能
			"基本資料": ['id', 'p_id'],
		},
		toolbar: ['edit']
	}
});

App.PlayerExchangeRoute = App.TabDatagridRoute.extend({
	title: "玩家資源管理",
	gridParamsUrl: 'json/grid.player.exchange.json',
	gridParams: {
		primaryKey: 'el_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['el_id', 'p_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerChexpRoute = App.TabDatagridRoute.extend({
	title: "玩家職業熟練管理",
	cacheUrl: {ch_name: 'json/cache.character.ch_name.json'},
	fieldCallback: function (field, cache) {
		$.each(field, function(k, v) {
			var tmp = v.field.split('_');
			if (tmp.length === 2 && cache.ch_name[tmp[1]]) {
				field[k].title = cache.ch_name[tmp[1]];
				if (tmp[0] === 'sk') {
					field[k].title = 'sk'+field[k].title;
				}
			}
		});
		return field;
	},
	gridParamsUrl: 'json/grid.player.chexp.json',
	gridParams: {
		primaryKey: 'p_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['p_id'],
		},
		toolbar: ['edit']
	}
});

App.PlayerSkillRoute = App.TabDatagridRoute.extend({
	title: "玩家已學技能管理",
	gridParamsUrl: 'json/grid.player.skill.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['id', 'p_id'],
		},
		toolbar: ['edit']
	}
});


App.PlayerSkillSetupRoute = App.TabDatagridRoute.extend({
	title: "玩家配置技能管理",
	gridParamsUrl: 'json/grid.player.skill.setup.json',
	gridParams: {
		primaryKey: 'p_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['p_id'],
			"技能設定": ['skill_1', 'time_1', 'skill_2', 'time_2', 'skill_3', 'time_3', 'skill_4', 'time_4', 'skill_5', 'time_5'],
		},
		toolbar: ['edit']
	}
});

App.PlayerMissionRoute = App.TabDatagridRoute.extend({
	title: "玩家任務管理",
	gridParamsUrl: 'json/grid.player.mission.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['id', 'p_id'],
		},
		toolbar: ['edit']
	}
});

App.PlayerPetRoute = App.TabDatagridRoute.extend({
	title: "寵物管理",
	gridParamsUrl: 'json/grid.player.pet.json',
	gridParams: {
		primaryKey: 'pe_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "pe_name", formatter: function(val, row) { return val+"("+row.pe_mname+")";}}
		],
		columnsGroup: {
			"基本資料": ['pe_id', 'pe_p_id', 'pe_m_id', 'pe_name', ''],
			"能力": ['pe_fu', 'pe_hu', 'pe_at', 'pe_mt', 'pe_def', 'pe_he', 'pe_fi'],
			"拍賣": ["pe_money", "pe_s_dateline", ""]
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerMercenaryRoute = App.TabDatagridRoute.extend({
	title: "僱傭兵管理",
	gridParamsUrl: 'json/grid.player.mercenary.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "me_name", formatter: function(val, row) { return val+"("+row.me_name_raw+")";}}
		],
		columnsGroup: {
			"基本資料": ['id', 'p_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerBuffRoute = App.TabDatagridRoute.extend({
	title: "增益管理",
	gridParamsUrl: 'json/grid.player.buff.json',
	gridParams: {
		primaryKey: 'p_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['p_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerMessageRoute = App.TabDatagridRoute.extend({
	title: "玩家訊息管理",
	gridParamsUrl: 'json/grid.player.message.json',
	gridParams: {
		primaryKey: 'm_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "p_name", formatter: function(val, row) { return val+"("+row.p_id+")"; }},
			{field: "from_name", formatter: function(val, row) { return row.from_pid ? (val ? val+"("+row.from_pid+")" : "未知玩家("+row.from_pid+")" ) : "系統訊息" ; }},
			{field: "dateline", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['m_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerLogRoute = App.TabDatagridRoute.extend({
	title: "商城紀錄管理",
	gridParamsUrl: 'json/grid.player.log.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "d_name", formatter: function(val, row) { return val+" * "+row.num; }},
			{field: "datetime", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerMailRoute = App.TabDatagridRoute.extend({
	title: "玩家信箱管理",
	gridParamsUrl: 'json/grid.player.mail.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "to_name", formatter: function(val, row) { return val+"("+row.p_id+")"; }},
			{field: "m_time", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerFriendRoute = App.TabDatagridRoute.extend({
	title: "玩家好友管理",
	gridParamsUrl: 'json/grid.player.friend.json',
	gridParams: {
		primaryKey: 'id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "p_name", formatter: function(val, row) { return val+"("+row.p_id+")"; }},
			{field: "f_name", formatter: function(val, row) { return val+"("+row.f_id+")"; }},
		],
		columnsGroup: {
			"基本資料": ['id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerTeamRoute = App.TabDatagridRoute.extend({
	title: "隊伍管理",
	gridParamsUrl: 'json/grid.player.team.json',
	gridParams: {
		primaryKey: 't_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "p_id", formatter: function(val, row) { return row.p_name || val ; }},
			{field: "t_time", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['t_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.PlayerTeamJoinRoute = App.TabDatagridRoute.extend({
	title: "隊伍入隊管理",
	gridParamsUrl: 'json/grid.player.team.join.json',
	gridParams: {
		primaryKey: 't_j_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "t_id", formatter: function(val, row) { return row.t_name || val ; }},
			{field: "p_id", formatter: function(val, row) { return row.p_name || val ; }},
			{field: "t_j_dateline", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['t_j_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemRoute = App.TabDatagridRoute.extend({
	title: "物品管理",
	gridParamsUrl: 'json/grid.item.json',
	gridParams: {
		primaryKey: 'd_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "d_name", formatter: function(val, row) { return row.d_type < 6 ? val+"("+row.d_hole+")" : val; }},
			{field: "f_name", formatter: function(val, row) { return val+"("+row.f_id+")"; }},
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemUsedRoute = App.TabDatagridRoute.extend({
	title: "消耗品管理",
	gridParamsUrl: 'json/grid.item.used.json',
	gridParams: {
		primaryKey: 'd_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemStoneRoute = App.TabDatagridRoute.extend({
	title: "魔石管理",
	gridParamsUrl: 'json/grid.item.stone.json',
	gridParams: {
		primaryKey: 'd_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemPlusRoute = App.TabDatagridRoute.extend({
	title: "精煉石管理",
	gridParamsUrl: 'json/grid.item.plus.json',
	gridParams: {
		primaryKey: 'd_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemKeyRoute = App.TabDatagridRoute.extend({
	title: "鑰匙管理",
	gridParamsUrl: 'json/grid.item.key.json',
	gridParams: {
		primaryKey: 'd_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemHonorRoute = App.TabDatagridRoute.extend({
	title: "勳章管理",
	gridParamsUrl: 'json/grid.item.honor.json',
	gridParams: {
		primaryKey: 'h_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['d_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemSynRoute = App.TabDatagridRoute.extend({
	title: "合成管理",
	gridParamsUrl: 'json/grid.item.syn.json',
	gridParams: {
		primaryKey: 'syn_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: 'syn_result', formatter: function(val, row) {return row.d_name || val;}},
			{field: 'syn_element', formatter: function(val, row) {return row.syn_name || val;}},
			{field: 'syn_need_mission', formatter: function(val, row) {return row.m_subject || val;}}
		],
		columnsGroup: {
			"基本資料": ['syn_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ItemSaleRoute = App.TabDatagridRoute.extend({
	title: "拍賣管理",
	gridParamsUrl: 'json/grid.item.sale.json',
	gridParams: {
		primaryKey: 's_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: 'p_id', formatter: function(val, row) {return row.p_name || val;}},
			{field: 'd_id', formatter: function(val, row) {return row.d_name || val;}},
		],
		columnsGroup: {
			"基本資料": ['s_id', 'p_id', 'd_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ExchangeRoute = App.TabDatagridRoute.extend({
	title: "資源管理",
	gridParamsUrl: 'json/grid.exchange.json',
	gridParams: {
		primaryKey: 'ex_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
		],
		columnsGroup: {
			"基本資料": ['ex_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.ExchangeLogRoute = App.TabDatagridRoute.extend({
	title: "資源紀錄管理",
	gridParamsUrl: 'json/grid.exchange.log.json',
	gridParams: {
		primaryKey: 'eb_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "ex_id", formatter: function(val, row) { return row.ex_name || val; }},
			{field: "eb_time", formatter: function(val, row) { return new WOGDate(val); }}
		],
		columnsGroup: {
			"基本資料": ['eb_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.CharacterRoute = App.TabDatagridRoute.extend({
	title: "職業管理",
	gridParamsUrl: 'json/grid.character.json',
	gridParams: {
		primaryKey: 'ch_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "ch_main", formatter: function(val, row) { return val?row.main_name || val : "無"; }}
		],
		columnsGroup: {
			"基本資料": ['ch_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.CharacterSkillRoute = App.TabDatagridRoute.extend({
	title: "職業技能管理",
	gridParamsUrl: 'json/grid.character.skill.json',
	gridParams: {
		primaryKey: 's_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "ch_id", formatter: function(val, row) { return row.ch_name || val; }},
			{field: "main_sid", formatter: function(val, row) { return row.main_name || val; }},
			{field: "need_sid", formatter: function(val, row) { return row.need_name || val; }},
		],
		columnsGroup: {
			"基本資料": ['s_id'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.AvatarRoute = App.TabDatagridRoute.extend({
	title: "頭像管理",
	gridParamsUrl: 'json/grid.avatar.json',
	gridParams: {
		primaryKey: 'i_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columnsGroup: {
			"基本資料": ['i_id', 'i_filename'],
		},
		toolbar: ['add', 'edit', 'delete']
	}
});

App.MonsterRoute = App.TabDatagridRoute.extend({
	title: "怪物管理",
	gridParamsUrl: 'json/grid.monster.json',
	gridParams: {
		primaryKey: 'm_id',
		autoRowHeight: false,
		pagination: true,
		//擴充
		columns: [
			{field: "m_mission", formatter: function(val, row) { return val ? row.mission_name : "無" ; }},
		],
		columnsGroup: {
			"基本資料": ['m_id', 'm_name', 's_property', 'm_img', 'm_place', 'm_subplace', 'm_meet', 'm_mission', 'm_npc', 'm_npc_message'],
			"戰鬥能力": ['hp', 'sp', 'at', 'df', 'mat', 'mdf', 'str', 'smart', 'agi', 'life', 'vit', 'au', 'be'],
			"技能": ['skill_1', 'time_1', 'skill_2', 'time_2', 'skill_3', 'time_3', 'skill_4', 'skill_5'],
			"戰利品": ['d_id', 'm_topr', 'm_job_exp']
		},
		toolbar: ['add', 'edit', 'delete']
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
		var fieldMap = this.controllerFor('bars').get('fieldMap')[params.field];
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