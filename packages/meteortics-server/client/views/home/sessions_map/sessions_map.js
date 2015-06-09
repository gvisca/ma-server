var sessions_sub

Template.sessions_graph.onCreated(function() {
	sessions_sub = this.subscribe('sessions', Session.get('appId'))
})

Template.sessions_map.onRendered(function() {
	var basic_choropleth = new Datamap({
		element: document.getElementById("sessions_map"),
		projection: 'mercator',
		fills: {
			defaultFill: "#D7D7D7",
			Sessions: "#fa0fa0"
		},
		// data: {
		// 	USA: {
		// 		fillKey: "Sessions"
		// 	},
		// 	JPN: {
		// 		fillKey: "Sessions"
		// 	},
		// 	ITA: {
		// 		fillKey: "Sessions"
		// 	},
		// 	CRI: {
		// 		fillKey: "Sessions"
		// 	},
		// 	KOR: {
		// 		fillKey: "Sessions"
		// 	},
		// 	DEU: {
		// 		fillKey: "Sessions"
		// 	},
		// }
	});

	var colors = d3.scale.category10();

	var graph_data = {}
	var graph_array = []
	var graph_colors = {}
	this.autorun(function() {
		if (sessions_sub.ready()) {
			Sessions.find().observe({
				added: function(session) {
					graph_array.push({
						name:'',
						radius:5,
						yeild:100,
						borderColor:'#fa0fa0',
						fillKey: 'Sessions',
						latitude:session.geo.ll[0],
						longitude:session.geo.ll[1]
					})
					basic_choropleth.bubbles(graph_array,{})

					// OK fonction mais code pays doit être sur 3 caracteres
					// graph_data[session.geo.country] += 1 
					// graph_colors['FRA'] = colors(graph_data[session.geo.country])
					// basic_choropleth.updateChoropleth(graph_colors)
				}
			})
		}
	})
	

	// window.setInterval(function() {
	// 	basic_choropleth.updateChoropleth({
	// 		USA: colors(Math.random() * 10),
	// 		RUS: colors(Math.random() * 100),
	// 		AUS: {
	// 			fillKey: 'authorHasTraveledTo'
	// 		},
	// 		BRA: colors(Math.random() * 50),
	// 		CAN: colors(Math.random() * 50),
	// 		ZAF: colors(Math.random() * 50),
	// 		IND: colors(Math.random() * 50),
	// 	});
	// }, 2000);
})