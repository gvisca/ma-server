Template.logs.onCreated(function(){
	this.subscribe('logs',Session.get('appId'))
})

// Template.logs.onRendered(function(){
// 	$.Metro.initAll();
// })


Template.logs.helpers({
	logs:function(){
		console.log('helper logs',Logs.find(),Logs.find().count())
		return Logs.find({},{sort:{createdAt:-1}})
	}
})