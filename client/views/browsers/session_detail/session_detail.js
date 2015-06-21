Template.session_detail.onCreated(function() {
	this.autorun(function() {
		Meteor.subscribe('session', _Meteortics.get('currentSessionId'))
		Meteor.subscribe('pages', _Meteortics.get('appId'), _Meteortics.get('startDate'))
		Meteor.subscribe('events', _Meteortics.get('appId'), _Meteortics.get('startDate'))
	})

})

Template.session_detail.helpers({
	pages: function() {
		console.log('currentSessionId', _Meteortics.get('currentSessionId'))
		var session = MA_Sessions.findOne({
			_id: _Meteortics.get('currentSessionId')
		})
		if (!session)
			return
		console.log('currentSessionId.sessionId', session.sessionId)
		return MA_Pages.find({
			sessionId: session.sessionId
		}, {
			sort: {
				createdAt: 1
			}
		})
	},
	session: function() {
		return MA_Sessions.findOne({
			_id: _Meteortics.get('currentSessionId')
		})
	},
	startsession: function() {
		var sessionId = this.sessionId
		return MA_Events.findOne({
			sessionId: sessionId,
			type: 'client_connexion'
		})
	},
	endsession: function() {
		var sessionId = this.sessionId
		return MA_Events.findOne({
			sessionId: sessionId,
			type: 'client_deconnexion'
		})
	},
	events: function() {
		var pageId =this.pageId
		return MA_Events.find({
			pageId: pageId,
			type:'event'
		}, {
			sort: {
				createdAt: 1
			}
		})
	}
})