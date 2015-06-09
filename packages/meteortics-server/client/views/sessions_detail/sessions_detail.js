var markers = {};

Template.sessions_detail.onCreated(function() {
	this.subscribe('sessions', Session.get('appId'))
})

Template.sessions_detail.onRendered(function() {
	leafletMaps.ready('sessions_map', function(map) {
		Sessions.find().observeChanges({
			added: function(id, session) {
				console.log(session);
				var options = session.closed ? {color:'#1BA1E2'} : {color:'#FA6800'}
				options.radius = 4
				options._id = id
				var marker = L.circleMarker(session.geo.ll,options).addTo(map.instance);
				markers[id]=marker
			},
			changed:function(id, session){
				console.log('sessions_map changed', id, session, map.instance)
				var marker = markers[id]
				if(map.instance.hasLayer(marker)){
					map.instance.removeLayer(marker)
					delete markers[id]
				}
				var options = session.closed ? {color:'#FA6800'} : {color:'#1BA1E2'}
				options.weight = 2
				options._id = id
				L.circleMarker(session.geo.ll,options).addTo(map.instance);
				markers[id]=marker
			},
			removed:function(id){
				console.log('sessions_map removed', id, session)
				var marker = markers[id]
				if(map.instance.hasLayer(marker)){
					map.removeLayer(marker)
					delete markers[id]
				}
			}
		});
	});
})



Template.sessions_detail.helpers({
	sessions: function() {
		return Sessions.find({
			appId: Session.get('appId')
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