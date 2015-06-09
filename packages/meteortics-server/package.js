Package.describe({
	summary: "Analytics package for meteor",
	version: "0.0.1",
	name: "meteortics-server"
});

Package.on_use(function(api) {
	if (api.versionsFrom) api.versionsFrom("METEOR@1.1.0.2");

	var npmModules = {
		"ua-parser": "0.3.3",
		"geoip-lite": "1.1.3",
		// 'wrench': '1.5.8'  
	};

	Npm.depends(npmModules);

	// Npm.depends({
	//   'wrench': '1.5.8'  
	// });
	// var wrench = Npm.require('wrench');

	api.use(['templating', 'jquery','stylus'], 'client');
	api.use(['ddp'], 'server');

	api.use(['underscore', 'mongo', 'tracker', 'random', 'accounts-base'], ['server', 'client']);

	api.use('iron:router@1.0.7');
	api.use('momentjs:moment@2.10.3');
	api.use('twbs:bootstrap@3.3.4');
	api.use('zimme:collection-timestampable@1.0.6');
	api.use('fortawesome:fontawesome@4.3.0');
	api.use('mattkrick:leaflet-maps@0.1.0');
	api.use('sergeyt:dimple@2.1.0');
	api.use('hyperborea:datamaps@1.0.1');

	api.add_files([
		'lib/collections.js',
		'lib/routes.js'
		],['client','server']);

	// var client_files = wrench.readdirSyncRecursive('./client/');
	// api.add_files(client_files, 'client');

	// var server_files = wrench.readdirSyncRecursive('./server/');
	// api.add_files(server_files, 'server');
	
	api.add_files([
		// 'client/vendor/metro/css/metro.min.css',
		// 'client/vendor/metro/css/metro-icons.min.css',
		// 'client/vendor/metro/fonts/metro.eot',
		// 'client/vendor/metro/fonts/metro.svg',
		// 'client/vendor/metro/fonts/metro.ttf',
		// 'client/vendor/metro/fonts/metro.woff',
		// 'client/vendor/metro/js/metro.min.js',
		'client/vendor/filesize/filesize.js',

		'client/lib/UIHelper.js',
		// 'client/lib/MetroInit.js',

		'client/layout/layout.html',
		'client/layout/layout.js',
		'client/layout/layout.css',

		'client/views/analytics/analytics.html',
		'client/views/analytics/analytics.js',
		'client/views/analytics/analytics.css',

		'client/views/home/home.html',
		'client/views/home/home.js',

		'client/views/home/active_sessions/active_sessions.html',
		'client/views/home/active_sessions/active_sessions.js',
		'client/views/home/active_sessions/active_sessions.css',

		'client/views/home/app_servers/app_servers.html',
		'client/views/home/app_servers/app_servers.js',
		'client/views/home/app_servers/app_servers.css',

		'client/views/home/sessions_graph/sessions_graph.html',
		'client/views/home/sessions_graph/sessions_graph.js',
		'client/views/home/sessions_graph/sessions_graph.styl',

		'client/views/home/sessions_map/sessions_map.html',
		'client/views/home/sessions_map/sessions_map.js',

		'client/views/home/sessions_total/sessions_total.html',
		'client/views/home/sessions_total/sessions_total.js',
		'client/views/home/sessions_total/sessions_total.css',

		'client/views/logs/logs.html',
		'client/views/logs/logs.js',
		'client/views/logs/logs.css',

		'client/views/newapp/newapp.html',
		'client/views/newapp/newapp.js',
		'client/views/newapp/showapp.html',
		'client/views/newapp/showapp.js',

		'client/views/sessions_detail/sessions_detail.html',
		'client/views/sessions_detail/sessions_detail.js',
		'client/views/sessions_detail/sessions_detail.css',

		'client/health.html',
		'client/health.js',

		'client/style.styl',
		
		], 'client');

	
	api.add_files([
		'server/server.js',
		'server/publications.js',
		], 'server');
});