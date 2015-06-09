Template.active_sessions.helpers({
	users:function(){
		var app = Apps.findOne({_id:Session.get('appId')})
		return app && app.usersConnected || '0'
	}
})