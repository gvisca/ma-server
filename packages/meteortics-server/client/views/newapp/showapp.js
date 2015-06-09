Template.showapp.helpers({
	app_id:function(){
		return Session.get('appId')
	}
})

Template.showapp.events({
	'click .btn-danger':function(e,t){
		Apps.remove({_id:this._id})
		Router.go('/')
	}
})

Template.showapp.onDestroyed(function(){
	Session.set('appId',null)
})