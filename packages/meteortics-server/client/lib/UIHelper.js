UI.registerHelper('json', function(param){
	return JSON.stringify(param,null,'\t')
});

UI.registerHelper('timeAgo', function(param){
	return moment(param).fromNow()
});

UI.registerHelper('moment', function(param){
	return moment(param).format('lll')
});

