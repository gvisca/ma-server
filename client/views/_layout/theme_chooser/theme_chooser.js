Template.theme_chooser.onCreated(function(){
	_Meteortics.set('currentTheme','cosmo')
})

Template.theme_chooser.helpers({
	themes:function(){
		return [
			'cosmo',
			'yeti',
			'superhero',
			'sandstone'
		]
	},
	theme: function() {
		return _Meteortics.get('currentTheme')
	}
})

Template.theme_chooser.events({
	'click .dropdown-menu a':function(e,t){
		e.preventDefault()
		// console.log(e,t,this,$(e.currentTarget).data('val'))
		_Meteortics.set('currentTheme',$(e.currentTarget).data('val'))
	}
})