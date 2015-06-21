/*
 *
 * Remote publication
 *
 */
Meteor.publish('ma_server_auth', function(params) {
	console.log('publishing server_auth', params.appId)
	check(params.appId, String)
	check(params.secret, String)
	
	var self = this

	// Find app and watch for changes to send changes to remote server
	var handle = MA_Apps.find({
		_id: params.appId
	}).observe({
		added: function(app) {
			console.log("App found", app);
			if (app._id == params.appId && app.secret == params.secret) {

				self.added('ma_server_auth', app._id, {
					appId: app._id,
					log_enabled: app.log_enabled,
					health_enabled: app.health_enabled,
				});
			}
		},
		changed: function(app) {
			console.log("App changed", app);
			self.changed('ma_server_auth',app._id,app)
		},
		removed: function(app) {
			console.log("App removed",app);
		}
	});

	self.onStop(function() {
		console.log('publication stopped')
		// handle.stop();
	});
	// var app = MA_Apps.findOne({
	// 	_id: params.appId
	// })
	// if (app && app.secret == params.secret) {

	// 	this.added('ma_server_auth', Random.id(), {
	// 		appId: app._id,
	// 		secret: app.secret,
	// 		log_enabled: app.log_enabled,
	// 		health_enabled: app.health_enabled,
	// 	});
	// }
	var onclose = Meteor.bindEnvironment(function() {
		console.log('Connexion closed by client', params.serverId)
		MA_Servers.remove({
			serverId: params.serverId
		})
	}, function() {});

	if (this.connection)
		this.connection.onClose(onclose);
	else this._session.socket._session.connection._events.close.push(onclose);
	this.ready();
})


/*
 *
 * Publish all apps
 *
 */
Meteor.publish('apps', function(filters, options) {
	return MA_Apps.find()
})


/*
 *
 * Publish single app for an id
 *
 */
Meteor.publish('single_app', function(id) {
	return MA_Apps.find({
		_id: id
	})
})


/*
 *
 * Publish sessions for an app and for a time period
 *
 */
Meteor.publish('sessions', function(id, from, to) {
	console.log('sessions subscriptions', id, from, to)
	if (!(id && from))
		return null
	var dateRange = {
		$gte: new Date(from)
	}
	if (to)
		dateRange['$lte'] = new Date(to)
	return MA_Sessions.find({
		appId: id,
		opened: dateRange
	}, {
		sort: {
			opened: -1
		}
	})
})

Meteor.publish('session', function(id) {
	console.log('session subscriptions', id)
	if (!id)
		return null
	return MA_Sessions.find({
		_id: id
	})
})

Meteor.publish('session.pages', function(id) {
	console.log('pages subscriptions for a session', id)
	if (!id)
		return null
	return MA_Pages.find({
		sessionId: id
	})
})


/*
 *
 * Publish page views for an app and for a time period
 *
 */
Meteor.publish('pages', function(id, from, to) {
	console.log('pages subscriptions', id, from, to)
	if (!(id && from))
		return null
	var dateRange = {
		$gte: new Date(from)
	}
	if (to)
		dateRange['$lte'] = new Date(to)
	return MA_Pages.find({
		appId: id,
		createdAt: dateRange
	}, {
		sort: {
			createdAt: -1
		}
	})
})


/*
 *
 * Publish logs for an app and for a time period
 *
 */
Meteor.publish('logs', function(id, from, to) {
	console.log('Publish logs', MA_Logs.find({
		appId: id
	}).count())
	if (!(id && from))
		return null
	var dateRange = {
		$gte: new Date(from)
	}
	if (to)
		dateRange['$lte'] = new Date(to)
	return MA_Logs.find({
		appId: id,
		createdAt: dateRange
	}, {
		sort: {
			createdAt: -1
		},
		limit: 1000
	})
})



/*
 *
 * Publish servers for an app and for a time period
 *
 */
Meteor.publish('servers', function(id) {
	console.log('Publish servers', MA_Servers.find({
		appId: id
	}).count())
	return MA_Servers.find({
		appId: id
	})
})



/*
 *
 * Publish events for an app and for a time period
 *
 */
Meteor.publish('events', function(id, from, to) {
	console.log('Publish events', MA_Events.find({
		appId: id
	}).count())
	if (!(id && from))
		return null
	var dateRange = {
		$gte: new Date(from)
	}
	if (to)
		dateRange['$lte'] = new Date(to)
	return MA_Events.find({
		appId: id,
		createdAt: dateRange
	}, {
		sort: {
			createdAt: -1
		}
	})
})


/*
 *
 * Publish health for a server and for a time period
 *
 */
Meteor.publish('ma_health', function(id, from, to) {
	console.log('Publish health', id, from, to, MA_Health.find({
		appId: id
	}).count())
	if (!(id && from))
		return null
	var dateRange = {
		$gte: new Date(from)
	}
	if (to)
		dateRange['$lte'] = new Date(to)
	return MA_Health.find({
		appId: id,
		createdAt: dateRange
	}, {
		sort: {
			createdAt: -1
		},
		fields:{createdAt:1,freemem:1,loadavg:1,processMem:1,serverId:1},
		limit: 200
	})
})