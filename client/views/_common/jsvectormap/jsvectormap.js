Template.jsvectormap.onRendered(function () {

    var self = this,
        data
    this.autorun(function() {
        if (self.data.Data instanceof Meteor.Collection.Cursor)
           data = self.data.Data.fetch()
        else data = self.data.Data
        if(data.length==0)
            return
        if(self.data.value=='count'){
            data = _.countBy(data,function(d){
                return Object.resolve(self.data.geo_accessor,d)
            })
        }

        console.log(data)
        $('#'+self.data.Id).vectorMap({
            map: 'world_mill_en',
            //backgroundColor:'transparent',
            series: {
                regions: [{
                    values: data,
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code){
                el.html(el.html()+' ('+(data[code] || 0) +')');
            }
        });
    });


});

