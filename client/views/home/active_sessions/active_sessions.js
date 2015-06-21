Template.active_sessions.helpers({
	users:function(){
		var app = MA_Apps.findOne({_id:_Meteortics.get('appId')})
		return app && app.usersConnected || '0'
	}
})