Template.servers_detail.onCreated(function(){
	this.subscribe('servers',Session.get('appId'))
	this.subscribe('logs',Session.get('appId'))
})

Template.servers_detail.helpers({
	servers:function(){
		return Servers.find({appId:Session.get('appId')})
	},
	logs:function(){
		return Logs.find({},{limit:20,sort:{createdAt:-1}})
	}
})