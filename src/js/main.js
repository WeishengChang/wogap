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
/*
$(document).ajaxSuccess(function(e, xhr, req, text) {
	if(xhr.status == 299) {
		console.log(text);
		alert(text);
		e.stopImmediatePropagation();
	}
});*/
/*
$.ajaxSetup({
	error: function(data) {
		console.log("[custom ajax erorr]", this, data);
	}
});
*/
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
var App = Ember.Application.create({
	currentPath: ''
	//LOG_TRANSITIONS: false
});
Ember.Route.reopen({
	__afterRender: function(){
		if(!this.afterRender || !$.isFunction(this.afterRender)) return;
		Ember.run.scheduleOnce('afterRender', this, function() {
			(this.afterRender || $.noop).call(this); //希望參數1能傳遞被繪製的root dom
		});
	}.on('activate')
});

$.messager.notification = function(message) {
	var a = $.messager.show({
		msg: message,
		width: 'auto',
		height: 'auto',
		showType: 'show',
		showSpeed: 100,
		timeout: 3000,
		style: {
			padding: 0,
			right: '',
			top: '',
			bottom: -document.body.scrollTop-document.documentElement.scrollTop,
			zIndex: $.fn.window.defaults.zIndex++
		}
	});
};
$(document).ready(function() {
	//將CONSOLE訊息清理掉
	//console.clear();
	//console.log('為方便除錯，暫時將Ember.js的DEBUG訊息清除，若要恢復請修改main.js的ready function');
});
//-- Ember.js Component 定義 BEGIN --

// For MetroUI Fluent menu  -- BEGIN --


//-- Ember.js Component 定義 END --



