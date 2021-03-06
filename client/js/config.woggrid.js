$.fn.extend({
	wogContextMenu: function(args, callback, depth) {
		function parse(args, prefix) {	//解析args結構
			if(typeof args === 'undefined') return ['', {}, {}];
			var data = [['<ul style="width:200px">'], {}];
			if(prefix) {
				data[0][0] = '<ul class="contextsubmenu" style="width:200px;display:none;position:absolute;z-index:'+depth+'">';
			}
			$.each(args, function(k, v) {
				if(!$.isArray(v)) return;
				var subgroup = v[3] ? parse(v[3], prefix+k+'_', depth+1) :['', {}];
				//if(subgroup[0])console.log(subgroup[0]);
				var opts = $.extend({
					text: v[0] || k,
					icon: v[1] || 'ui-icon-pencil',
					subgroup: subgroup[0] ?  '<span class="ui-icon ui-icon-triangle-1-e" style="float:right"></span>'+subgroup[0]+'<div style="background-color:#000;position:absolute;opacity:0.2;z-index:'+(depth-1)+'"></div>' : ''
				}, v[4] || {});
				data[0].push('<li id="'+prefix+k+'"><span class="ui-icon '+opts.icon+'" style="float:left"></span><span style="font-size:11px; font-family:Verdana">'+opts.text+'</span>'+opts.subgroup+'</li>');
				
				if(typeof v[2] === 'string') {
					switch(v[2]) {
						case 'add':
							data[1][prefix+k] = function() {
								$grid.editGridRow('new');
								return false;
							};
							break;
						case 'edit':
							data[1][prefix+k] = function(row) {
								$grid.editGridRow($(row).getGridParam('selrow'));
								return false;
							};
							break;
						case 'del':
							data[1][prefix+k] = function(row) {
								$grid.delGridRow($(row).getGridParam('selrow'));
								return false;
							};
							break;
							default:
								data[1][prefix+k] = function(grid) {$(grid).wogSubGrid(v[2], 'show'); };
								break;
					}
				}
				if($.isArray(v[2]) && v[2].length === 2) {
					//以GridParam顯示SubGrid
					data[1][prefix+k] = function(grid) {$(grid).wogSubGrid(v[2][0], v[2][1]);};
				} else if($.isFunction(v[2])) {
					data[1][prefix+k] = v[2];
				}
				$.extend(data[1], subgroup[1]);
			});
			
			data[0].push('</ul>');
			data[0] = data[0].join("");
			return data;
		}
		/*
		 * args: mapping list, 每個property皆為長度3~4的陣列
		 *  0: label name
		 *  1: icon class
		 *  2: string(usnig default callback function) or callback function
		 *  3: groups: mapping list for subgroups 
		 */
		var $grid = this;
		var bindings = {};
		var menu_id = 'contextmenu_'+(new Date().getTime());
		var menu = '<div class="contextMenu" id="'+menu_id+'">';
		args = $.extend({
			'add': ['新增', 'ui-icon-plus', 'add'],
			'edit': ['編輯', 'ui-icon-pencil', 'edit'],
			'del': ['刪除', 'ui-icon-trash', 'del']
		}, args || {});
		var parsed = parse(args, '', 500);
		bindings = parsed[1];
		menu = menu+parsed[0]+'</div>';
		$(menu).insertAfter(this).hide();
		return this.each(function() {
			$(this).contextMenu(menu_id, {
				'bindings': bindings,
				'onShowMenu': function(e, menu) {
					if(!$('#add_'+$grid.attr('id')).length) {
						$('#add', menu).hide();
					} else {
						$('#add', menu).show();
					}
					if(!$('#edit_'+$grid.attr('id')).length) {
						$('#edit', menu).hide();
					} else {
						$('#edit', menu).show();
					}
					if(!$('#del_'+$grid.attr('id')).length) {
						$('#del', menu).hide();
					} else {
						$('#del', menu).show();
					}
					if($.isFunction(callback)) callback(e, menu);
					return menu;
				}
			});
		});
	},
	wogGrid: function(model, target, params) {
		//console.log(target);
		var $this = this;
		var gridID = 'WOGGrid-'+new Date().getTime(), tableID = gridID+'-table',
						pagerID = gridID+'-pager', toolbarID = 't_'+tableID;
		var $table = $this.children('table').attr('id', tableID);
		var $pager = $this.children('div').attr('id', pagerID);
		
		//binding Model
		var toolbar, navbar = {}, pAdd, pEdit, pDel, pSearch;
		if(typeof model === 'string') {
			console.warn('[WOGGrid] Implicit model evaluation: '+model+', recommanded on explicit model reference.');
			if(!params.f && !params.act) {
				$.extend(params, {f: model, act: target});
			}
			model = $.WOGGrid.get(model);
		}
		if(model.init) {
			$.when(model.init()).done(function() {
				model.init = undefined;
				$this.wogGrid(model, target, params);
			});
			return $this;
		}
		//console.log($.param(params));
		model = $.extend(defaultModel(params, 'jqgrid'), model);
		//console.log(model);
		//判斷: 執行自定義初始化函數
		$.each(['title', 'columns'], function(i, name) {
			if($.isFunction(model[name])) {
				model[name] = model[name].call(this, params);
			}
		});
		if(typeof model.toolbar === 'object') {
			toolbar = model.toolbar;
			model.toolbar = [true, 'top'];
		}
		if($.isPlainObject(model.navBar)) {
			$.each(model.navBar, function(name, param) {
				if(param === false) {
					navbar[name] = false;
				}
				else {
					switch(name) {
						case 'add': pAdd = param; break;
						case 'edit': pEdit = param; break;
						case 'del': pDel = param; break;
						case 'search': pSearch = param; break;
					}
				}
			});
		}
		//euToolbar($table, model);
		//console.log(model);
		//$table.datagrid(model);
		$table.jqGrid(model);
		$table.navGrid('#'+pagerID, navbar, pEdit, pAdd, pDel, pSearch);
		if(!!toolbar) {
			//toolbar_id = 't_'+table_id;
			$.each(toolbar, function(name, tp) {
				tp.caption = name;
				if(tp.url && !tp.onClickButton) {
					tp.onClickButton = function() {window.location = tp.url;};
				}
				$table.toolbarButtonAdd('#'+toolbarID, tp);
			});
		}
		
		function defaultModel(params, type) {
			var data;
			switch(type) {
				case 'jqgrid':
					data = {
						url: "control.php?"+$.param(params),
						method: "GET",
						sortorder: "asc",
						emptyrecords: "沒有資料",
						viewrecords: true,
						subGrid: true
						//model: GridParam[attr.gridModel]
					};
					break;
				case 'easyui':
					data = {
						url: "control.php?"+$.param(params),
						pagination: true,
						method: "GET",
						pageNumber: 1,
						pageSize: 10,
						pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
						singleSelect: true,
						sortOrder: "asc",
						loadFilter: euDataFilter
					}
					break;
			}
			return data;
		}
		
		function euToolbar($table, model) {
			//EasyUI toolbar varivication
			if(model) {
				
			}
		}
		
		function euDataFilter(data) {
			//將data.columns與data.rows合併
			var temp, i, i2, n = data.rows.length, n2 = data.columns.length;
			for(i = 0, n = data.rows.length; i < n; ++i) {
				temp = {};
				for(i2 = 0; i2 < n2; ++i2) {
					temp[data.columns[i2]] = data.rows[i][i2];
				}
				data.rows[i] = temp;
			}
			return data;
		}
	},
	wogSubGrid: function(model, method, param) {
		var $grid = this;
		var id = $grid.getGridParam('selrow');
		var expand_id = $grid.getGridParam('subGridRowID');
		if(!param) param = {};
		if(id) {
			if(expand_id) {
				this.collapseSubGridRow(expand_id);
			}
			$grid.setGridParam({
				subGridOptions: {'openicon': 'ui-icon-grip-dotted-vertical'},
				subGridRowExpanded: function(sg_id, row_id) {
					var $subgrid = $('#'+sg_id);
					param.row_id = row_id;
					if($subgrid.find('table').length < 1) {
						$('<table/>').prependTo($subgrid);
					}
					if($subgrid.find('div').length < 1) {
						$('<div/>').appendTo($subgrid);
					}
					$('#'+sg_id).wogGrid(model, method, $.extend({row_id: row_id}, param));
					$grid.setGridParam({'subGridRowID': row_id});
				}
			}).trigger('reload').expandSubGridRow(id);
		}			
		return this;
	}
});
$.extend({
	wog: {
		controlparam: function(f, act, args) {
			var data = $.extend(args || {}, {
				f: f,
				act: act
			});
			if(args && typeof args[0] !== 'undefined') {
				data.type = args[0];
			}
			return data;
		},
		birth: {
			"0": "中央大陸",
			"1": "魔法王國",
			"2": "熱帶雨林",
			"3": "末日王城",
			"4": "禁區"
		},
		"itemtype": {
			"0": "武器",
			"1": "頭部",
			"2": "身體",
			"3": "手部",
			"4": "足部",
			"5": "道具",
			"6": "消耗品",
			"7": "魔石",
			"8": "勳章",
			"9": "鑰匙",
			"10": "精煉",
			"11": "戰鬥道具"
		},
		"bagtype": {
			"0": "武器",
			"1": "頭部",
			"2": "身體",
			"3": "手部",
			"4": "足部",
			"5": "道具",
			"7": "魔石",
			"8": "勳章",
			"9": "鑰匙",
			"10": "精煉"
		},
		'exchangeChange': {
			'0': '持平',
			'1': '上漲',
			'2': '下跌'
		},
		'mercenaryStatus': {
			'0': '休息中',
			'1': '戰鬥中'
		},
		"petStatus": {
			'0': '攜帶',
			'1': '拍賣',
			'2': '獸欄'
		},
		"petType": {
			"1": "積極",
			"2": "冷酷",
			'3': '鐵壁',
			'4': '危急'
		},
		"place": {
			"0": "未知區域",
			"1": "中央平原", "2": "試煉洞窟", "3": "黑暗沼澤", "4": "迷霧森林",
			"5": "古代遺跡", "6": "久遠戰場", "7": "王者之路", "8": "幻獸森林",
			"9": "星河異界", "10": "灼熱荒漠", "11": "無淵洞窟", "12": "天空之城",
			"13": "水晶之間", "14": "失落古船", "15": "最果之島", "16": "冷峰寒地",
			"17": "廢棄洞窟", "18": "日沒碉堡", "19": "靜止之城", "20": "黑耀神廟",
			"21": "血之魔域", "22": "星落大地"
		},
		skillMasteryName: undefined,	//fetch by ajax
		'skillStatus': {'0': '0?', '2': '2?'},
		'skillType': {'0': '主動', '1': '被動'},
		'suppliesType': {
			'0': '能力/經驗藥水',
			'1': '背包',
			'2': '魔石寶箱',
			'3': '倉庫格',
			'4': '甜粽',
			'5': '鹹粽',
			'6': '心得書',
			'7': '行動藥水',
			'8': '資源',
			'9': '密藥',
			'10': '寵物蛋',
			'11': '紅包',
			'12': '精煉石寶箱',
			'13': '技能書'
		},
		"s_property": {
			"1": "地",
			"2": "水",
			"3": "火",
			"4": "木",
			"5": "風",
			"6": "毒"
		},
		"userlv": {
			"0": "玩家",
			"1": "SA",
			"2": "GM"
		},
		"formatter": {
			"bagtype": function(cval, options, row) {
				return '<span data-value="'+cval+'">'+$.wog.bagtype[cval]+'</span>';
			},
			"itemtype": function(cval, options, row) {
				return '<span data-value="'+cval+'">'+$.wog.itemtype[cval]+'</span>';
			},
			"place": function(cval, options, row) {
				return '<span data-value="'+cval+'">'+$.wog.place[cval]+'</span>';
			}
		},
		"unformat": {
			"bagtype": function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			},
			"itemtype": function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			},
			"place": function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			}
		}
	}
});
$.extend($, {
	_gridField: {
		float: {
			formatter: function(cval, options, row) {
				return '<span data-value="'+cval+'">'+(Math.floor(parseFloat(cval)*100)/100)+'</span>';
			},
			unformat: function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			}
		},
		percent: {
			formatter: function(cval, options, row) {
				return '<span data-value="'+cval+'">'+(Math.floor(parseFloat(cval)*100)/100)+'%</span>';
			},
			unformat: function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			}
		},
		range: {
			align: 'center',
			formatter: function(cval, options, row) {
				var text = (''+cval).split(',');
				return '<span data-value="'+cval+'">'+text[0]+' - '+text[1]+'</span>';
			},
			unformat: function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			}
		},
		skillname: {
			formatter: function(cval, options, row) {
				return '<span data-value="'+cval+'">'+cval+'LV'+row[12]+'</span>';
			},
			unformat: function(cval, options, cell) {
				return ""+$('span', cell).data('value');	//不強制轉換成字串會有BUG
			}
		}
	},
	gridField: {
		__general: function(indexWidth, defaultValue, pos, opts) {
			var field = $.extend({"editrules": {}, "editoptions": {}, "formoptions": {}}, this);
			if(field.field.indexOf("*") === 0) {
				field.editrules.required = true;
				field.field = field.field.substr(1);
				field.formoptions.label = '(*)'+field.label;
			}
			if(typeof indexWidth !== 'undefined' && +indexWidth > 0) {
				field.index = field.name;
				field.width = ""+indexWidth;
			}
			else {
				field.hidden = true;
				if(field.editable) {
					field.editrules.edithidden = true;
				}
			}
			if(typeof defaultValue !== 'undefined' && defaultValue) {

				if($.isPlainObject(defaultValue)) {
					field.edittype = "select";
					field.editoptions.value = defaultValue;
					//field.formatter = 'select';
					//console.log(field);
				}
				else {
					field.editoptions.defaultValue = ""+defaultValue;
				}
			}
			if(typeof pos !== 'undefined' && $.isArray(pos) && pos.length >= 2) {
				$.extend(field.formoptions, {"rowpos": pos[0], "colpos": pos[1]});
			}
			if($.isPlainObject(opts)) {
				$.each(opts, function(k, v) {
					if(typeof(field[k]) !== 'undefined' && !$.isPlainOjbect(field[k])) return;
					if($.isPlainObject(v)) {
						if(typeof field[k] === 'undefined') field[k] = {};
						$.each(v, function(k2, v2) {
							if(typeof(field[k][k2]) !== 'undefined') return;
							field[k][k2] = v2;
						});
					} else {
						field[k] = v;
					}
				});
			}
			return field;
		},
		id: function(name, label) {
			var field = {
				field: name, 
				title: label, 
				'editable': true, 
				'editoptions': {
					'defaultValue': '系統自動產生', 
					'readonly': 'readonly'
				}
			};
			var args = $.makeArray(arguments);
			field = $.gridField.__general.apply(field, args.slice(2));
			//field.editable = false;
			return field;
		},
		readonly: function(name, label) {
			var field = {field: name, title: label, 'editable': false, 'editoptions': {'readonly': 'readonly'}};
			var args = $.makeArray(arguments);
			field = $.gridField.__general.apply(field, args.slice(2));
			field.editable = false;
			return field;
		},
		checkbox: function(name, label) {
			var field = {
				field: name, 
				title: label, 
				"editable": true, 
				//"formatter": "checkbox", 
				"edittype": "checkbox",
				"editoptions": {"value": "1:0"},
				"align": 'center'
			};
			var args = $.makeArray(arguments);
			field = $.gridField.__general.apply(field, args.slice(2));
			//field.editoptions = undefined;
			return field;
		},
		date: function(name, label) {
			var field = {
				field: name, 
				title: label, 
				"editable": true, 
				//"formatter": "date", 
				"formatoptions": {"srcformat": "U", "newformat": "ISO8601Short"}
			};
			var args = $.makeArray(arguments);
			return $.gridField.__general.apply(field, args.slice(2));

		},
		text: function(name, label) {
			var field = {field: name, title: label, "editable": true};
			var args = $.makeArray(arguments);
			return $.gridField.__general.apply(field, args.slice(2));
		},
		textarea: function(name, label) {
			var field = {field: name, title: label, "editable": true, "edittype": "textarea", 'editoptions': {'rows': '4', 'cols': '18'}};
			var args = $.makeArray(arguments);
			return $.gridField.__general.apply(field, args.slice(2));
		},
		itemtype: function(name, label) {
			var field = {
				field: name,
				title: label, 
				"editable": true,
				//"formatter": $.wog.formatter.itemtype, 
				"unformat": $.wog.unformat.itemtype
			};
			var args = $.makeArray(arguments);
			return $.gridField.__general.apply(field, args.slice(2));
		},
		builder: function() {
			var params = arguments;
			var result = [];
			for(var i = 0, n=params.length; i < n; i+=2) {
				if($.isFunction($.gridField[params[i]])) {
					result.push($.gridField[params[i]].call(params[i+1]));
				}
			}
			return result;
		}
	}
});
$.WOGGrid = {
	__init: false,
	__models: {
	avatar: {
			title: '人物頭像列表',
			columns: [
					$.gridField.text('i_id', 'ID', 80, ''),
					$.gridField.text('*i_filename', '檔案路徑', 400, '')
				],
			editurl: "control.php?f=avatar&act=edit",
			navBar: {add: false, del: false}
		},
		bid: {
			showItem: {
				title: "拍賣物品列表",
				columns: [
					$.gridField.id("s_id", "ID", 40, '', [1, 1]),
					$.gridField.text("*p_id", "拍賣人ID", 0, '', [2, 1]),
					$.gridField.readonly("p_name", "拍賣人", 80),
					$.gridField.text("*d_id", "拍賣品ID", 0, '', [3, 1]),
					$.gridField.readonly("d_name", "拍賣品名稱", 80),
					$.gridField.text("d_type", "分類類型", 60, $.wog.bagtype, [4, 1]),
					$.gridField.text("hs_id", "鑲嵌ID", 60, '0', [5, 1]),
					$.gridField.text("ps_id", "精煉ID", 60, '0', [6, 1]),
					$.gridField.text("item_num", "數量", 40, '0', [7, 1]),
					$.gridField.text("s_money", "競標價", 60, '0', [1, 2]),
					$.gridField.text("e_money", "結標價", 60, '0', [2, 2]),
					$.gridField.text("e_p_id", "下標人ID", 0, '0', [3, 2]),
					$.gridField.readonly("e_name", "下標人", 60),
					$.gridField.text("s_type", "拍賣類型", 60, '0', [4, 2]),
					$.gridField.text("dateline", "結標日期", 80, '0', [5, 2])
				],
				editurl: "control.php?f=bid&act=edititem"
			}
		},
		character: {
			title: "職業列表",
			columns: [
				$.gridField.id("ch_id", "ID", 40, '', [1, 1]),
				$.gridField.text("*ch_name", "職業名稱", 120, '', [2, 1]),
				$.gridField.text("*ch_str", "力量成長", 60, '0,0', [1, 2], $._gridField.range),
				$.gridField.text("*ch_smart", "智力成長", 60, '0,0', [2, 2], $._gridField.range),
				$.gridField.text("*ch_agi", "速度成長", 60, '0,0', [3, 2], $._gridField.range),
				$.gridField.text("*ch_life", "生命成長", 60, '0,0', [4, 2], $._gridField.range),
				$.gridField.text("*ch_vit", "體質成長", 60, '0,0', [5, 2], $._gridField.range),
				$.gridField.text("*ch_au", "信仰成長", 60, '0,0', [6, 2], $._gridField.range),
				$.gridField.text("*ch_be", "魅力成長", 60, '0,0', [7, 2], $._gridField.range),
				$.gridField.text("ch_mlv", "限制等級", 60, '0', [3, 1]),
				$.gridField.text("ch_map", "限制熟練", 60, '0', [5, 1]),
				$.gridField.text("ch_main", "前置職業", 0, '0', [4, 1]),
				$.gridField.readonly("main_name", "前置職業", 120)
			],
			editurl: "control.php?f=character&act=edit",
			toolbar: {
				'職業': {title: '職業列表', search: []},
				'熟練度': {title: '玩家熟練度', search: []},
				'技能': {title: '職業技能', search: []}
			},
			contextMenu: {
				edit: ['編輯', 'ui-icon-pencil', 'edit', {
					viewSkill: ['編輯技能', 'ui-icon-pencil', 'characterSkill']
				}]
			}
			/*showList: {
				caption: "職業列表",
				columns: [
					$.gridField.id("ch_id", "ID", 40, '', [1, 1]),
					$.gridField.text("*ch_name", "職業名稱", 120, '', [2, 1]),
					$.gridField.text("*ch_str", "力量成長", 60, '0,0', [1, 2], $._gridField.range),
					$.gridField.text("*ch_smart", "智力成長", 60, '0,0', [2, 2], $._gridField.range),
					$.gridField.text("*ch_agi", "速度成長", 60, '0,0', [3, 2], $._gridField.range),
					$.gridField.text("*ch_life", "生命成長", 60, '0,0', [4, 2], $._gridField.range),
					$.gridField.text("*ch_vit", "體質成長", 60, '0,0', [5, 2], $._gridField.range),
					$.gridField.text("*ch_au", "信仰成長", 60, '0,0', [6, 2], $._gridField.range),
					$.gridField.text("*ch_be", "魅力成長", 60, '0,0', [7, 2], $._gridField.range),
					$.gridField.text("ch_mlv", "限制等級", 60, '0', [3, 1]),
					$.gridField.text("ch_map", "限制熟練", 60, '0', [5, 1]),
					$.gridField.text("ch_main", "前置職業", 0, '0', [4, 1]),
					$.gridField.readonly("main_name", "前置職業", 120)
				],
				editurl: "control.php?f=character&act=edit",
				toolbar: {
					'職業': {title: '職業列表',url: '#/show/character/list/'},
					'熟練度': {title: '玩家熟練度',url: '#/show/character/mastery/'},
					'技能': {title: '職業技能',url: '#/show/character/skill/'}
				},
				contextMenu: {
					edit: ['編輯', 'ui-icon-pencil', 'edit', {
						viewSkill: ['編輯技能', 'ui-icon-pencil', ['character', 'showSkill']]
					}]
				}
			},
			showMastery: {
				init: function() {
					if(typeof $.wog.skillMasteryName !== 'undefined') return true;
					return $.get('control.php?f=character&act=getMasteryName').done(function(json) {	
						$.wog.skillMasteryName = {};
						for(var i=+json[0]; i <= +json[1]; ++i) {
							$.wog.skillMasteryName['ch_'+i] = 'ch_'+i;
						}
						$.each(json[2], function(k, v) {
							$.wog.skillMasteryName['ch_'+v] = json[3][k];
						});
					});
				},
				caption: "職業熟練列表",
				columns: function(p) {
					return [
						$.gridField.text("*p_id", "玩家ID", 40, '', [1, 1]),
						$.gridField.readonly("p_name", "玩家", 80),
						$.gridField.text("ch_6", $.wog.skillMasteryName['ch_6'], 60, '0', [1, 2]),
						$.gridField.text("ch_7", $.wog.skillMasteryName['ch_7'], 60, '0', [2, 2]),
						$.gridField.text("ch_8", $.wog.skillMasteryName['ch_8'], 60, '0', [3, 2]),
						$.gridField.text("ch_9", $.wog.skillMasteryName['ch_9'], 60, '0', [4, 2]),
						$.gridField.text("ch_10", $.wog.skillMasteryName['ch_10'], 60, '0', [5, 2]),
						$.gridField.text("ch_11", $.wog.skillMasteryName['ch_11'], 60, '0', [6, 2]),
						$.gridField.text("ch_12", $.wog.skillMasteryName['ch_12'], 60, '0', [7, 2]),
						$.gridField.text("ch_13", $.wog.skillMasteryName['ch_13'], 60, '0', [8, 2]),
						$.gridField.text("ch_14", $.wog.skillMasteryName['ch_14'], 60, '0', [9, 2]),
						$.gridField.text("ch_15", $.wog.skillMasteryName['ch_15'], 60, '0', [10, 2]),
						$.gridField.text("ch_16", $.wog.skillMasteryName['ch_16'], 60, '0', [11, 2]),
						$.gridField.text("ch_17", $.wog.skillMasteryName['ch_17'], 60, '0', [12, 2]),
						$.gridField.text("ch_18", $.wog.skillMasteryName['ch_18'], 0, '0', [13, 2]),
						$.gridField.text("ch_19", $.wog.skillMasteryName['ch_19'], 0, '0', [14, 2]),
						$.gridField.text("ch_20", $.wog.skillMasteryName['ch_20'], 0, '0', [15, 2]),
						$.gridField.text("ch_21", $.wog.skillMasteryName['ch_21'], 0, '0', [1, 3]),
						$.gridField.text("ch_22", $.wog.skillMasteryName['ch_22'], 0, '0', [2, 3]),
						$.gridField.text("ch_23", $.wog.skillMasteryName['ch_23'], 0, '0', [3, 3]),
						$.gridField.text("ch_24", $.wog.skillMasteryName['ch_24'], 0, '0', [4, 3]),
						$.gridField.text("ch_25", $.wog.skillMasteryName['ch_25'], 0, '0', [5, 3]),
						$.gridField.text("ch_26", $.wog.skillMasteryName['ch_26'], 0, '0', [6, 3]),
						$.gridField.text("ch_27", $.wog.skillMasteryName['ch_27'], 0, '0', [7, 3]),
						$.gridField.text("ch_28", $.wog.skillMasteryName['ch_28'], 0, '0', [8, 3]),
						$.gridField.text("ch_29", $.wog.skillMasteryName['ch_29'], 0, '0', [9, 3]),
						$.gridField.text("ch_30", $.wog.skillMasteryName['ch_30'], 0, '0', [10, 3]),
						$.gridField.text("ch_31", $.wog.skillMasteryName['ch_31'], 0, '0', [11, 3]),
						$.gridField.text("ch_32", $.wog.skillMasteryName['ch_32'], 0, '0', [12, 3]),
						$.gridField.text("ch_33", $.wog.skillMasteryName['ch_33'], 0, '0', [13, 3]),
						$.gridField.text("ch_34", $.wog.skillMasteryName['ch_34'], 0, '0', [14, 3]),
						$.gridField.text("ch_35", $.wog.skillMasteryName['ch_35'], 0, '0', [15, 3]),
						$.gridField.text("ch_36", $.wog.skillMasteryName['ch_36'], 0, '0', [1, 4]),
						$.gridField.text("ch_37", $.wog.skillMasteryName['ch_37'], 0, '0', [2, 4]),
						$.gridField.text("ch_38", $.wog.skillMasteryName['ch_38'], 0, '0', [3, 4]),
						$.gridField.text("sk_6", $.wog.skillMasteryName['ch_6']+'技能', 0, '0', [1, 5]),
						$.gridField.text("sk_7", $.wog.skillMasteryName['ch_7']+'技能', 0, '0', [2, 5]),
						$.gridField.text("sk_8", $.wog.skillMasteryName['ch_8']+'技能', 0, '0', [3, 5]),
						$.gridField.text("sk_9", $.wog.skillMasteryName['ch_9']+'技能', 0, '0', [4, 5]),
						$.gridField.text("sk_10", $.wog.skillMasteryName['ch_10']+'技能', 0, '0', [5, 5]),
						$.gridField.text("sk_11", $.wog.skillMasteryName['ch_11']+'技能', 0, '0', [6, 5]),
						$.gridField.text("sk_12", $.wog.skillMasteryName['ch_12']+'技能', 0, '0', [7, 5]),
						$.gridField.text("sk_13", $.wog.skillMasteryName['ch_13']+'技能', 0, '0', [8, 5]),
						$.gridField.text("sk_14", $.wog.skillMasteryName['ch_14']+'技能', 0, '0', [9, 5]),
						$.gridField.text("sk_15", $.wog.skillMasteryName['ch_15']+'技能', 0, '0', [10, 5]),
						$.gridField.text("sk_16", $.wog.skillMasteryName['ch_16']+'技能', 0, '0', [11, 5]),
						$.gridField.text("sk_17", $.wog.skillMasteryName['ch_17']+'技能', 0, '0', [12, 5])
					];
				},
				editurl: "control.php?f=character&act=editmastery",
				toolbar: {
					'職業': {title: '職業列表',url: '#/show/character/list/'},
					'熟練度': {title: '玩家熟練度',url: '#/show/character/mastery/'},
					'技能': {title: '職業技能',url: '#/show/character/skill/'}
				}
			},
			'showSkill': {
				caption: "職業技能列表",
				columns: [
					$.gridField.id("s_id", "ID", 40, '', [1, 1]),
					$.gridField.text("*s_name", "技能名稱", 60, '', [2, 1], $._gridField.skillname),
					$.gridField.text("*ch_id", "相關職業ID", 0, '0', [3, 1]),
					$.gridField.readonly("ch_name", "相關職業", 60),
					$.gridField.text("s_text", "說明", 100, '0', [4, 1]),
					$.gridField.text("ch_exp", "需求熟練", 60, '0', [2, 2]),
					$.gridField.text("type", "類型", 40, $.wog.skillType, [3, 2]),
					$.gridField.text("stime", "機率", 40, '0', [4, 2]),
					$.gridField.text("s_sp", "消耗SP", 40, '0', [5, 2]),
					$.gridField.text("s_st", "ST", 40, $.wog.skillStatus, [5, 1]),
					$.gridField.text("s_count", "持續回合", 60, '0', [6, 2]),
					$.gridField.text("s_money", "學習金額", 60, '0', [6, 1]),
					$.gridField.text("s_lv", "技能等級", 0, '', [1, 2]),
					$.gridField.text("main_sid", "分類", 0, '', [7, 1]),
					$.gridField.readonly("*main_name", "分類", 60, ''),
					$.gridField.text("need_sid", "前置技能", 0, '', [8, 1]),
					$.gridField.readonly("need_name", "前置技能", 60, ''),
					$.gridField.checkbox("s_master", "禁學", 40, '0', [9, 1])
				],
				editurl: "control.php?f=character&act=editskill",
				toolbar: {
					'職業': {title: '職業列表', url: '#/show/character/list/'},
					'熟練度': {title: '玩家熟練度', url: '#/show/character/mastery/'},
					'技能': {title: '職業技能', url: '#/show/character/skill/'}
				}
			}*/
		},
		characterSkill: {
			title: "職業技能列表",
			columns: [
				$.gridField.id("s_id", "ID", 40, '', [1, 1]),
				$.gridField.text("*s_name", "技能名稱", 60, '', [2, 1], $._gridField.skillname),
				$.gridField.text("*ch_id", "相關職業ID", 0, '0', [3, 1]),
				$.gridField.readonly("ch_name", "相關職業", 60),
				$.gridField.text("s_text", "說明", 100, '0', [4, 1]),
				$.gridField.text("ch_exp", "需求熟練", 60, '0', [2, 2]),
				$.gridField.text("type", "類型", 40, $.wog.skillType, [3, 2]),
				$.gridField.text("stime", "機率", 40, '0', [4, 2]),
				$.gridField.text("s_sp", "消耗SP", 40, '0', [5, 2]),
				$.gridField.text("s_st", "ST", 40, $.wog.skillStatus, [5, 1]),
				$.gridField.text("s_count", "持續回合", 60, '0', [6, 2]),
				$.gridField.text("s_money", "學習金額", 60, '0', [6, 1]),
				$.gridField.text("s_lv", "技能等級", 0, '', [1, 2]),
				$.gridField.text("main_sid", "分類", 0, '', [7, 1]),
				$.gridField.readonly("*main_name", "分類", 60, ''),
				$.gridField.text("need_sid", "前置技能", 0, '', [8, 1]),
				$.gridField.readonly("need_name", "前置技能", 60, ''),
				$.gridField.checkbox("s_master", "禁學", 40, '0', [9, 1])
			],
			editurl: "control.php?f=characterSkill&act=edit"
		},
		exchange: {
			title: '資源市場',
			columns: [
					$.gridField.text('*ex_id', 'ID', 40, ''),
					$.gridField.text('*ex_name', '名稱', 80, ''),
					$.gridField.text('ex_money', '售價', 120, '0'),
					$.gridField.text('ex_amount', '數量', 40, '0'),
					$.gridField.text('ex_change', '變動', 40),
					$.gridField.text('ex_chg_num', '變動量', 60, '0'),
					$.gridField.text('ex_change_time', '變動時間', 80),
					$.gridField.text('ex_resupply_time', '補充時間', 80)
				],
			editurl: "control.php?f=exchange&act=edit",
			navBar: {add: false, del: false}
		},
		exchangeBook: {
			title: '資源市場變動紀錄',
			columns: [
					$.gridField.text('*eb_id', 'ID', 40, ''),
					$.gridField.text('ex_id', '名稱', 0, ''),
					$.gridField.readonly('ex_name', '資源', 80, ''),
					$.gridField.text('eb_body', '訊息', 320, '0'),
					$.gridField.text('eb_time', '變動時間', 80, '0')
				],
			editurl: "control.php?f=exchangeBook&act=edit",
			navBar: {add: false, del: false}
		},
		item: {
			title: "道具列表",
			columns: [
				$.gridField.id('d_id', 'ID', 50),
					$.gridField.text('*d_name', '名稱', 200),
					$.gridField.text('d_money', '價位', 0, '0'),
					$.gridField.text('d_type', '類型', 60, $.wog.itemtype),
					$.gridField.text('d_fie', '背包類型', 60, $.wog.bagtype),
					$.gridField.checkbox('d_dbst', 'dbst', 40),
					$.gridField.text('d_hole', '洞數', 40, '0'),
					$.gridField.text('d_plus', '精煉', 40, '0'),
					$.gridField.text('d_lv', 'LV', 40, '0'),
					$.gridField.checkbox('d_send', '綁定', 40, '0'),
					$.gridField.checkbox('d_vip', 'VIP', 40, '0'),

					//column 2
					$.gridField.text('d_mstr', '力量需求', 0, '0', [1, 2]),
					$.gridField.text('d_msmart', '智力需求', 0, '0', [2, 2]),
					$.gridField.text('d_magl', '敏捷需求', 0, '0', [3, 2]),
					$.gridField.text('d_mau', '信仰需求', 0, '0', [4, 2]),
					$.gridField.text('d_at', '物理攻擊', 0, '0', [5, 2]),
					$.gridField.text('d_df', '物理防禦', 0, '0', [6, 2]),
					$.gridField.text('d_mat', '魔法攻擊', 0, '0', [7, 2]),
					$.gridField.text('d_mdf', '魔法防禦', 0, '0', [8, 2]),

					//column 3
					$.gridField.text('d_g_hp', '恢復HP', 0, '0', [1, 3]),
					$.gridField.text('d_g_sp', '恢復SP', 0, '0', [2, 3]),
					$.gridField.text('d_g_str', '增加力量', 0, '0', [3, 3]),
					$.gridField.text('d_g_smart', '增加智力', 0, '0', [4, 3]),
					$.gridField.text('d_g_agi', '增加敏捷', 0, '0', [5, 3]),
					$.gridField.text('d_g_life', '增加生命', 0, '0', [6, 3]),
					$.gridField.text('d_g_vit', '增加體質', 0, '0', [7, 3]),
					$.gridField.text('d_g_au', '增加信仰', 0, '0', [8, 3]),
					$.gridField.text('d_g_be', '增加魅力', 0, '0', [9, 3]),

					//column 4
					$.gridField.text('ch_id', '職業', 0, '0', [1, 4]),
					$.gridField.readonly('ch_name', '職業', 40),
					$.gridField.text('d_s', '屬性', 0, '0', [2, 4]),
					$.gridField.text('skill', '技能', 0, '0', [3, 4]),
					$.gridField.text('stime', '技能發動率', 0, '0', [4, 4]),
					$.gridField.text('ch_pro', '職業熟練度', 0, '0', [5, 4])
			],
			editurl: "control.php?f=item&act=edit",
			toolbar: {
				'全部': {title: '所有玩家', search: []},
			},
			sortname: 'd_id'
		},
		itemHonor: {
			title: '勳章所交換品',
			columns: [
					$.gridField.text('h_id', 'ID', 40, ''),
					$.gridField.text('item_id', '物品ID', 0, ''),
					$.gridField.readonly('d_name', '名稱', 120),
					$.gridField.text('h_type', '類型', 80, '0'),
					$.gridField.readonly('h_1', '勳章1', 40),
					$.gridField.text('h_2', '勳章2', 40, '0'),
					$.gridField.text('h_3', '勳章3', 40, ''),
					$.gridField.text('h_4', '勳章4', 40, ''),
					$.gridField.text('h_5', '勳章5', 40, ''),
					$.gridField.text('item_num', '數量', 0, ''),
				],
			editurl: "control.php?f=itemHonor&act=edit",
			navBar: {add: false, del: false}
		},
		itemKey: {
			title: '鑰匙列表',
			columns: [
					$.gridField.text('d_id', 'ID', 40, ''),
					$.gridField.readonly('d_name', '名稱'),
					$.gridField.text('area_id', '開啟區域', 0, '0'),
					$.gridField.readonly('area_name', '開啟區域', 120),
					$.gridField.text('area_time', '開啟時間', 120, '0')
				],
			editurl: "control.php?f=itemKey&act=edit",
			navBar: {add: false, del: false}
		},
		itemPlus: {
			title: '精煉石列表',
			columns: [
					$.gridField.text('d_id', 'ID', 40, '', [1, 1]),
					$.gridField.readonly('d_name', '名稱', 200),
					$.gridField.text('d_lv', '等級', 40, '0', [3, 1]),
					$.gridField.text('d_type', '類別', 40, '0', [4, 1]),
					$.gridField.text('d_at', '物攻', 40, '0', [5, 1]),
					$.gridField.text('d_mat', '魔攻', 40, '0', [6, 1]),
					$.gridField.text('d_df', '物防', 40, '0', [7, 1]),
					$.gridField.text('d_mdf', '魔防', 40, '0', [8, 1]),
					$.gridField.text('d_str', '力量', 40, '0', [2, 2]),
					$.gridField.text('d_agi', '速度', 40, '0', [1, 2]),
					$.gridField.text('d_smart', '智力', 40, '0', [5, 2]),
					$.gridField.text('d_life', '生命', 40, '0', [3, 2]),
					$.gridField.text('d_vit', '體質', 40, '0', [4, 2]),
					$.gridField.text('d_au', '信仰', 40, '0', [6, 2]),
					$.gridField.text('d_be', '魅力', 40, '0', [7, 2])
				],
			editurl: "control.php?f=playerPlus&act=edit",
			navBar: {add: false, del: false}
		},
		itemSale: {
			title: '拍賣品列表',
			columns: [
					$.gridField.text('s_id', 'ID', 40, ''),
					$.gridField.text('p_id', '物品ID', 0, ''),
					$.gridField.readonly('p_name', '賣家', 120),
					$.gridField.text('d_id', '物品ID', 0, '0'),
					$.gridField.readonly('d_name', '拍賣品', 120),
					$.gridField.text('d_type', '物品類型', 40),
					$.gridField.text('hs_id', '鑲嵌ID', 0, '0'),
					$.gridField.text('ps_id', '精煉ID', 0, ''),
					$.gridField.text('item_num', '數量', 0, ''),
					$.gridField.text('s_money', '競標價', 40, ''),
					$.gridField.text('s_type', '拍賣類型', 40, ''),
					$.gridField.text('e_money', '結標價', 40, ''),
					$.gridField.text('e_p_id', '下標玩家', 0, ''),
					$.gridField.text('e_p_name', '下標玩家', 40, ''),
					$.gridField.text('dateline', '日期', 80, ''),
				],
			editurl: "control.php?f=itemSale&act=edit",
			navBar: {add: false, del: false}
		},
		itemStone: {
			title: '魔石列表',
			columns: [
					$.gridField.text('d_id', 'ID', 40, '', [1, 1]),
					$.gridField.readonly('d_name', '名稱', 200),
					$.gridField.text('d_lv', '等級', 40, '0', [3, 1]),
					$.gridField.text('d_class', '類別', 40, '0', [4, 1]),
					$.gridField.text('s_at', '物攻', 40, '0', [5, 1]),
					$.gridField.text('s_mat', '魔攻', 40, '0', [6, 1]),
					$.gridField.text('s_df', '物防', 40, '0', [7, 1]),
					$.gridField.text('s_mdf', '魔防', 40, '0', [8, 1]),
					$.gridField.text('s_agl', '速度', 40, '0', [1, 2]),
					$.gridField.text('s_str', '力量', 40, '0', [2, 2]),
					$.gridField.text('s_life', '生命', 40, '0', [3, 2]),
					$.gridField.text('s_vit', '體質', 40, '0', [4, 2]),
					$.gridField.text('s_smart', '智力', 40, '0', [5, 2]),
					$.gridField.text('s_au', '信仰', 40, '0', [6, 2]),
					$.gridField.text('s_be', '魅力', 40, '0', [7, 2]),
					$.gridField.text('s_hpmax', 'HPMAX', 40, '0', [8, 2])
				],
			editurl: "control.php?f=playerStone&act=edit",
			navBar: {add: false, del: false}
		},
		itemSyn: {
			title: '合成表',
			columns: [
					$.gridField.text('syn_id', 'ID', 40, ''),
					$.gridField.text('syn_result', '合成結果', 0, ''),
					$.gridField.readonly('d_name', '合成結果', 120),
					$.gridField.text('syn_element', '材料', 0, '0'),
					$.gridField.readonly('syn_name', '材料', 320),
					$.gridField.text('syn_topr', '成功率', 40, '100'),
					$.gridField.text('syn_num', '數量', 0, '1'),
					$.gridField.text('syn_mission', '任務', 40, ''),
					$.gridField.text('syn_need_mission', '前置任務', 0, ''),
					$.gridField.readonly('m_subject', '前置任務', 80, '')
				],
			editurl: "control.php?f=itemSyn&act=edit",
			navBar: {add: false, del: false}
		},
		itemUsed: {
			title: '消耗品列表',
			columns: [
					$.gridField.text('d_id', 'ID', 40, '', [1, 1]),
					$.gridField.readonly('d_name', '道具名稱', 200),
					$.gridField.text('d_type', '類型', 100, $.wog.suppliesType, [2, 1]),
					$.gridField.text('d_lv', '等級', 40, '0', [3, 1]),
					$.gridField.text('d_g_exp', '增加經驗', 0, '0', [4, 1]),
					$.gridField.text('d_g_bag', '增加背包', 0, '0', [5, 1]),
					$.gridField.text('ch_id', '職業ID', 0, '0', [6, 1]),
					$.gridField.text('skill_id', '技能ID', 0, '0', [7, 1]),
					$.gridField.text('use_time', '時效', 40, '0', [8, 1]),
					$.gridField.text('exp', 'EXP倍率', 0, '0', [1, 2]),
					$.gridField.text('skill_exp', '技能EXP倍率', 0, '0', [2, 2]),
					$.gridField.text('at', 'AT倍率', 0, '0', [3, 2]),
					$.gridField.text('mat', 'MAT倍率', 0, '0', [4, 2]),
					$.gridField.text('df', 'DF倍率', 0, '0', [5, 2]),
					$.gridField.text('mdf', 'MDF倍率', 0, '0', [6, 2]),
					$.gridField.text('hp', 'HP倍率', 0, '0', [7, 2]),
					$.gridField.text('sp', 'SP倍率', 0, '0', [8, 2])
				],
			editurl: "control.php?f=playerBuff&act=edit",
			navBar: {add: false, del: false}
		},
		monster: {
			title: "怪物列表",
			columns: [
				$.gridField.id('m_id', 'ID', 50),
				$.gridField.text('*m_name', '名稱', 100, ''),
				$.gridField.text('m_sat_name', '必殺技', 0, ''),
				$.gridField.text('s_property', '屬性', 40, $.wog.s_property),
				$.gridField.text('m_img', '頭像', 100, ''),
				$.gridField.text('m_place', '出沒地', 60, $.wog.place),
				$.gridField.text('m_subplace', '子區域', 0, '0'),
				$.gridField.text('m_lv', '等級', 40, '1'),
				$.gridField.text('m_meet', '遭遇率', 100, '0'),
				$.gridField.text('m_mission', '任務ID', 0, '0'),
				$.gridField.readonly('m_mission', '任務', 100),
				$.gridField.checkbox('m_npc', 'NPC', 40, '0'),
				$.gridField.textarea('m_npc_message', 'NPC訊息', 0, ''),
				$.gridField.text('hp', 'HP', 0, '1', [1, 2]),
				$.gridField.text('sp', 'SP', 0, '1', [2, 2]),
				$.gridField.text('at', '物攻', 0, '1', [3, 2]),
				$.gridField.text('df', '物防', 0, '1', [4, 2]),
				$.gridField.text('mat', '魔攻', 0, '1', [5, 2]),
				$.gridField.text('mdf', '魔防', 0, '1', [6, 2]),
				$.gridField.text('str', '力量', 0, '1', [7, 2]),
				$.gridField.text('smart', '智力', 0, '1', [8, 2]),
				$.gridField.text('agi', '速度', 0, '0', [9, 2]),
				$.gridField.text('life', '生命', 0, '1', [10, 2]),
				$.gridField.text('vit', '體質', 0, '1', [11, 2]),
				$.gridField.text('au', '信仰', 0, '1', [12, 2]),
				$.gridField.text('be', '魅力', 0, '1', [13, 2]),
				$.gridField.text('skill_1', '技能1', 0, '0', [1, 3]),
				$.gridField.text('skill_2', '技能2', 0, '0', [2, 3]),
				$.gridField.text('skill_3', '技能3', 0, '0', [3, 3]),
				$.gridField.text('skill_4', '技能4', 0, '0', [4, 3]),
				$.gridField.text('skill_5', '技能5', 0, '0', [5, 3]),
				$.gridField.text('time_1', '機率1', 0, '0', [6, 3]),
				$.gridField.text('time_2', '機率2', 0, '0', [7, 3]),
				$.gridField.text('time_3', '機率3', 0, '0', [8, 3]),
				$.gridField.text('m_job_exp', '職業熟練度', 0, '1', [9, 3]),
				$.gridField.text('d_id', '掉落物品', 0, '0', [10, 3]),
				$.gridField.text('m_topr', '掉落機率', 0, '0', [11, 3])
			],
			editurl: "control.php?f=monster&act=edit"
		},
		player: {
			title: function(p) {
				if(!p.type) return '玩家列表';
				var type = p.type;
				var map = {
					pc: "正常玩家(PC)",
					npc: "非玩家(NPC)",
					nolock: '未封鎖的玩家',
					lock: '已封鎖的玩家',
					cp: '冠軍'
				};
				return '玩家列表 - '+map[type];
			},
			columns: [[
				$.gridField.id("p_id", "ID", 50),
				$.gridField.text("*p_name", "名稱", 100),	
				$.gridField.text("*p_password", "密碼", 0, ""),
				$.gridField.text("p_email", "信箱", 140),
				$.gridField.text("p_ipadd", "IP紀錄", 140),
				$.gridField.date("p_act_time", "行動時間", 100, "0"),
				$.gridField.text("act_num", "行動力", 0, "0"),
				$.gridField.date("act_num_time", "行動補充時間", 0, "0"),
				$.gridField.date("p_lock_time", "封鎖時間", 100, "0"),
				$.gridField.checkbox("p_st", "VIP", 50),
				$.gridField.text("p_userlv", "身份", 0, $.wog.userlv),
				$.gridField.checkbox("p_lock", "封鎖", 0),
				$.gridField.checkbox("p_npc", "NPC", 0),
				$.gridField.text("s_property", "屬性", 0, $.wog.s_property),
				$.gridField.text("hp", "HP", 0, "8"),
				$.gridField.text("hpmax", "HP MAX", 0, "8"),
				$.gridField.text("sp", "SP", 0, "8"),
				$.gridField.text("spmax", "SP MAX", 0, "8"),
				$.gridField.text("ch_id", "職業", 0, "1"),
				$.gridField.text("p_money", "現金", 0, "0"),
				$.gridField.text("p_bank", "存款", 0, "0"),
				$.gridField.text("p_cash", "點數", 0, "0"),

				// Column 2
				$.gridField.text("str", "力量", 0, "8", [1, 2]),	
				$.gridField.text("smart", "智力", 0, "8", [2, 2]),
				$.gridField.text("agi", "敏捷", 0, "8", [3, 2]),
				$.gridField.text("life", "生命", 0, "8", [4, 2]),
				$.gridField.text("vit", "體質", 0, "8", [5, 2]),
				$.gridField.text("au", "信仰", 0, "8", [6, 2]),
				$.gridField.text("be", "魅力", 0, "8", [7, 2]),
				$.gridField.text("base_str", "基礎力量", 0, "8", [8, 2]),
				$.gridField.text("base_smart", "基礎智力", 0, "8", [9, 2]),
				$.gridField.text("base_agi", "基礎敏捷", 0, "8", [10, 2]),
				$.gridField.text("base_life", "基礎生命", 0, "8", [11, 2]),
				$.gridField.text("base_vit", "基礎體質", 0, "8", [12, 2]),
				$.gridField.text("base_au", "基礎信仰", 0, "8", [13, 2]),
				$.gridField.text("base_be", "基礎魅力", 0, "8", [14, 2]),
				$.gridField.text("at", "物理攻擊力", 0, "8", [15, 2]),
				$.gridField.text("df", "物理防禦力", 0, "8", [16, 2]),
				$.gridField.text("mat", "魔法攻擊力", 0, "8", [17, 2]),
				$.gridField.text("mdf", "魔法防禦力", 0, "8", [18, 2]),

				// Column 3
				$.gridField.text("p_exp", "經驗", 0, "0", [1, 3]),
				$.gridField.text("p_nextexp", "升級經驗", 0, "1000", [2, 3]),
				$.gridField.text("p_lv", "等級", 0, "1", [3, 3]),
				$.gridField.text("p_birth", "出生地", 0, $.wog.birth, [4, 3]),
				$.gridField.text("p_place", "冒險地", 0, $.wog.place, [5, 3]),
				$.gridField.text("p_sat_name", "必殺技", 0, "", [6, 3]),
				$.gridField.text("p_win", "勝場", 0, "0", [7, 3]),
				$.gridField.text("p_lost", "敗場", 0, "0", [8, 3]),
				$.gridField.text("p_sex", "性別", 0, "0", [9, 3]),
				$.gridField.checkbox("p_img_set", "圖像設置", 0, "0", [10, 3]),
				$.gridField.text("p_img_url", "個人圖像", 0, "0", [11, 3]),
				$.gridField.checkbox("p_pk_s", "PK設置", 0, "0", [12, 3]),
				$.gridField.text("p_pk_money", "PK獎金", 0, "0", [13, 3]),
				$.gridField.text("p_bag", "背包格數", 0, "0", [14, 3]),
				$.gridField.text("p_depot", "倉庫格數", 0, "0", [15, 3]),
				$.gridField.text("p_cp_st", "冠軍", 0, "0", [16, 3]),
				$.gridField.text("p_cp_time", "冠軍日期", 0, "0", [17, 3]),

				// Column 4
				$.gridField.text("i_img", "系統圖像", 0, "1", [1, 4]),
				$.gridField.text("p_g_id", "公會", 0, "0", [2, 4]),
				$.gridField.text("t_id", "隊伍", 0, "0", [3, 4]),
				$.gridField.text("p_support", "支援對象", 0, "0", [4, 4]),
				$.gridField.text("p_recomm", "推薦人", 0, "0", [5, 4]),
				$.gridField.text("p_attempts", "驗證次數", 0, "0", [6, 4]),
				$.gridField.date("p_cdate", "建立日期", 0, "0", [7, 4]),
				$.gridField.date("p_online_time", "登入日期", 0, "0", [8, 4]),
				$.gridField.text("p_bbsid", "論壇ID", 0, "0", [9, 4])
			]],
			contextMenu: {
				edit: ['編輯', 'ui-icon-pencil', 'edit', {
					edititem: ['編輯背包', 'ui-icon-pencil', 'playerItem', {
						editequipment: ['編輯裝備', 'ui-icon-pencil', 'playerEquipment'],
						editdepot: ['編輯倉庫', 'ui-icon-pencil', 'playerDepot'],
						editexchange: ['編輯資源', 'ui-icon-pencil', 'playerExchange']
					}],
					editchexp: ['編輯職業熟練', 'ui-icon-pencil', 'playerChExp', {
							editskill: ['編輯技能', 'ui-icon-pencil', 'playerSkill'],
							editskillsetup: ['編輯裝備技能', 'ui-icon-pencil', 'playerSkillSetup']
					}],
					editmission: ['編輯任務', 'ui-icon-pencil', 'playerMission'],
					editpet: ['編輯寵物', 'ui-icon-pencil', 'playerPet'],
					editmercenary: ['編輯傭兵', 'ui-icon-pencil', 'playerMercenary'],
					editbuff: ['編輯狀態', 'ui-icon-pencil', 'playerBuff'],
					editmessage: ['編輯訊息', 'ui-icon-pencil', 'playerMessage', {
						editmail: ['編輯信箱', 'ui-icon-pencil', 'playerMail'],
						editfriend: ['編輯好友', 'ui-icon-pencil', 'playerFriend']
					}]
				}]
			},
			editurl: 'control.php?f=player&act=edit',
			sortname: 'p_id',
			toolbar: {
				'全部': {title: '所有玩家', search: []},
				'PC': {title: '正常玩家', search: ["p_npc", "eq", "0"]},
				'NPC': {title: '非玩家', search: ["p_npc", "eq", "1"]},
				'封鎖': {title: '已封鎖玩家', search: ["p_lock", "eq", "1"]},
				'未封鎖': {title: '未封鎖玩家', search: ["p_lock", "eq", "0"]},
				'冠軍': {title: '冠軍玩家', search: ["p_cp_st", "eq", "1"]}
			},
			navBar: {
				add: {width: 1000}, edit: {width: 1000}
			}
		},
		playerBuff: {
			title: '玩家增益列表',
			columns: [
				$.gridField.id("p_id", "ID", 40),
				$.gridField.readonly("p_name", "名稱", 60),
				$.gridField.text("end_time", "結束時間", 80),
				$.gridField.text("exp", "經驗", 40),
				$.gridField.text("skill_exp", "技能經驗", 60),
				$.gridField.text("at", "物攻", 40),
				$.gridField.text("mat", "魔攻", 40),
				$.gridField.text("df", "物防", 40),
				$.gridField.text("mdf", "魔防", 40),
				$.gridField.text("hp", "HP", 40),
				$.gridField.text("sp", "SP", 40)
			],
			editurl: "control.php?f=playerBuff&act=edit",
			navBar: {add: false, del: false}
		},
		playerChExp: {
			init: function() {
				if(typeof $.WOGGrid.CharacterName != 'undefined') return true;
				return $.get('control.php?f=DynamicData&act=getMasteryName').done(function(json) {	
					$.WOGGrid.CharacterName = {};
					$.each(json, function(k, v) {
						$.WOGGrid.CharacterName[k] = v;
					});
				});
			},
			title: "職業熟練度列表",
			columns: function(p) {
				function chName(ch_id) {
					if($.WOGGrid.CharacterName[ch_id]) return $.WOGGrid.CharacterName[ch_id];
					else return 'ch_'+ch_id;
				}
				function skName(ch_id) {return chName(ch_id)+'技能';}
				
				return [
					$.gridField.text("*p_id", "玩家ID", 40, '', [1, 1]),
					$.gridField.readonly("p_name", "玩家", 80),
					$.gridField.text("ch_6", chName(6), 60, '0', [1, 2]),
					$.gridField.text("ch_7", chName(7), 60, '0', [2, 2]),
					$.gridField.text("ch_8", chName(8), 60, '0', [3, 2]),
					$.gridField.text("ch_9", chName(9), 60, '0', [4, 2]),
					$.gridField.text("ch_10", chName(10), 60, '0', [5, 2]),
					$.gridField.text("ch_11", chName(11), 60, '0', [6, 2]),
					$.gridField.text("ch_12", chName(12), 60, '0', [7, 2]),
					$.gridField.text("ch_13", chName(13), 60, '0', [8, 2]),
					$.gridField.text("ch_14", chName(14), 60, '0', [9, 2]),
					$.gridField.text("ch_15", chName(15), 60, '0', [10, 2]),
					$.gridField.text("ch_16", chName(16), 60, '0', [11, 2]),
					$.gridField.text("ch_17", chName(17), 60, '0', [12, 2]),
					$.gridField.text("ch_18", chName(18), 0, '0', [13, 2]),
					$.gridField.text("ch_19", chName(19), 0, '0', [14, 2]),
					$.gridField.text("ch_20", chName(20), 0, '0', [15, 2]),
					$.gridField.text("ch_21", chName(21), 0, '0', [1, 3]),
					$.gridField.text("ch_22", chName(22), 0, '0', [2, 3]),
					$.gridField.text("ch_23", chName(23), 0, '0', [3, 3]),
					$.gridField.text("ch_24", chName(24), 0, '0', [4, 3]),
					$.gridField.text("ch_25", chName(25), 0, '0', [5, 3]),
					$.gridField.text("ch_26", chName(26), 0, '0', [6, 3]),
					$.gridField.text("ch_27", chName(27), 0, '0', [7, 3]),
					$.gridField.text("ch_28", chName(28), 0, '0', [8, 3]),
					$.gridField.text("ch_29", chName(29), 0, '0', [9, 3]),
					$.gridField.text("ch_30", chName(30), 0, '0', [10, 3]),
					$.gridField.text("ch_31", chName(31), 0, '0', [11, 3]),
					$.gridField.text("ch_32", chName(32), 0, '0', [12, 3]),
					$.gridField.text("ch_33", chName(33), 0, '0', [13, 3]),
					$.gridField.text("ch_34", chName(34), 0, '0', [14, 3]),
					$.gridField.text("ch_35", chName(35), 0, '0', [15, 3]),
					$.gridField.text("ch_36", chName(36), 0, '0', [1, 4]),
					$.gridField.text("ch_37", chName(37), 0, '0', [2, 4]),
					$.gridField.text("ch_38", chName(38), 0, '0', [3, 4]),
					$.gridField.text("sk_6", skName(6), 0, '0', [1, 5]),
					$.gridField.text("sk_7", skName(7), 0, '0', [2, 5]),
					$.gridField.text("sk_8", skName(8), 0, '0', [3, 5]),
					$.gridField.text("sk_9", skName(9), 0, '0', [4, 5]),
					$.gridField.text("sk_10", skName(10), 0, '0', [5, 5]),
					$.gridField.text("sk_11", skName(11), 0, '0', [6, 5]),
					$.gridField.text("sk_12", skName(12), 0, '0', [7, 5]),
					$.gridField.text("sk_13", skName(13), 0, '0', [8, 5]),
					$.gridField.text("sk_14", skName(14), 0, '0', [9, 5]),
					$.gridField.text("sk_15", skName(15), 0, '0', [10, 5]),
					$.gridField.text("sk_16", skName(16), 0, '0', [11, 5]),
					$.gridField.text("sk_17", skName(17), 0, '0', [12, 5]),
				];
			},
			editurl: "control.php?f=playerChExp&act=edit",
			navBar: {add: {width: 1000}, edit: {width: 1000}},
			sortname: 'p_id'
		},
		playerCP: {
			title: '冠軍資料',
			columns: [
				$.gridField.text("p_id", "ID", 40),
				$.gridField.text("p_birth", "生日", 100),
				$.gridField.text("p_name", "名稱", 100),
				$.gridField.text("at", "物攻", 0),
				$.gridField.text("df", "物防", 100),
				$.gridField.text("mat", "魔攻", 60),
				$.gridField.text("mdf", "魔防", 120),
				$.gridField.text("s_property", "屬性", 60),
				$.gridField.text("str", "力量", 0),
				$.gridField.text("life", "生命", 0),
				$.gridField.text("vit", "體質", 0),
				$.gridField.text("smart", "智慧", 0),
				$.gridField.text("agi", "敏捷", 0),
				$.gridField.text("hp", "HP", 0),
				$.gridField.text("p_luck", "運氣", 0),
				$.gridField.text("p_sat_name", "必殺技名稱", 0),
				$.gridField.text("hpmax", "HPMAX", 0),
				$.gridField.text("p_win_total", "總勝場", 0),
				$.gridField.text("p_lv", "等級", 0),
				$.gridField.text("a_id", "武器", 0),
				$.gridField.text("d_body_id", "身體", 0),
				$.gridField.text("d_foot_id", "足部", 0),
				$.gridField.text("d_hand_id", "手部", 0),
				$.gridField.text("d_head_id", "頭部", 0),
				$.gridField.text("d_item_id", "道具", 0),
				$.gridField.text("d_item_id2", "消耗品", 0),
				$.gridField.text("p_sex", "性別", 0),
				$.gridField.text("p_money", "現金", 0),
				$.gridField.text("p_exp", "經驗值", 0),
				$.gridField.text("p_nextexp", "升級經驗值", 0),
				$.gridField.text("p_win", "勝場", 0),
				$.gridField.text("p_lost", "敗場", 0),
				$.gridField.text("i_img", "頭像", 0),
				$.gridField.text("p_img_url", "頭像網址", 0),
				$.gridField.text("p_img_set", "頭像設置", 0),
				$.gridField.text("ch_id", "職業", 0),
				$.gridField.text("p_pid", "玩家ID", 0),
				$.gridField.text("au", "魅力", 0),
				$.gridField.text("be", "信仰", 0),
				$.gridField.text("sp", "SP", 0),
				$.gridField.text("spmax", "SPMAX", 0),
				$.gridField.text("base_str", "基本力量", 0),
				$.gridField.text("base_vit", "基本體質", 0),
				$.gridField.text("base_agi", "基本敏捷", 0),
				$.gridField.text("base_au", "基本魅力", 0),
				$.gridField.text("base_be", "基本信仰", 0),
				$.gridField.text("base_life", "基本生命", 0),
				$.gridField.text("base_smart", "基本智慧", 0),
				$.gridField.text("p_ch_s_id", "技能", 0),
				$.gridField.text("p_g_id", "公會", 0),
				$.gridField.text("p_place", "冒險地", 0),
				$.gridField.text("p_cdate", "出生日", 0)
			],
			editurl: "control.php?f=playerCP&act=edit",
			navBar: {add: false, del: false}
		},
		playerDepot: {
			title: "玩家倉庫列表",
			columns: [
				$.gridField.id("id", "ID", 40, '', [1, 1]),
				$.gridField.text("*p_id", "玩家ID", 0, '', [2, 1]),
				$.gridField.readonly("p_name", "持有玩家", 80),
				$.gridField.text("*d_id", "物品ID", 0, '', [3, 1]),
				$.gridField.readonly("d_name", "物品名稱", 80),
				$.gridField.text("d_type", "分類類型", 80, $.wog.bagtype, [4, 1]),
				$.gridField.text("d_num", "數量", 40, '0', [5, 1]),
				$.gridField.text("hs_id", "鑲嵌ID", 60, '0', [1, 2]),
				$.gridField.text("ps_id", "精煉ID", 60, '0', [2, 2])
			],
			editurl: "control.php?f=playerDepot&act=edit",
			navBar: {add: false, del: false},
			sortname: 'id'
		},
		playerEquipment: {
			title: "玩家裝備列表",
			columns: [
				$.gridField.id("p_id", "玩家ID", 40, '', [1, 1]),
				$.gridField.readonly("p_name", "玩家", 80),
				$.gridField.text("a_id", "武器ID", 0, '', [2, 1]),
				$.gridField.readonly("a_name", "武器名稱", 80),
				$.gridField.text("d_body_id", "身體ID", 0, '', [3, 1]),
				$.gridField.readonly("body_name", "身體名稱", 80),
				$.gridField.text("d_head_id", "頭部ID", 0, '', [4, 1]),
				$.gridField.readonly("head_name", "頭部名稱", 80),
				$.gridField.text("d_hand_id", "手部ID", 0, '', [5, 1]),
				$.gridField.readonly("hand_name", "手部名稱", 80),
				$.gridField.text("d_foot_id", "足部ID", 0, '', [6, 1]),
				$.gridField.readonly("foot_name", "足部名稱", 80),
				$.gridField.text("d_item_id", "道具ID", 0, '', [7, 1]),
				$.gridField.readonly("item_name", "道具名稱", 80),
				$.gridField.text("d_item_id2", "消耗品ID", 0, '', [8, 1]),
				$.gridField.readonly("item_name2", "消耗品名稱", 80),
				$.gridField.text("s_a_id", "武器魔石ID", 0, '0', [1, 2]),
				$.gridField.text("s_body_id", "身體魔石ID", 0, '0', [2, 2]),
				$.gridField.text("s_head_id", "頭部魔石ID", 0, '0', [3, 2]),
				$.gridField.text("s_hand_id", "手部魔石ID", 0, '0', [4, 2]),
				$.gridField.text("s_foot_id", "足部魔石ID", 0, '0', [5, 2]),
				$.gridField.text("s_item_id", "道具魔石ID", 0, '0', [6, 2]),
				$.gridField.text("p_a_id", "武器精煉ID", 0, '0', [1, 3]),
				$.gridField.text("p_body_id", "身體精煉ID", 0, '0', [2, 3]),
				$.gridField.text("p_head_id", "頭部精煉ID", 0, '0', [3, 3]),
				$.gridField.text("p_hand_id", "手部精煉ID", 0, '0', [4, 3]),
				$.gridField.text("p_foot_id", "足部精煉ID", 0, '0', [5, 3]),
				$.gridField.text("p_item_id", "道具精煉ID", 0, '0', [6, 3])
			],
			editurl: "control.php?f=playerEquipment&act=edit",
			navBar: {add: false, del: false},
			sortname: 'p_id'
		},
		playerExchange: {
			title: "玩家資源列表",
			columns: [
				$.gridField.id("el_id", "ID", 40, '', [1, 1]),
				$.gridField.text("*p_id", "玩家ID", 0, '', [2, 1]),
				$.gridField.readonly("p_name", "持有玩家", 80),
				$.gridField.text("*ex_id", "資源ID", 0, '', [3, 1]),
				$.gridField.readonly("ex_name", "資源名稱", 80),
				$.gridField.text("el_amount", "數量", 80, '0', [4, 1]),
				$.gridField.text("el_money", "成本", 120, '0', [5, 1])
			],
			editurl: "control.php?f=playerExchange&act=edit",
			sortname: 'p_id'
		},
		playerFriend: {
			title: "玩家好友列表",
			columns: [
				$.gridField.text("*p_id", "玩家ID", 80, '', [1, 1]),
				$.gridField.readonly("p_name", "玩家名稱", 200),
				$.gridField.text("*f_id", "好友ID", 0, '', [2, 1]),
				$.gridField.readonly("f_name", "好友名稱", 200)
			],
			editurl: "control.php?f=playerFriend&act=edit",
			sortname: 'p_id'
		},
		playerHero: {
			title: '英雄列表',
			columns: [
				$.gridField.id("p_id", "ID", 40),
				$.gridField.readonly("p_name", "玩家名稱", 100),
				$.gridField.text("hero_npc", "英雄NPC ID", 0),
				$.gridField.readonly("hero_name", "英雄NPC名稱", 100),
				$.gridField.text("hero_type", "類型", 60),
				$.gridField.text("hero_time", "當上時間", 120),
				$.gridField.checkbox("p_cp_st", "設定", 0)
			],
			editurl: "control.php?f=playerHero&act=edit",
			navBar: {add: false, del: false}
		},
		playerItem: {
			title: '玩家物品列表',
			columns: [
				$.gridField.id("p_id", "ID", 40),
				$.gridField.readonly("p_name", "名稱", 60),
				$.gridField.text("a_id", "武器", 80),
				$.gridField.text("d_body_id", "身體", 80),
				$.gridField.text("d_foot_id", "足部", 80),
				$.gridField.text("d_hand_id", "手部", 80),
				$.gridField.text("d_head_id", "頭部", 80),
				$.gridField.text("d_item_id", "道具", 80),
				$.gridField.text("d_stone_id", "魔石", 80),
				$.gridField.text("d_honor_id", "勳章", 80),
				$.gridField.text("d_key_id", "鑰匙", 80),
				$.gridField.text("d_plus_id", "精煉石", 80)
			],
			editurl: "control.php?f=playerItem&act=edit",
			navBar: {add: false, del: false}
		},
		playerKey: {
			title: '啟用鑰匙列表',
			columns: [
				$.gridField.id("p_id", "ID", 80),
				$.gridField.readonly("p_name", "玩家名稱", 80),
				$.gridField.text("area_id", "地區ID", 0),
				$.gridField.text("area_name", "地區名稱", 120),
				$.gridField.text("area_time", "開放時間", 120)
			],
			editurl: "control.php?f=playerKey&act=edit",
			navBar: {add: false, del: false}
		},
		playerLog: {
			title: "行為紀錄",
			columns: [
				$.gridField.id("id", "ID", 40, ''),
				$.gridField.text("*p_id", "玩家ID", 0),
				$.gridField.readonly("*p_id", "玩家", 80),
				$.gridField.text("type", "類型", 80),
				$.gridField.text("*title", "標題", 320),
				$.gridField.text("sql_text", "SQL內容", 0, ''),
				$.gridField.text("datetime", "日期", 80),
			],
			editurl: "control.php?f=playerLog&act=edit"
		},
		playerMail: {
			title: "玩家信件列表",
			columns: [
				$.gridField.id("id", "ID", 40, '', [1, 1]),
				$.gridField.text("*p_id", "收件人ID", 0, '', [2, 1]),
				$.gridField.readonly("p_name", "收件人", 80),
				$.gridField.text("*p_name", "寄件人", 80, '', [3, 1]),
				$.gridField.text("*m_subject", "主旨", 80, '', [4, 1]),
				$.gridField.textarea("m_body", "內文", 0, '', [5, 1]),
				$.gridField.checkbox("m_read", "已讀", 40, '0', [5, 1]),
				$.gridField.text("m_time", "寄件時間", 80, '0', [6, 1])
			],
			editurl: "control.php?f=playerMail&act=edit",
			sortname: 'p_id'
		},
		playerMercenary: {
			title: "受僱傭兵列表",
			columns: [
				$.gridField.id("id", "ID", 40, '', [1, 1]),
				$.gridField.text("*p_id", "僱用玩家ID", 0, '', [2, 1]),
				$.gridField.readonly("p_name", "僱用玩家", 60),
				$.gridField.text("*me_id", "傭兵ID", 0, '', [3, 1]),
				$.gridField.readonly("me_name_raw", "傭兵原名", 80),
				$.gridField.text("me_name", "傭兵名稱", 80, '沒有名稱', [4, 1]),
				$.gridField.text("me_status", "狀態", 60,$.wog.mercenaryStatus, [1, 2]),
				$.gridField.text("me_count", "戰鬥次數", 80, '0', [2, 2]),
				$.gridField.text("me_place", "戰鬥地點", 80, $.wog.place, [3, 2]),
				$.gridField.text("me_fight_time", "戰鬥時間", 80, '0', [4, 2])
			],
			editurl: "control.php?f=playerMercenary&act=edit",
			navBar: {add: false, del: false}
		},
		playerMessage: {
			title: "玩家情報中心列表",
			columns: [
				$.gridField.id("m_id", "ID", 40, '', [1, 1]),
				$.gridField.text("*p_id", "玩家ID", 0, '', [2, 1]),
				$.gridField.readonly("p_name", "接訊玩家", 80),
				$.gridField.textarea("*title", "訊息內容", 320, '', [3, 1]),
				$.gridField.text("from_pid", "來源ID", 0, '0', [4, 1]),
				$.gridField.readonly("from_name", "發信者", 80),
				$.gridField.text("dateline", "發信時間", 80, '0', [5, 1])
			],
			editurl: "control.php?f=playerMessage&act=edit"
		},
		playerMission: {
			title: '任務紀錄列表',
			columns: [
				$.gridField.id("*p_id", "玩家ID", 40),
				$.gridField.readonly("p_name", "玩家", 100),
				$.gridField.text("*m_id", "任務ID", 0),
				$.gridField.readonly("m_name", "任務", 240),
				$.gridField.text("m_status", "狀態", 100),
				$.gridField.text("m_kill_num", "殘餘數量", 120)
			],
			editurl: "control.php?f=playerMission&act=edit",
			sortname: 'p_id'
		},
		playerPet: {
			title: function(p) {
					return p && p.type === 'bid' ? '拍賣寵物列表' : "玩家寵物列表" ;
				},
				columns: [
					$.gridField.id("pe_id", "ID", 40, '', [1, 1]),
					$.gridField.text("*pe_p_id", "飼主ID", 0, '', [2, 1]),
					$.gridField.readonly("p_name", "飼主名稱", 60),
					$.gridField.text("*pe_name", "寵物名稱", 100, '', [3, 1]),
					$.gridField.readonly("pe_mname", "原型名稱", 100),
					$.gridField.text("pe_at", "AT", 40, '1', [1, 2]),
					$.gridField.text("pe_mt", "MT", 40, '1', [2, 2]),
					$.gridField.text("pe_fu", "飽腹度", 0, '80', [4, 2]),
					$.gridField.text("pe_def", "DEF", 40, '1', [3, 2]),
					$.gridField.text("pe_hu", "疲勞", 0, '0', [5, 2]),
					$.gridField.text("pe_type", "個性", 40, $.wog.petType, [5, 1]),
					$.gridField.text("pe_age", "pe_age(unused)", 0, '0', [1, 4]),
					$.gridField.text("pe_he", "親密", 0, '0', [6, 2]),
					$.gridField.text("pe_fi", "出擊值", 0, '1', [7, 2]),
					$.gridField.text("pe_dateline", "特訓日期", 0, '0', [4, 3]),
					$.gridField.text("*pe_m_id", "原型ID", 0, '', [4, 1]),
					$.gridField.text("pe_st", "狀態", 40, $.wog.petStatus, [6, 1]),
					$.gridField.text("pe_money", "拍賣價位", 0, '0', [5, 3]),
					$.gridField.text("pe_s_dateline", "拍賣結標日期", 0, '0', [6, 3]),
					$.gridField.text("pe_b_dateline", "出生日期", 0, '0', [7, 1]),
					$.gridField.text("pe_f_dateline", "pe_f_dateline(unused)", 0, '0', [2, 4]),
					$.gridField.text("pe_b_old", "年紀", 40, '0', [8, 1]),
					$.gridField.text("pe_mimg", "系統圖像", 0, '', [1, 3]),
					$.gridField.text("pe_img_url", "頭像網址", 0, '', [3, 3]),
					$.gridField.checkbox("pe_img_set", "個人頭像", 0, '0', [2, 3]),
					$.gridField.checkbox("p_send", "綁定", 40, '0', [9, 1])
				],
				editurl: "control.php?f=playerPet&act=edit",
				navBar: {add: false, del: false}
		},
		playerSkill: {
			title: '已學技能列表',
			columns: [
				$.gridField.id("*p_id", "玩家ID", 40),
				$.gridField.readonly("p_name", "玩家名稱", 100),
				$.gridField.text("*s_id", "技能ID", 0),
				$.gridField.readonly("s_name", "技能名稱", 100),
				$.gridField.text("main_sid", "父類別技能", 0),
				$.gridField.readonly("main_name", "父類別技能", 120),
				$.gridField.checkbox("s_lv", "設定", 60)
			],
			editurl: "control.php?f=playerSkill&act=edit",
			navBar: {add: false, del: false}
		},
		playerSkillSetup: {
			title: '裝備技能列表',
			columns: [
				$.gridField.id("*p_id", "玩家ID", 40),
				$.gridField.readonly("p_name", "玩家名稱", 100),
				$.gridField.text("skill_1", "技能1", 0),
				$.gridField.readonly("name1", "技能1", 100),
				$.gridField.text("skill_2", "技能2", 0),
				$.gridField.readonly("name_2", "技能2", 100),
				$.gridField.checkbox("skill_3", "技能3", 0),
				$.gridField.readonly("name_3", "技能3", 100),
				$.gridField.checkbox("skill_4", "技能4", 0),
				$.gridField.readonly("name_4", "技能4", 100),
				$.gridField.checkbox("skill_5", "技能5", 0),
				$.gridField.readonly("name_5", "技能5", 100),
				$.gridField.text("time_1", "頻率1", 60),
				$.gridField.text("time_2", "頻率2", 60),
				$.gridField.text("time_3", "頻率3", 60),
				$.gridField.text("time_4", "頻率4", 60),
				$.gridField.text("time_5", "頻率5", 60),
			],
			editurl: "control.php?f=playerSkillSetup&act=edit",
			navBar: {add: false, del: false}
		},
		syn: {
			showList: {
				title: "合成道具列表",
				columns: [
					$.gridField.id('syn_id', 'ID', 50),
					$.gridField.text('*syn_result', '結果ID', 0, ''),
					$.gridField.readonly('d_name', '合成結果', 120),
					$.gridField.text('*syn_element', '材料', 0, ''),
					$.gridField.readonly('syn_element_name', '材料', 600, ''),
					$.gridField.text('*syn_topr', '機率', 40, '100'),
					$.gridField.text('syn_num', '數量', 0, '1'),
					$.gridField.checkbox('syn_mission', '任務', 40, '0'),
					$.gridField.text('syn_need_mission', '前置任務', 0, '0'),
					$.gridField.readonly('m_subject', '前置任務', 140, '0')
				],
				editurl: "control.php?f=syn&act=edit"
			}
		},
		team: {
			title: '隊伍列表',
			columns: [
					$.gridField.text('*t_id', 'ID', 40, ''),
					$.gridField.text('p_id', '隊長', 0, ''),
					$.gridField.readonly('p_name', '隊長', 160, ''),
					$.gridField.text('t_name', '隊伍名稱', 160, ''),
					$.gridField.text('t_peo', '人數', 40, '0'),
					$.gridField.text('t_time', '建立時間', 120, '0')
				],
			editurl: "control.php?f=team&act=edit",
			navBar: {add: false, del: false}
		},
		teamJoin: {
			title: '加入隊伍請求',
			columns: [
					$.gridField.text('*t_j_id', 'ID', 40, ''),
					$.gridField.text('*t_id', '隊伍', 0, ''),
					$.gridField.readonly('t_name', '隊長', 160, ''),
					$.gridField.text('*p_id', '請求者', 0, ''),
					$.gridField.readonly('p_name', '請求者', 160, ''),
					$.gridField.text('t_j_dateline', '請求日期', 160, '')
				],
			editurl: "control.php?f=teamJoin&act=edit",
			navBar: {add: false, del: false}
		}
	},
	get: function(name) {
		if(!$.WOGGrid.__models[name]) {
			console.warn('[WOGGrid] Non-existing grid setting: '+name);
			return {};
		}
		if($.WOGGrid.__models[name].model) {
			//TODO: 將.model 用法移除
			return $.WOGGrid.__models[name].model;
		} else {
			return $.WOGGrid.__models[name];
		}
	}
};
$.fn.extend({
	toolbarButtonAdd: function(elem,p){
		p = $.extend({
		caption : "newButton",
		title: '',
		buttonicon : 'ui-icon-newwin',
		onClickButton: null,
		position : "last"
	}, p ||{});
	var $elem = $(elem);
	var tableString="<table style='float:left;table-layout:auto;' cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class='ui-toolbar-table'>";
	tableString+="<tbody> <tr></tr></table>";
	//console.log("In toolbar button add method");
		/* 
		* Step 1: check whether a table is already added. If not add
		* Step 2: If there is no table already added then add a table
		* Step 3: Make the element ready for addition to the table 
		* Step 4: Check the position and corresponding add the element
		* Step 5: Add other properties 
		*/
		//step 1 
		return this.each(function() {
			if( !this.grid)  { return; }
			var $this = this;
			if(elem.indexOf("#") !== 0) { 
				elem = "#"+elem; 
			}
			//step 2
			if($(elem).children('table').length === 0){
				$(elem).append(tableString);
			}	
			//step 3
			var tbd = $("<td style=\"padding:0 2px;border:1px solid transparent\"></td>");
			$(tbd).addClass('ui-toolbar-button ui-corner-all').append("<div class='ui-toolbar-div'><span class='ui-icon "+p.buttonicon+"' style='display:inline-block'></span>"+"<span style='top: -0.2em;position:relative'>"+p.caption+"</span>"+"</div>").attr("title",p.title  || "")
			.click(function(e){
				if ($.isFunction(p.onClickButton) ) { p.onClickButton.apply(p, [$this]); }
				if(p.search) {
					if(p.search.length === 3) {
						$this.p.search = true;
						$.extend($this.p.postData, {
							searchField: p.search[0],
							searchOper: p.search[1],
							searchString: p.search[2]
						});
					} else {
						$this.p.search = false;
						$.extend($this.p.postData, {
							searchField: "",
							searchOper: "",
							searchString: ""
						});
					}
					$($this).trigger("reloadGrid", {
						page: 1, 
						current: true
					});
				}
				return false;
			})
			.css('cursor', 'pointer')
			.hover(
				function () {$(this).css('border', "").addClass("ui-state-hover");},
				function () {$(this).removeClass("ui-state-hover").css('border', '1px solid transparent');}
			);
			if(p.id) {$(tbd).attr("id",p.id);}
			if(p.align) {$(elem).attr("align",p.align);}
			var findnav=$(elem).children('table');
			if(p.position ==='first'){
				if($(findnav).find('td').length === 0 ) {
					$("tr",findnav).append(tbd);
				} else {
					$("tr td:eq(0)",findnav).before(tbd);
				}
			} else {
				//console.log("not first");
				$("tr",findnav).append(tbd);
			}
		});
	}
});