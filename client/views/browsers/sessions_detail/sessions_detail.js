var markers = {};

Template.sessions_detail.onCreated(function() {
	Tracker.autorun(function(){
		Meteor.subscribe('sessions', _Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate'))
	})
	
})

Template.sessions_detail.onRendered(function() {
	// leafletMaps.ready('sessions_map', function(map) {
	// 	console.log('sessions_map ready')
	// 	MA_Sessions.find({
	// 		appId: _Meteortics.get('appId'),
	// 		opened: {
	// 			$gte: new Date(_Meteortics.get('startDate')),
	// 			$lte: new Date(_Meteortics.get('endDate'))
	// 		}
	// 	}).observeChanges({
	// 		added: function(id, session) {
	// 			// console.log('sessions_map added', id, session)
	// 			if(!session.geo)
	// 				return
	// 			console.log('session added',session);
	// 			var options = session.closed ? {color:'#1BA1E2'} : {color:'#FA6800'}
	// 			options.radius = 4
	// 			options._id = id
	// 			var marker = L.circleMarker(session.geo.ll,options).addTo(map.instance);
	// 			markers[id]=marker
	// 		},
	// 		changed:function(id, session){
	// 			// console.log('sessions_map changed', id, session)
	// 			if(!session.geo)
	// 				return
	// 			var marker = markers[id]
	// 			if(map.instance.hasLayer(marker)){
	// 				map.instance.removeLayer(marker)
	// 				delete markers[id]
	// 			}
	// 			var options = session.closed ? {color:'#FA6800'} : {color:'#1BA1E2'}
	// 			options.weight = 2
	// 			options._id = id
	// 			L.circleMarker(session.geo.ll,options).addTo(map.instance);
	// 			markers[id]=marker
	// 		},
	// 		removed:function(id){
	// 			// console.log('sessions_map removed', id, session)
	// 			if(!session.geo)
	// 				return
	// 			var marker = markers[id]
	// 			if(map.instance.hasLayer(marker)){
	// 				map.removeLayer(marker)
	// 				delete markers[id]
	// 			}
	// 		}
	// 	});
	// });
})



Template.sessions_detail.helpers({
	sessions: function() {
		return MA_Sessions.find({
			appId: _Meteortics.get('appId'),
			opened: {
				$gte: new Date(_Meteortics.get('startDate')),
			}
		},{sort:{opened:-1}})
	},
	sessions_by_country:function(){
		var sessions = MA_Sessions.find({
			appId: _Meteortics.get('appId'),
			opened: {
				$gte: new Date(_Meteortics.get('startDate')),
			}
		}).map(function(d){
			return {
				country:(d.geo && d.geo.country) || 'Unknown',
				value:1
			}
		})
		var groups = _.groupBy(sessions,'country');
		// console.log('groups',groups)
		return _.map(groups,function(d,key){
			// console.log(d,key)
			return {
				country:key.toLowerCase(),
				count:d.length
			}
		})
	},
	sessions_by_browser:function(){
		var browsers = MA_Sessions.find({
			appId: _Meteortics.get('appId'),
			opened: {
				$gte: new Date(_Meteortics.get('startDate')),
			}
		}).map(function(d){
			return {
				browser:d.ua.family,
				value:1
			}
		})
		var groups = _.groupBy(browsers,'browser');
		console.log('groups',groups)
		return _.map(groups,function(d,key){
			// console.log(d,key)
			return {
				browser:key.toLowerCase(),
				count:d.length
			}
		})
	},
	sessions_by_os:function(){
		var os = MA_Sessions.find({
			appId: _Meteortics.get('appId'),
			opened: {
				$gte: new Date(_Meteortics.get('startDate')),
			}
		}).map(function(d){
			return {
				os:d.ua.os.family,
				value:1
			}
		})
		var groups = _.groupBy(os,'os');
		console.log('groups',groups)
		return _.map(groups,function(d,key){
			// console.log(d,key)
			return {
				os:key.toLowerCase(),
				count:d.length
			}
		})
	},
	duration: function() {
		if (this.closed) {
			return moment.duration(this.closed - this.opened).humanize();
		} else {
			return '-'
		}
	},
	leafletOptions: function() {
		if (leafletMaps && leafletMaps.isLoaded.get()) {
			return {
				tileLayer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: 'Powered by <a href="http://www.leaflet.cloudmade.com.org">Leaflet</a> & <a href="http://altic.org/">&copy; Altic</a> - Maps <a href="http://www.osm.org">&copy; OpenStreetMap</a> - Routing <a href="http://map.project-osrm.org/">&copy; OSRM</a>',
				}),
				center: [48.862964384662625, 2.342405319213867], //Remember, it's lat, then lng. Doesn't conform to geoJSON standards!
				zoom: 7
			};
		}
	}
})