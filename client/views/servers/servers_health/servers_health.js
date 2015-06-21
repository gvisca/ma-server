Template.servers_health.onCreated(function() {

	// Tracker.autorun(function() {
	// 	Meteor.subscribe('servers', _Meteortics.get('appId'))
	// 	Meteor.subscribe('ma_health', _Meteortics.get('appId'), _Meteortics.get('startDate'))
	// })

})

Template.servers_health.onRendered(function() {

	// var chart = dc.barChart(".freemem");
	// var data = []
 //  	data =  MA_Health.find({
	// 	appId: _Meteortics.get('appId'),
	// 	createdAt: {
	// 		$gte: new Date(_Meteortics.get('startDate'))
	// 	}
	// }, {
	// 	sort: {
	// 		createdAt: -1
	// 	}
	// }).fetch()
 //  	console.log(data)
 //  	var cf = crossfilter(data)
 //  	var dateDim = cf.dimension(function(d){
 //  		return moment(d.createdAt).format('DD/MM')
 //  		// return d.appId
 //  		// return d.CreatedAt
 //  		// d3.time.hour(d.createdAt);
 //  	})
 //  	var maxDate = dateDim.bottom(1)[0].createdAt;
	// var minDate = dateDim.top(1)[0].createdAt;
	// // console.log(minDate,maxDate)
 //  	var grouping = dateDim.group().reduceSum(dc.pluck('freemem'))

 //  	var chart = dc.barChart('#freemem')
 //  		.margins({top: 10, right: 10, bottom: 20, left: 40})
 //  		.dimension(dateDim)
 //  		.group(grouping)
 //  		// .x(d3.scale.ordinal())
 //  		.x(d3.time.scale().domain([minDate,maxDate]))
 //  		.elasticY(true)
 //  		.xAxis()
  		
  	// chart.render()
 //  	MA_Health.find({
	// 	appId: _Meteortics.get('appId'),
	// 	createdAt: {
	// 		$gte: new Date(_Meteortics.get('startDate'))
	// 	}
	// }, {
	// 	sort: {
	// 		createdAt: -1
	// 	}
	// }).observe({
	// 	added: function(health) {
	// 		console.log('added health', health)
	// 		data.push(health)
	// 		var maxDate = dateDim.bottom(1)[0].createdAt;
	// 		var minDate = dateDim.top(1)[0].createdAt;
	// 		// chart.x(d3.time.scale().domain([minDate,maxDate])); 
	// 		dc.renderAll()
	// 	}
	// })
  	// dc.renderAll()

    // experiments.forEach(function(x) {
    //   x.Speed = +x.Speed;
    // });

    // var ndx = crossfilter(experiments),
    //   runDimension = ndx.dimension(function(d) {
    //     return +d.Run;
    //   }),
    //   speedSumGroup = runDimension.group().reduceSum(function(d) {
    //     return d.Speed * d.Run / 1000;
    //   });

    // chart
    //   .width(768)
    //   .height(480)
    //   .x(d3.scale.linear().domain([6, 20]))
    //   .brushOn(false)
    //   .yAxisLabel("This is the Y Axis!")
    //   .dimension(runDimension)
    //   .group(speedSumGroup)
    //   .on('renderlet', function(chart) {
    //     chart.selectAll('rect').on("click", function(d) {
    //       console.log("click!", d);
    //     });
    //   });
    // chart.render();



    var server = MA_Servers.findOne()
    var mem = server && server.memory 


	var graph_data = []
	var svg = dimple.newSvg(".freemem", "100%", "100%")
	var chart = new dimple.chart(svg, graph_data);
	chart.setMargins(50, 20, 20, 50)
	window.onresize = function() {
		chart.draw(0, true);
	};
	chart.defaultColors = [
		new dimple.color("#3B5998")
	];
	var x = chart.addTimeAxis("x", "createdAt", null, '%m-%d-%Y-%H%M%S');
	x.timePeriod = d3.time.hours
    x.timeInterval = 4
	var y = chart.addMeasureAxis("y", "freemem");
	// y.overrideMax = mem 
	serie = chart.addSeries(null, dimple.plot.line)
	serie.interpolation = "cardinal"

	MA_Health.find({
		appId: _Meteortics.get('appId'),
		createdAt: {
			$gte: new Date(_Meteortics.get('startDate'))
		}
	}, {
		sort: {
			createdAt: -1
		}
	}).observe({
		added: function(health) {
			// console.log('added health', health)
			graph_data.push(health)
			chart.data = graph_data
			_.debounce(chart.draw,1000)
		}
	})
})

Template.servers_health.helpers({
	// servers: function() {
	// 	return MA_Servers.find({
	// 		appId: _Meteortics.get('appId'),
	// 	})
	// },
	// health: function() {
	// 	return MA_Health.find({
	// 		serverId: _Meteortics.get('serverId'),
	// 		createdAt: {
	// 			$gte: new Date(_Meteortics.get('startDate')),
	// 			$lte: new Date(_Meteortics.get('endDate'))
	// 		}
	// 	}, {
	// 		sort: {
	// 			createdAt: -1
	// 		}
	// 	})
	// }
})