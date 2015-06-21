Template.app_servers.helpers({
	servers:function(){
		return MA_Servers.find({appId:_Meteortics.get('appId')})
	},
	servers_count:function(){
		return MA_Servers.find({appId:_Meteortics.get('appId'),active:true}).count()
	}
})
