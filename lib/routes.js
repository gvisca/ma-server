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
		this.render('home')
	},
	// waitOn:function(){
	// 	return [
	// 	Meteor.subscribe('sessions', _Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate')),
	// 	Meteor.subscribe('pages',_Meteortics.get('appId'), _Meteortics.get('startDate'), _Meteortics.get('endDate')),
	// 	Meteor.subscribe('servers',_Meteortics.get('appId'))
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

Router.route('/meteortics/browsers/session/:id',{
	name:'session_detail',
	action:function(){
		_Meteortics.set('currentSessionId',this.params.id)
		this.render('session_detail')
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
	},
	waitOn:function(){
		return [
			Meteor.subscribe('servers', _Meteortics.get('appId')),
			Meteor.subscribe('ma_health', _Meteortics.get('appId'), _Meteortics.get('startDate'))
		]
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
		_Meteortics.set('appId',this.params.id)
		this.render('app_show')
	}
})