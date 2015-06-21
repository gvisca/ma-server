Template.sessions_map.onRendered(function() {
	/*********************************************************
	*
	* Datamap version
	*
	**********************************************************/
	// var basic_choropleth = new Datamap({
	// 	element: document.getElementById("sessions_map"),
	// 	projection: 'mercator',
	// 	fills: {
	// 		defaultFill: "#D7D7D7",
	// 		Sessions: "#fa0fa0"
	// 	},
	// 	// data: {
	// 	// 	USA: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// 	JPN: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// 	ITA: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// 	CRI: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// 	KOR: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// 	DEU: {
	// 	// 		fillKey: "Sessions"
	// 	// 	},
	// 	// }
	// });

	// var colors = d3.scale.category10();

	// var graph_data = {}
	// var graph_array = []
	// var graph_colors = {}

	// MA_Sessions.find({
 //      appId: _Meteortics.get('appId'),
 //      opened: {
 //        $gte: new Date(_Meteortics.get('startDate')),
 //        $lte: new Date(_Meteortics.get('endDate'))
 //      }
 //    }).observe({
	// 	added: function(session) {
	// 		if(!session.geo)
	// 			return
	// 		graph_array.push({
	// 			name:'',
	// 			radius:5,
	// 			yeild:100,
	// 			borderColor:'#fa0fa0',
	// 			fillKey: 'Sessions',
	// 			latitude:session.geo.ll[0],
	// 			longitude:session.geo.ll[1]
	// 		})
	// 		basic_choropleth.bubbles(graph_array,{})

	// 		// OK fonction mais code pays doit être sur 3 caracteres
	// 		// graph_data[session.geo.country] += 1 
	// 		// graph_colors['FRA'] = colors(graph_data[session.geo.country])
	// 		// basic_choropleth.updateChoropleth(graph_colors)
	// 	}
	// })

	/***************************************************************
	 *
	 * JVectormap version
	 *
	 ***************************************************************/
	var jvmdata = {}
	MA_Sessions.find({
		appId: _Meteortics.get('appId'),
		opened: {
			$gte: new Date(_Meteortics.get('startDate')),
			$lte: new Date(_Meteortics.get('endDate'))
		}
	}).observe({
		added: function(session) {
			if (!session.geo)
				return
			jvmdata[session.geo.country] = jvmdata[session.geo.country] ? 1 : jvmdata[session.geo.country] + 1
			$('#sessions_map').vectorMap({
				map: 'world_mill_en',
				series: {
					regions: [{
						values: jvmdata,
						scale: ['#C8EEFF', '#0071A4'],
						normalizeFunction: 'polynomial'
					}]
				},
			});
		}
	})
})