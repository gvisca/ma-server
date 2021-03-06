var trigger, overlay, isClosed;

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

Template.layout.onRendered(function() {
	_Meteortics.set('currentTheme','cosmo')

	trigger = $('.hamburger')
	overlay = $('.overlay')
	isClosed = false

	trigger.click(function() {
		hamburger_cross();
	});

	$('[data-toggle="offcanvas"]').click(function() {
		$('#wrapper').toggleClass('toggled');
	});
})



Template.layout.events({
	'click #menu-toggle': function(e, t) {
		e.preventDefault();
		$("#wrapper").toggleClass("active");
	},
	'click .sidebar-nav li': function(e, t) {
		// console.log('clicked on ul li')
		hamburger_cross()
		$('#wrapper').toggleClass('toggled');
	},
	'change #app_theme': function(e, t) {
		console.log('changed app_theme',e,t,this,e.target.value)
		_Meteortics.set('currentTheme',e.target.value)
	}
})