Apps = new Mongo.Collection('applications')
Sessions = new Mongo.Collection('sessions')
Events = new Mongo.Collection('events')
Logs = new Mongo.Collection('logs')
Pages = new Mongo.Collection('pages')
Connexions = new Mongo.Collection('connexions')
Health = new Mongo.Collection('health')
Servers = new Mongo.Collection('servers')

Apps.attachBehaviour('timestampable')
Events.attachBehaviour('timestampable')
Logs.attachBehaviour('timestampable')
Pages.attachBehaviour('timestampable')
Connexions.attachBehaviour('timestampable')
Health.attachBehaviour('timestampable')
Servers.attachBehaviour('timestampable')