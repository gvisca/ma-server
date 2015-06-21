MA_Apps = new Mongo.Collection('applications')
MA_Sessions = new Mongo.Collection('sessions')
MA_Events = new Mongo.Collection('events')
MA_Logs = new Mongo.Collection('logs')
MA_Pages = new Mongo.Collection('pages')
MA_Health = new Mongo.Collection('health')
MA_Servers = new Mongo.Collection('servers')

// Behaviours
MA_Apps.attachBehaviour('timestampable')
MA_Events.attachBehaviour('timestampable')
MA_Logs.attachBehaviour('timestampable')
MA_Pages.attachBehaviour('timestampable')
MA_Health.attachBehaviour('timestampable')
MA_Servers.attachBehaviour('timestampable')


// Helpers
MA_Apps.helpers({
	// firstId: function() {
	// 	var app = MA_Apps.findOne()
	// 	return app ? app._id : null
	// }
})

MA_Sessions.helpers({
	pages:function(){
		Meteor.subscribe('session.pages',this.sessionId)
		return MA_Pages.find({
			sessionId:this.sessionId
		})
	}
})

// MA_Apps.prototype.firstId = function() {
// 	var app = MA_Apps.findOne()
// 	return app ? app._id : null
// }