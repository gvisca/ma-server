var chart, serie

Template.sessions_graph.onRendered(function() {
  // var chart = dc.barChart("#sessions_graph");
  // d3.csv("morley.csv", function(error, experiments) {

  //   experiments.forEach(function(x) {
  //     x.Speed = +x.Speed;
  //   });

  //   var ndx = crossfilter(experiments),
  //     runDimension = ndx.dimension(function(d) {
  //       return +d.Run;
  //     }),
  //     speedSumGroup = runDimension.group().reduceSum(function(d) {
  //       return d.Speed * d.Run / 1000;
  //     });

  //   chart
  //     .width(768)
  //     .height(480)
  //     .x(d3.scale.linear().domain([6, 20]))
  //     .brushOn(false)
  //     .yAxisLabel("This is the Y Axis!")
  //     .dimension(runDimension)
  //     .group(speedSumGroup)
  //     .on('renderlet', function(chart) {
  //       chart.selectAll('rect').on("click", function(d) {
  //         console.log("click!", d);
  //       });
  //     });
  //   chart.render();
  // });

  var graph_data = []
  var svg = dimple.newSvg("#sessions_graph", "100%", "100%");
  // svg.append("rect")
  //   .attr("x", "0")
  //   .attr("y", "0")
  //   .attr("width", "100%")
  //   .attr("height", "100%")
  //   .style("fill", "#5cb85c")
    // .style('opacity','0.9')
  var chart = new dimple.chart(svg, graph_data);
  // chart.setBounds(60, 30, 510, 335)
  chart.setMargins(50, 20, 20, 40)
  window.onresize = function() {
    chart.draw(0, true);
  };
  chart.defaultColors = [
    new dimple.color("#3B5998")
  ];
  var x = chart.addCategoryAxis("x", "Day", null, '%d/%m');
  var y = chart.addMeasureAxis("y", "Sessions");
  serie = chart.addSeries(null, dimple.plot.bar)
  serie.interpolation = "cardinal"

  MA_Sessions.find({
      appId: _Meteortics.get('appId'),
      opened: {
        $gte: new Date(_Meteortics.get('startDate')),
        $lte: new Date(_Meteortics.get('endDate'))
      }
    }, {
      sort: {
        opened: 1
      }
    }).observe({
      added: function(session) {
        console.log('added session', session)
        graph_data.push({
          id: session._id,
          Day: moment(session.opened).format('MM/DD'),
          Sessions: 1
        })
        // console.log(graph_data.length)
        chart.data = graph_data
        chart.draw(1000)
      },
      changed: function(session) {
        // console.log('changed session', session)

      },
      removed: function(session) {
        // console.log('removed session', session)
        graph_data = _(graph_data).filter(function(s) {
          return s.id !== session._id
        });
        // console.log(graph_data.length)
        chart.data = graph_data
        chart.draw(1000)
      }
    })
    // }
    // })
})