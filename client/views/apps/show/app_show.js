Template.app_show.onCreated(function(){
	this.subscribe('application',_Meteortics.get('appId'))	
})

Template.app_show.helpers({
	app:function(){
		console.log(MA_Apps.findOne({_id:_Meteortics.get('appId')}))
		return MA_Apps.findOne({_id:_Meteortics.get('appId')})
	}
})

Template.app_show.events({
	'click .btn-danger':function(e,t){
		MA_Apps.remove({_id:this._id})
		Router.go('/')
	}
})

Template.app_show.onDestroyed(function(){
	_Meteortics.set('appId',null)
})