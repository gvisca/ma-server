Template.page_views.helpers({
	page_count:function(){
		return MA_Pages.find({
			appId: _Meteortics.get('appId'),
			createdAt: {
				$gte: new Date(_Meteortics.get('startDate')),
				$lte: new Date(_Meteortics.get('endDate'))
			}
		}).count()
	}
})