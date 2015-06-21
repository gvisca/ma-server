Template.dimpleLine.onRendered(function() {
	var self = this,
		svg = dimple.newSvg('#' + self.data.chartId, self.data.chartWidth, self.data.chartHeight)
	
	var chart = new dimple.chart(svg, null)
	chart.setMargins(50, 20, 20, 40)
	chart.defaultColors = [
		new dimple.color("#3B5998")
	];
	var xAxis = new dimple.axis(chart, "x", null, null, self.data.x)
	// xAxis.ticks = 5;
	xAxis.tickFormat = "%H:%M:%S";
	// myAxis.timePeriod = d3.time.months;
	// myAxis.timeInterval = 4;
	chart.axes.push(xAxis);
	// var x = chart.addCategoryAxis("x", self.data.x, null, '%d/%m');
	var y = chart.addMeasureAxis("y", self.data.y);
	y.ticks = 5
	var serie = chart.addSeries(null, dimple.plot.line)
	serie.interpolation = "cardinal"
	
	this.autorun(function() {
		if (self.data.chartObject instanceof Meteor.Collection.Cursor)
			chart.data = self.data.chartObject.fetch()
		else chart.data = self.data.chartObject
		// console.table(chart.data)
		if(chart.data.length==0)
			return
		// console.log(typeof self.data.chartObject.fetch()[0][self.data.y])
		chart.draw()
	})
	window.onresize = function() {
		chart.draw(0, true);
	};
})