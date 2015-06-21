Template.app_list.onCreated(function(){
	this.subscribe('apps')
})

Template.app_list.helpers({
	apps:function(){
		return MA_Apps.find()
	}
})

Template.app_list.events({
	'click .btn-delete':function(e,t){
		e.preventDefault()
//		console.log('clicked on btn-delete',e,t,this)
		var id = this._id
		bootbox.confirm("Are you sure?", function(result) {
//			console.log(result)
			if(result){
//				console.log("removing app",this._id)
				MA_Apps.remove({_id:id},function(err,res){
//					console.log(err,res)
				})
			}
				
		});
	},
	'click .log_enabled':function(e,t){
		console.log('clicked on .log_enabled',e,t,this)
		if(this.log_enabled=='on'){
			MA_Apps.update({_id:this._id},{$set:{log_enabled:'off'}})
		} else {
			MA_Apps.update({_id:this._id},{$set:{log_enabled:'on'}})
		}
	},
	'click .health_enabled':function(e,t){
		console.log('clicked on .health_enabled',e,t,this)
		if(this.health_enabled=='on'){
			MA_Apps.update({_id:this._id},{$set:{health_enabled:'off'}})
		} else {
			MA_Apps.update({_id:this._id},{$set:{health_enabled:'on'}})
		}
	}
})