UI.registerHelper('json', function(param){
	return JSON.stringify(param,null,'\t')
});

UI.registerHelper('timeAgo', function(param){
    if(!param)
        return null
	return moment(param).fromNow()
});

UI.registerHelper('moment', function(param,format){
    // var fo = format || 'lll'
	return moment(param).format('lll')
});

UI.registerHelper('filesize', function(param){
	return filesize(param)
});

UI.registerHelper('HHMMSS', function(param){
	var sec_num = parseInt(param, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'h '+minutes+'m '+seconds+'s';
    return time;
})

