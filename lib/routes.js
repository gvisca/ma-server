Router.configure({
	layoutTemplate:'layout'
})

var options = {version: '0.7.3'}
Router.onBeforeAction(function() {
  leafletMaps.load(options);
  this.next();
}, { only: ['sessions_detail'] })



// MAIN DASHBOARD
Router.route('/',{
	name:'home',
	action:function(){
		if(!Session.get('appId'))
			Session.set('appId',Apps.findOne())
		this.render('home')
	},
	// waitOn:function(){
	// 	return [
	// 		Meteor.subscribe('sessions')
	// 	]
	// }
})



// BROWSERS ANALYTICS
Router.route('/meteortics/browsers/sessions/detail',{
	name:'sessions_detail',
	action:function(){
		this.render('sessions_detail')
	}
})

Router.route('/meteortics/browsers/analytics',{
	name:'analytics',
	action:function(){
		this.render('analytics')
	}
})

Router.route('/meteortics/browsers/page_views/detail',{
	name:'page_views_detail',
	action:function(){
		this.render('page_views_detail')
	}
})




// SERVER ANALYTICS
Router.route('/meteor/servers/logs',{
	name:'logs',
	action:function(){
		this.render('logs')
	}
})

Router.route('/meteortics/servers/detail',{
	name:'servers_detail',
	action:function(){
		this.render('servers_detail')
	}
})

Router.route('/meteortics/servers/health',{
	name:'servers_health',
	action:function(){
		this.render('servers_health')
	}
})

// APPLICATIONS MANAGEMENT
Router.route('/meteortics/apps/list',{
	name:'app_list',
	action:function(){
		this.render('app_list')
	}
})

Router.route('/meteortics/apps/new',{
	name:'app_new',
	action:function(){
		this.render('app_new')
	}
})

Router.route('/meteortics/apps/show/:id',{
	name:'app_show',
	action:function(){
		Session.set('appId',this.params.id)
		this.render('app_show')
	}
})