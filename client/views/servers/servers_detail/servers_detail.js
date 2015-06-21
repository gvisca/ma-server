Template.servers_detail.onCreated(function() {
	var instance = this;
	instance.autorun(function() {
		instance.subscribe('servers', _Meteortics.get('appId'))
		instance.subscribe('logs', _Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate'))
		instance.subscribe('ma_health', _Meteortics.get('appId'), _Meteortics.get('startDate'))
	})
})

Template.servers_detail.onRendered(function() {
	
})

Template.servers_detail.helpers({
	servers: function() {
		return MA_Servers.find({
			appId: _Meteortics.get('appId'),
		}, {
			sort: {
				active: -1
			}
		})
	},
	logs: function() {
		return MA_Logs.find({
			appId: _Meteortics.get('appId'),
			createdAt: {
				$gte: new Date(_Meteortics.get('startDate')),
				$lte: new Date(_Meteortics.get('endDate'))
			}
		}, {
			sort: {
				createdAt: -1
			}
		})
	},
	health: function() {
		return MA_Health.find({
			appId: _Meteortics.get('appId'),
			createdAt: {
				$gte: new Date(_Meteortics.get('startDate'))
			}
		}, {
			sort: {
				createdAt: 1
			}
		})
	},
	freememChart:function(){
		return MA_Health.find({
			serverId: this.serverId,
			createdAt: {
				$gte: new Date(_Meteortics.get('startDate')),
				// $lte: new Date(_Meteortics.get('endDate'))
			}
		}, {
			sort: {
				createdAt: 1
			}
		})
	}
})