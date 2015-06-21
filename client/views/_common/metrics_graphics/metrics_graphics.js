// http://metricsgraphicsjs.org/
Template.metricsGraphicsHelper.onRendered(function(){
	// {{> metricsGraphicsHelper 
 //    chartId="freemem" 
 //    chartWidth="100%" 
 //    charHeight="100%" 
 //    chartObject=freememChart
 //    x="createdAt"
 //    y="freemem"}}
 	var chartData = [],
 		self=this

 	this.autorun(function() {
 		if (self.data.chartObject instanceof Meteor.Collection.Cursor)
			chartData = self.data.chartObject.fetch()
		else chartData = self.data.chartObject
		
		if(chartData.length==0)
			return;
		if(_.isArray(chartData[0][self.data.y])) {
			var transformFromArray = []
			var legend = []
			_.each(chartData,function(d,i){
				_.each(chartData[i][self.data.y],function(f,j){
					var obj = {}
					obj[self.data.x]=chartData[i][self.data.x]
					obj[self.data.y]=chartData[i][self.data.y][j]
					transformFromArray[j] = transformFromArray[j] || []
					transformFromArray[j].push(obj)
				})
			})
			chartData = transformFromArray
		}
		var graphicOptions = {
	        // title: "Few Observations",
	        // description: "We sometimes have only a few observations. By setting missing_is_zero: true, missing values for a time-series will be interpreted as zeros. In this example, we've overridden the rollover callback to show 'no data' for missing observations and have set the min_x and max_x options in order to expand the date range.",
	        data: chartData,
	        x_accessor: self.data.x,
        	y_accessor: self.data.y,
        	// chart_type: 'bar', // point,bar
	        // interpolate: 'basic',
	        // missing_is_zero: true,
	        // width: self.data.chartWidth,
	        // height: self.data.chartHeight,
	        right: 40,
	        // min_x: new Date('2014-01-01'),
	        // max_x: new Date('2014-06-01'),
	        target: '#'+self.data.chartId,
	        // mouseover: function(d, i) {
	        //     var df = d3.time.format('%b %d, %Y');
	        //     var date = df(d.date);
	        //     var y_val = (d.value === 0) ? 'no data' : d.value;

	        //     d3.select('#missing-y svg .mg-active-datapoint')
	        //         .text(date +  '   ' + y_val);
	        // }
	    }
	    if(self.data.chartTitle) graphicOptions.title = self.data.chartTitle
		MG.data_graphic(graphicOptions);
 	})
	// var self = this,
	// 	svg = dimple.newSvg('#' + self.data.chartId, self.data.chartWidth, self.data.chartHeight)
	
	// var chart = new dimple.chart(svg, null)
	// chart.setMargins(50, 20, 20, 40)
	// chart.defaultColors = [
	// 	new dimple.color("#3B5998")
	// ];
	// var xAxis = new dimple.axis(chart, "x", null, null, self.data.x)
	// // xAxis.ticks = 5;
	// xAxis.tickFormat = "%H:%M:%S";
	// // myAxis.timePeriod = d3.time.months;
	// // myAxis.timeInterval = 4;
	// chart.axes.push(xAxis);
	// // var x = chart.addCategoryAxis("x", self.data.x, null, '%d/%m');
	// var y = chart.addMeasureAxis("y", self.data.y);
	// y.ticks = 5
	// var serie = chart.addSeries(null, dimple.plot.line)
	// serie.interpolation = "cardinal"
	
	// this.autorun(function() {
	// 	if (self.data.chartObject instanceof Meteor.Collection.Cursor)
	// 		chart.data = self.data.chartObject.fetch()
	// 	else chart.data = self.data.chartObject
	// 	// console.table(chart.data)
	// 	if(chart.data.length==0)
	// 		return
	// 	// console.log(typeof self.data.chartObject.fetch()[0][self.data.y])
	// 	chart.draw()
	// })
	// window.onresize = function() {
	// 	chart.draw(0, true);
	// };


})