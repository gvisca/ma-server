Template.home.onCreated(function(){
	this.subscribe('applications')
})

Template.home.helpers({
	apps:function(){
		return Apps.find()
	}
})