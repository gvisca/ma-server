// Remote publication
Meteor.publish('server_auth', function(params) {
	console.log('publishing server_auth', params.appId)
	if (!params || !params.appId) {
		this.ready()
		return
	}
	// TODO check if server is OK
	// appId : JxwD2aWBApNjnszRq
	var app = Apps.findOne({_id:params.appId})
	if(app && app.secret==params.secret){

		this.added('server_auth', Random.id(), {
			appId:app._id,
			secret:app.secret,
			log_enabled:app.log_enabled,
			health_enabled:app.health_enabled,
		});	
	}
	var onclose = Meteor.bindEnvironment(function() {
        console.log('Connexion closed by client',params.serverId)
        Servers.remove({serverId:params.serverId})
    }, function() {});

    if (this.connection)
        this.connection.onClose(onclose);
 //    else this._session.socket._session.connection._events.close.push(onclose);
	this.ready();
})


//Publish Logs for an application
Meteor.publish('logs', function(id) {
	if(!id)
		return null
	return Logs.find({appId:id}, {
		limit: 1000
	})
})

Logs.allow({
	insert: function() {
		return true
	},
	remove: function() {
		return true
	}
})


Meteor.publish('servers', function(id) {
	if(!id)
		return null
	console.log('Servers publication',Servers.find({appId:id}).fetch())
	return Servers.find({appId:id}, {
		limit: 1000
	})
})

Servers.allow({
	insert: function() {
		return true
	},
	remove: function() {
		return true
	}
})


Meteor.publish('sessions', function(id) {
	if(!id)
		return null
	return Sessions.find({appId:id}, {
		limit: 1000
	})
})

Sessions.allow({
	insert: function() {
		return true
	},
	remove: function() {
		return true
	}
})


Meteor.publish('events', function() {
	return Events.find()
})

Meteor.publish('applications', function() {
	return Apps.find()
})

Apps.allow({
	insert: function() {
		return true
	},
	remove: function() {
		return true
	}
})



Meteor.publish('pages', function() {
	return Pages.find()
})

Meteor.publish('connexions', function() {
	return Connexions.find()
})

Meteor.publish('health', function() {
	return Health.find()
})