// start slingin' some d3 here.

//Insert enemies
  //enemies need to move at some interval
  //if they collide with the mouse
    //restart game
    //store high score
    //increment collisions
//Start the score counter
var drag = d3.behavior.drag()
  .on("dragstart", function(){

  })
  .on("drag", function(){
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  })
  .on("dragend", function(){

  });




// function click(){
//   // Ignore the click event if it was suppressed
//   if (d3.event.defaultPrevented) return;

//   // Extract the click location\    
//   var point = d3.mouse(this)
//   , p = {x: point[0], y: point[1] };
// }

// function dragmove(d) {
//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
// }

var initialize = function(){
  //add svg
  var svg = d3.select("body").append("svg").attr("height", "500").attr("width", "500");
};



var insertPlayers = function(){
  for (var i = 0; i < 10; i++){
    d3.select("svg").append("circle").attr("class", "enemy").attr("cx", Math.random() * 500)
    .attr("cy", Math.random() * 500).attr("r", 10).attr("fill", "black");
  }
  var hero = d3.select("svg").append("circle").attr("class", "hero").attr("cx", 250)
    .attr("cy", 250).attr("r", 10).attr("fill", "blue").call(drag);
  //var drag = d3.behavior.drag().on("drag", dragmove);
  // hero.selectAll(".hero").call(dragmove);
};

    // var text = svg.selectAll("text")
  //     .data(data, function(d) { return d; });

  // text.attr("x", function(d, i) { return i * 32; })
var updateEnemies = function(){
  d3.select("svg").selectAll(".enemy").transition().duration(1000).attr("cx", function(){return Math.random() * 500})
    .attr("cy", function(){return Math.random() * 500});
}

// var drag = d3.behavior.drag();
// selection.call(drag);

initialize();
insertPlayers();
setInterval(updateEnemies, 1000);