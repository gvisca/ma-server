Template.app_servers.onCreated(function(){
	this.subscribe('servers',Session.get('appId'))
})

Template.app_servers.helpers({
	servers:function(){
		var servers = Servers.find({appId:Session.get('appId')})
		return servers
	},
	servers_count:function(){
		console.log('appId',Session.get('appId'))
		console.log('servers',Servers.find({appId:Session.get('appId')}).fetch())
		var servers = Servers.find({appId:Session.get('appId')})
		return servers && servers.count()
	}
})