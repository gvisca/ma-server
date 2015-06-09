Template.analytics.onCreated(function() {
	this.subscribe('events')
	this.subscribe('applications')
	this.subscribe('logs')
	this.subscribe('pages')
	this.subscribe('connexions')
})

Template.analytics.helpers({
	events: function() {
		return Events.find()
	},
	usersConnected: function() {
		var app = Apps.findOne()
		return app && app.usersConnected
	},
	sessions_last_day: function() {
		return Connexions.find({
			createdAt: {
				$gte: moment().subtract(1, 'days')._d
			}
		}).count()
	},
	uniq_user_last_day: function() {
		return _.uniq(Connexions.find({}, {
			createdAt: {
				$gte: moment().subtract(1, 'days')._d
			}
		}).map(function(x) {
			return x.uid;
		}), true).length
	},
	pages:function(){
		return Pages.find({},{sort:{createdAt:-1},limit:10})
	}
})