Template.health.onCreated(function(){
	this.subscribe('health')
})

Template.health.helpers({
	cpus:function(){
		var health = Health.findOne()
		return health.cpus.length
	},
	os:function(){
		return Health.findOne()
	},
	logs:function(){
		return Logs.find({},{sort:{createdAt:-1}})
	}
})