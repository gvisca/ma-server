Template.app_new.events({
	'submit':function(e,t){
		e.preventDefault()
		var form = $('form').serializeArray()
		form = {
			name:form[0].value,
			secret:form[1].value,
			log_enabled:(form[2] && form[2].value) || 'off',
			health_enabled:(form[3] && form[3].value) || 'off',
		}
		if(form.name && form.secret){
			var id = MA_Apps.insert(form,function(err,id){
				console.log('app inserted',err,id)
				_Meteortics.set('newapp_id',id)
				_Meteortics.set('newapp_secret',form.secret)
				_Meteortics.set('appId',id)
				// Router.go('app_list')
			})
		} else {
			_Meteortics.set('error','Application must have a name')
		}
	},
	'click .btn-cancel':function(e,t){
		Router.go('app_list')
	}
})

Template.app_new.helpers({
	newapp_id:function(){
		return _Meteortics.get('newapp_id')
	},
	newapp_secret:function(){
		return _Meteortics.get('newapp_secret')
	}
})

Template.app_new.onCreated(function(){
	_Meteortics.set('newapp_id',null)
})

Template.app_new.onRendered(function(){
	
})

Template.app_new.onDestroyed(function(){
	_Meteortics.set('newapp_id',null)
})