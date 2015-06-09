// Based on http://bootsnipp.com/snippets/featured/simple-datepicker-with-momentjs

Template.datepicker.onCreated(function(){
	this.cur_date = new ReactiveVar()
	this.show_input = new ReactiveVar()
	this.cur_date.set(Session.get('cur_date') ? moment(Session.get('cur_date')) : moment())
	this.autorun(function(){
		Session.set('cur_date',Template.instance().cur_date.get().toDate())
	})
})


Template.datepicker.helpers({
	weekday:function(){
		return Template.instance().cur_date.get().format("dddd")
	},
	weekdate:function(){
		return Template.instance().cur_date.get().format("MMMM Do")
	},
	weekyear:function(){
		return Template.instance().cur_date.get().format("YYYY")
	},
	cur_date:function(){
		return Template.instance().cur_date.get().format('YYYY/MM/DD')
	},
	show_input:function(){
		return Template.instance().show_input.get() ? 'show-input' : null
	}
})

Template.datepicker.events({
	'click [data-toggle="calendar"]':function(e,t){
		t.show_input.set(true)
	},
	'click button':function(e,t){
		e.preventDefault();
		var new_date = t.find('.input-datepicker>input').value
        if (moment(new_date,'YYYY/MM/DD').isValid()) {
           this.t.cur_date.set(moment(new_date,'YYYY/MM/DD'))
           t.show_input.set(false)
        }else{
            alert('Invalid Date');
        }
	},
	'click .fa.pull-left':function(e,t){
		t.cur_date.set(t.cur_date.get().subtract(7,'days'))
	},
	'click .fa.pull-right':function(e,t){
		t.cur_date.set(t.cur_date.get().add(7,'days'))
	}
})