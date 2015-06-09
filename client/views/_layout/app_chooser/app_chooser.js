Template.app_chooser.onCreated(function() {
	var sub = this.subscribe('applications')
	this.autorun(function(){
		if(sub.ready() && Session.get('appId')==null){
			Session.set('appId',Apps.findOne()._id)
		}
	})
})

Template.app_chooser.helpers({
	apps: function() {
		return Apps.find()
	},
	app: function() {
		return Apps.findOne({
			_id: Session.get('appId')
		})
	}
})

Template.app_chooser.events({
	'click .select-app': function(e, t) {
		e.preventDefault()
		console.log('clicked on .select-app', e, t, this, $(e.currentTarget).data('id'))
		Session.set('appId', this._id)
	}
})