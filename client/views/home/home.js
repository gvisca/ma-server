Template.home.onRendered(function() {
	Tracker.autorun(function() {
		Meteor.subscribe('sessions', _Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate'))
		Meteor.subscribe('pages',_Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate'))
		Meteor.subscribe('servers',_Meteortics.get('appId'))
	})
})

Template.home.helpers({
	apps:function(){
		return MA_Apps.find()
	},
	no_app:function(){
		return MA_Apps.find().count()==0
	}
})