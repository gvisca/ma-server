
Template.app_chooser.onCreated(function() {
	var sub = this.subscribe('apps')
	this.autorun(function(){
		if(sub.ready() && _Meteortics.get('appId')==null){
			_Meteortics.set('appId',MA_Apps.findOne()._id)
		}
	})
})

Template.app_chooser.helpers({
	apps: function() {
		return MA_Apps.find()
	},
	app: function() {
		return MA_Apps.findOne({
			_id: _Meteortics.get('appId')
		})
	}
})

Template.app_chooser.events({
	'click .select-app': function(e, t) {
		e.preventDefault()
		console.log('clicked on .select-app', e, t, this, $(e.currentTarget).data('id'))
		_Meteortics.set('appId', this._id)
	}
})