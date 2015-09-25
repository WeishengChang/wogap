App.ContextmenuComponent = Ember.Component.extend({
	
});
// For MetroUI Fluent menu  -- END --

App.WogGridComponent = Ember.Component.extend({
	target: null,
	id: 'WOGGridComponent-'+new Date().getTime(),
	tableID: function() {return this.get('id')+'-table';}.property('id'),
	pagerID: function() {return this.get('id')+'-pager';}.property('id'),
	toolbarID: function() {return 't_'+this.get('tableID');}.property('tableID'),
	queryParams: function() {
		return {f: this.get('target'), act: 'show'};
	}.property('target'),
	afterRenderEvent: function() {
		//var $this = this;
		var $view = $('#'+this.elementId);
		var target = this.target;
		var model = $.WOGGrid.get(target);
		if(!model) {
			console.log('[WOGGrid] ('+target+')尚未定義資料表格的模型');
		}
		$view.wogGrid(model, target, this.get('queryParams'));
		//return $src;
	}
	/*didInsertElement: function() {
	this._super();
		var target = this.target;
		console.assert(!$.wogGridModel[target], "[WOGAP] 不存在的Model("+target+")");
	}*/
});

App.ChartBasicComponent = Ember.Component.extend({
	classNames: ['chart-basics'],
	$plot: null,
	didInsertElement: function() {
		this._super();
		//調整data的結構
		var chartModel = $.mixOptions({
			title: '',
			axes:{
				xaxis:{label:''},
				yaxis:{label:''}
			},
			highlighter: {
        show: true,
        sizeAdjust: 7.5
      },
      cursor: {
        show: false
      }
		}, this.chartModel || {});
		var data = this.data;
		var map = [[]];
		for(var i = 0; i < data.length; ++i) {
			map[0].push([i+1, data[i]]);
		}
		if(this.$plot) {
			this.$plot.destroy();
		}
		this.$plot = $.jqplot(this.elementId, map, chartModel);
	}.observes('chartModel')
});

