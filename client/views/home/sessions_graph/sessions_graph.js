var sessions_sub, chart
Template.sessions_graph.onCreated(function() {
  sessions_sub = this.subscribe('sessions', Session.get('appId'))
})

Template.sessions_graph.onRendered(function() {
  var graph_data = []
  var svg = dimple.newSvg("#sessions_graph", "100%", "100%");
  svg.append("rect")
      .attr("x", "0")
      .attr("y", "0")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "#5cb85c")
      // .style('opacity','0.9')
  var chart = new dimple.chart(svg, graph_data);
  // chart.setBounds(60, 30, 510, 335)
  chart.setMargins(50,20,20,40)
  window.onresize = function() {
    chart.draw(0, true);
  };
  var x = chart.addTimeAxis("x", "Day",null, '%d/%m');
  var y = chart.addMeasureAxis("y", "Sessions");
  var s = chart.addSeries("appId", dimple.plot.line)
  s.interpolation = "cardinal"

  this.autorun(function() {
    if (sessions_sub.ready()) {
      Sessions.find().observe({
        added: function(session) {
          // console.log('added session', session)
          session['Day'] = moment(session.opened).format('l')
          session['Sessions'] = 1
          graph_data.push(session)
          // console.log('session', session)
          // console.log('graph_data', graph_data)
          chart.draw()
        }
      })
    }
  })
})