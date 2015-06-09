Template.app_list.onCreated(function(){
	this.subscribe('apps')
})

Template.app_list.helpers({
	apps:function(){
		return Apps.find()
	}
})

Template.app_list.events({
	'click .btn-delete':function(e,t){
		e.preventDefault()
		console.log('clicked on btn-delete')
		bootbox.confirm("Are you sure?", function(result) {
			console.log(result)
			if(result)
				console.log('implement deletion')
			// Apps.remove({_id:Session.get('appId')})
		});
	}
})