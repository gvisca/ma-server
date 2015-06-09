Template.app_show.helpers({
	app_id:function(){
		return Session.get('appId')
	}
})

Template.app_show.events({
	'click .btn-danger':function(e,t){
		Apps.remove({_id:this._id})
		Router.go('/')
	}
})

Template.app_show.onDestroyed(function(){
	Session.set('appId',null)
})