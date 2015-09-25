//var editor = new $.fn.dataTable.Editor();
$.mixOptions = function(o1, o2) {
	$.each(o2, function(k, v) {
		if($.type(v) == 'object' && $.type(o1[k]) == 'object') o1[k] = $.mixOptions(o1[k], v);
		else {
			o1[k] = v;
		}
	});
	return o1;
};
//加入afterRender
Ember.View.reopen({
	didInsertElement : function(){
		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
	},
	afterRenderEvent : function(){
		// implement this hook in your own subclasses and run your jQuery logic there
	}
});
/*
$(document).ajaxSuccess(function(e, xhr, req, text) {
	if(xhr.status == 299) {
		console.log(text);
		alert(text);
		e.stopImmediatePropagation();
	}
});*/
 $.event.special.hoverintent = {
	setup: function() {
		$( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
	},
	teardown: function() {
		$( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
	},
	handler: function( event ) {
		var currentX, currentY, timeout,
		args = arguments,
		target = $( event.target ),
		previousX = event.pageX,
		previousY = event.pageY;
		function track( event ) {
			currentX = event.pageX;
			currentY = event.pageY;
		};
		function clear() {
			target
				.unbind( "mousemove", track )
				.unbind( "mouseout", clear );
			clearTimeout( timeout );
		}
		function handler() {
			var prop,
			orig = event;
			if ( ( Math.abs( previousX - currentX ) +
				Math.abs( previousY - currentY ) ) < 7 ) {
				clear();
				event = $.Event( "hoverintent" );
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
				// Prevent accessing the original event since the new event
				// is fired asynchronously and the old event is no longer
				// usable (#6028)
				delete event.originalEvent;
				target.trigger( event );
			} else {
				previousX = currentX;
				previousY = currentY;
				timeout = setTimeout( handler, 100 );
			}
		}
		timeout = setTimeout( handler, 100 );
		target.bind({
			mousemove: track,
			mouseout: clear
		});
	}
};
$.extend($.jgrid.edit, {
	closeAfterAdd: true,
	closeAfterEdit: true
});
$.extend($.jgrid.search, {
	closeAfterSearch: true,
	closeAfterEscape: true
});
$.extend($.jgrid.defaults, {
	beforeRequest: function() {
		// 自動隱藏 SubGrid
		var $grid = $(this);
		var cols = $grid.getGridParam('colModel');
		if(cols && cols[0].name == 'subgrid') {
			$grid.hideCol('subgrid');
		}
	},
	beforeProcessing: function() {
		var $grid = $(this);
		//若有ramap屬性，則執行column的remap動作
		var map = $grid.getGridParam('remap');
		if($.isArray(map) && map.length > 0) {
			//console.log(map);
			$grid.wogRemapColumns(map, true, false);
			$grid.setGridParam('remap', null);
		}
	},
	loadComplete: function() {
		var $grid = $(this);
		//幫grid加上預設的contextmenu
		$grid.wogContextMenu($grid.getGridParam('contextMenu') || {}, $grid.getGridParam('onShowContextMenu') || undefined);
		/*
		var cols = $grid.getGridParam('colModel');
		if(cols && cols[0].name == 'subgrid') {
			$grid.hideCol('subgrid');
		}*/
	},
	datatype: "json",
	height: 'auto',
	width: 'auto',
	rowNum: 10,
	rowList: [10, 20, 30, 50, 100]
});
var App = Ember.Application.create({
	currentPath: ''
	//LOG_TRANSITIONS: false
});
App.APRoute = Ember.Route.extend({
	__afterRender: function() {
		if(!this.afterRender || !$.isFunction(this.afterRender)) return;
		Ember.Run.ScheduleOnce('afterRender', this, function() {
			(this.afterRender || $.noop).call(this); //希望參數1能傳遞被繪製的root dom
		});
	}.on('activate')
});
$.getJSON("json/wogmodel.datagrid.json", function(data) {
	$.each(data, function(k1, v1) {
		if(!data[k1].columns) return;
		$.each(data[k1].columns[0], function(k2, v2) {
			if(v2.width == 0) data[k1].columns[0][k2].hidden = true;
		});
	});
	$.WOGGrid.__models = data;
});
$(document).ready(function() {
	//將CONSOLE訊息清理掉
	//console.clear();
	//console.log('為方便除錯，暫時將Ember.js的DEBUG訊息清除，若要恢復請修改main.js的ready function');
});
//-- Ember.js Component 定義 BEGIN --

// For MetroUI Fluent menu  -- BEGIN --


//-- Ember.js Component 定義 END --



