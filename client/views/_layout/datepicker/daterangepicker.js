//https://github.com/dangrossman/bootstrap-daterangepicker/blob/master/examples.html
Template.daterangepicker.onRendered(function(){

	if(_Meteortics.get('startDate')==null || _Meteortics.get('endDate')==null){
		_Meteortics.set('startDate',moment().subtract(29, 'days').startOf('day').toISOString())
		_Meteortics.set('endDate',moment().endOf('day').toISOString())
	}

	$('#reportrange').daterangepicker({
        format: 'MM/DD/YYYY',
        startDate: moment().subtract(29,'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: '12/31/2020',
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'right',
        drops: 'down',
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-primary',
        cancelClass: 'btn-default',
        separator: ' to ',
        locale: {
            applyLabel: 'Submit',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
        }
    }, function(start, end, label) {
        // console.log(start.toISOString(), end.toISOString(), label);
        // $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        // _Meteortics.set('startDate',start.toISOString())
        // _Meteortics.set('endDate',end.toISOString())
        _Meteortics.set('startDate',start.startOf('day').toISOString())
        _Meteortics.set('endDate',end.endOf('day').toISOString())
    });
})


Template.daterangepicker.helpers({
    startDate:function(){
        return moment(_Meteortics.get('startDate')).format('MMMM D, YYYY')
    },
    endDate:function(){
        return moment(_Meteortics.get('endDate')).format('MMMM D, YYYY')
    }
})