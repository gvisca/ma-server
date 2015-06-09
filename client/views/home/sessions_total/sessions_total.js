Template.sessions_total.onCreated(function(){
	this.subscribe('sessions',Session.get('appId'))
})

Template.sessions_total.helpers({
	sessions:function(){
		return Sessions.find({
			opened:{$gt:moment().subtract(1,'days').toDate()}
		}).count()
	}
})