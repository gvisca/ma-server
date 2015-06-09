Template.newapp.helpers({
	newapp_id:function(){
		return Session.get('newapp_id')
	},
	newapp_secret:function(){
		return Session.get('newapp_secret')
	}
})

Template.newapp.events({
	'submit':function(e,t){
		e.preventDefault()
		// var form = $('form').serializeArray()
		// var form = $(t.findAll('input[type=text],input[type=number],input[type=email],input[type=checkbox],input[type=radio],input[type=search],textarea,select')).serializeArray()
		// console.log('form',form)
		var name = t.find('.newapp_name').value
		var secret = t.find('.newapp_secret').value
		var log_enabled = t.find('.log_enabled').value
		var health_enabled = t.find('.health_enabled').value
		// var name = t.find('#newapp_name').value
		if(name && secret){
			var id = Apps.insert({
				name:name,
				secret:secret,
				log_enabled:log_enabled,
				health_enabled:health_enabled
			},function(err,res){
				console.log('app inserted',err,res)
			})
			Session.set('newapp_id',id)
			Session.set('newapp_secret',secret)
			Session.set('appId',id)
		} else {
			Session.set('error','Application must have a name')
		}
		
	}
})

Template.newapp.onCreated(function(){
	Session.set('newapp_id',null)
})

Template.newapp.onDestroyed(function(){
	Session.set('newapp_id',null)
})