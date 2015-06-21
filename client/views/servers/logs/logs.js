Template.logs.onCreated(function() {
	Tracker.autorun(function() {
		Meteor.subscribe('logs', _Meteortics.get('appId'), _Meteortics.get('startDate'))
	})
})


Template.logs.helpers({
	logs: function() {
		return MA_Logs.find({
			appId: _Meteortics.get('appId'),
			createdAt: {
				$gte: new Date(_Meteortics.get('startDate'))
			}
		}, {
			sort: {createdAt: -1}
		})
	}
})