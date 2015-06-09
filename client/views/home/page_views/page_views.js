Template.page_views.onCreated(function(){
	console.log('page_views.onCreated',Session.get('appId'))
	this.subscribe('pages',Session.get('appId'))
})

Template.page_views.helpers({
	page_count:function(){
		return Pages.find({
			createdAt:{$gt:moment().subtract(1,'days').toDate()}
		}).count()
	}
})