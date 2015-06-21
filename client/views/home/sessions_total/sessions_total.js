Template.sessions_total.helpers({
	sessions: function() {
		return MA_Sessions.find({
			appId: _Meteortics.get('appId'),
			opened: {
				$gte: new Date(_Meteortics.get('startDate')),
				$lte: new Date(_Meteortics.get('endDate'))
			}
		}).count()
	}
})