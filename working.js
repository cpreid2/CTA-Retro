<!DOCTYPE html>
<meta charset="utf-8">
<style>

/* CSS goes here. */

</style>
<body>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://d3js.org/topojson.v1.min.js"></script>
<script>

var width = 500,
    height = 750;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("http://localhost:8000/CTA_New.json", function(error, lines) {
  if (error) return console.error(error);
  console.log(lines);

  var projection = d3.geo.mercator()
      .center([-87.62946739887555,41.88546497323761])
      .scale(90000)
      .translate([width - 50,height - 330]);

  var path = d3.geo.path()
      .projection(projection);

  svg.append("path")
          .datum(lines)
          .attr("d", path)
          .attr("fill", 'none')
          .attr("stroke","black");

  d3.json("http://localhost:8000/Trains_JSON.json", function(error, trains) {
            console.log(trains[1].length)

            svg.selectAll("circle")
              .data(trains)
              .enter().append("g")
              .each(function(data,i){
                d3.select(this).selectAll('circle')
                .data(data)
                .enter().append('circle')
                .transition() // <------- TRANSITION STARTS HERE --------
                .delay(function(d,i){ return 1000*i; })
                .attr("cx", function(d){return projection([d.lon,d.lat])[0]})
                .attr("cy", function(d){return projection([d.lon,d.lat])[1]})
                .attr("r", 5)
                .style("fill", "red");
              })
          });

});


//Loop through each minute
// For each minute, display each circle and remove previous set of circles

</script>
