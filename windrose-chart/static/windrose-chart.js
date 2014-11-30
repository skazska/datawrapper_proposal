/**
 * Created by ska on 30.11.14.
 */
(function () {

  dw.visualization.register('windrose-chart', {

    render: function (el) {
      var me = this;
//      console.log(me);
      var axes = me.axes(1);
//      var angle = Math.PI / axes.direction.length;
      var vals = axes.length.values();
      var maxVal = d3.max(vals);
      var diameter = Math.min(me.__w, me.__h);
      var oX = diameter / 2, oY = diameter / 2;
      var data = [];
      var axisData = [];

      //prepare scaling
      var radius = d3.scale.linear()
        .domain([0, maxVal])
        .range([0, diameter / 2]);

      var angle = d3.scale.ordinal()
        .domain(axes.direction.values())
        .rangeBands([0, 2*Math.PI]);

      //prepare rose line path generator
      var line = d3.svg.line.radial()
        .radius(function(d) { return radius(d.length); })
        .angle(function(d) { return angle(d.direction); });

      //prepare axis line path generator
      var axisLine = d3.svg.line.radial()
        .radius(function(d) { return d.length; })
        .angle(function(d) { return angle(d.direction); });

      //prepare svg
      var vis = d3.select(el.get(0)).append("svg:svg")
        .attr("width", diameter)
        .attr("height", diameter)
//        .style("margin-left", (size[0] - diameter) / 2)
        .attr("class", "rose");

      var visBody = vis.append("g")
        .attr("transform", "translate(" + oX + "," + oY + ")");

      //prepare rose graph data
      me.dataset.eachRow(function(i){
        data.push({direction:axes.direction.val(i), length:axes.length.val(i)});
        axisData.push([{direction:axes.direction.val(i), length:0},{direction:axes.direction.val(i), length:diameter / 2}]);
      });

      console.log(data);

      //draw axes
      var axis = visBody.selectAll("path.axis").data(axisData);
      axis.enter().append("path")
        .attr("d", axisLine)
        .attr("class", "axis")
        .attr("stroke", "red");

      //draw rose
      var rose = visBody.selectAll("path.rose").data([line(data)]);
      rose.enter().append("path")
        .attr("d", function(d){return d+"Z";})
        .attr("class", "rose");


//      console.log(me.dataset.columns());


    }
  });
})  .call(this);