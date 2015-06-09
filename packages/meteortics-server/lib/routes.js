Router.configure({
	layoutTemplate:'layout'
})

var options = {version: '0.7.3'}
Router.onBeforeAction(function() {
  leafletMaps.load(options);
  this.next();
}, { only: ['sessions_detail'] })

Router.route('/',{
	name:'home',
	action:function(){
		if(!Session.get('appId'))
			Session.set('appId',Apps.findOne())
		this.render('home')
	}
})

Router.route('/meteortics/analytics',{
	name:'analytics',
	action:function(){
		this.render('analytics')
	}
})

Router.route('/meteortics/logs',{
	name:'logs',
	action:function(){
		this.render('logs')
	}
})

Router.route('/meteortics/health',{
	name:'health',
	action:function(){
		this.render('health')
	}
})

Router.route('/meteortics/sessions/detail',{
	name:'sessions_detail',
	action:function(){
		this.render('sessions_detail')
	}
})

Router.route('/meteortics/newapp',{
	name:'newapp',
	action:function(){
		this.render('newapp')
	}
})

Router.route('/meteortics/showapp/:id',{
	name:'showapp',
	action:function(){
		Session.set('appId',this.params.id)
		this.render('showapp')
	}
})