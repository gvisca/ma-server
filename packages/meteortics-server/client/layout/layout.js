Template.layout.onCreated(function() {
	var sub = this.subscribe('applications')
	this.autorun(function(){
		if(sub.ready()){
			Session.set('appId',Apps.findOne()._id)
		}
	})
})

Template.layout.onRendered(function() {
	// $(document).ready(function() {
		var trigger = $('.hamburger'),
			overlay = $('.overlay'),
			isClosed = false;

		trigger.click(function() {
			hamburger_cross();
		});

		function hamburger_cross() {

			if (isClosed == true) {
				overlay.hide();
				trigger.removeClass('is-open');
				trigger.addClass('is-closed');
				isClosed = false;
			} else {
				overlay.show();
				trigger.removeClass('is-closed');
				trigger.addClass('is-open');
				isClosed = true;
			}
		}

		$('[data-toggle="offcanvas"]').click(function() {
			$('#wrapper').toggleClass('toggled');
		});
	// });
})

Template.layout.helpers({
	apps: function() {
		return Apps.find()
	},
	app: function() {
		return Apps.findOne({
			_id: Session.get('appId')
		})
	}
})

Template.layout.events({
	'click .select-app': function(e, t) {
		e.preventDefault()
		console.log('clicked on .select-app', e, t, this, $(e.currentTarget).data('id'))
		Session.set('appId', this._id)
	},
	'click #menu-toggle': function(e, t) {
		e.preventDefault();
		$("#wrapper").toggleClass("active");
	}
})