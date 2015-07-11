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
    d3.select(this).attr("cx", function() {
      if(d3.event.x < 10) {
        return 10;
      } else if(d3.event.x > 490) {
        return 490;
      } else {
        return d3.event.x
      }
    }).attr("cy", function() {
      if(d3.event.y < 10) {
        return 10;
      } else if(d3.event.y > 490) {
        return 490;
      } else {
        return d3.event.y;
      }
    });
  })
  .on("dragend", function(){

  });


var initialize = function(){
  //add svg
  d3.select("body").append("svg").attr("height", "500").attr("width", "500")
    .append("defs")
    .append("pattern")
    .attr("id", "bg")
    .attr("height", 20)
    .attr("width", 20)
    .append("image")
    .attr("xlink:href", "shuriken.png").attr('width', 20).attr('height', 20);
  d3.select('svg').append('rect').attr('height', 500).attr('width', 500).attr('fill', 'red').style('display', 'none');

};



var insertPlayers = function(){
  for (var i = 0; i < 10; i++){
    d3.select("svg").append("circle").attr("class", "enemy").attr("cx", Math.random() * 500)
      .attr("cy", Math.random() * 500).attr("r", 10).attr('fill', 'url(#bg)');
      /*.append('defs')
      .append('pattern').attr('id', 'img1').attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 20).attr('height', 20)
        .append('image').attr('xlink:href', 'shuriken.png').attr('x', 0).attr('y', 0)*/

      // <defs>
      //   <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
      //   <image xlink:href="shuriken.png" x="0" y="0" width="20" height="20" />
      //   </pattern>
      // </defs>

  }
  var hero = d3.select("svg").append("circle").attr("class", "hero").attr("cx", 250)
    .attr("cy", 250).attr("r", 10).attr("fill", "blue").call(drag);
};

var updateEnemies = function(){
  d3.select("svg").selectAll(".enemy").transition().duration(1000).attr("cx", function(){return Math.random() * 500})
    .attr("cy", function(){return Math.random() * 500});
}

var collisionCheck = function(){
  var enemy = d3.selectAll('.enemy')[0];
  var hero = d3.selectAll('.hero')[0][0];
  for (var i = 0; i < 10; i++){
    if (Math.abs(enemy[i].cx.animVal.value - hero.cx.animVal.value) <= 20 &&
        Math.abs(enemy[i].cy.animVal.value - hero.cy.animVal.value) <= 20 ){
      if(currentScore > highScore) {
        highScore = currentScore;
        d3.select('.high').text(highScore);
      }
      currentScore = 0;
      collisions++;
      d3.select('.collisions').text(collisions);
      d3.select('rect').style('display', 'inline');
      setTimeout(function(){d3.select('rect').style('display', 'none')}, 20);
    }
  }
};

var score = function(){
  d3.select('.score').text(++currentScore);
}



var enemies = [];d3.selectAll(".enemy");
var currentScore = 0;
var highScore = 0;
var collisions = 0;


initialize();
insertPlayers();
setInterval(updateEnemies, 1000);
setInterval(collisionCheck, 1);
setInterval(score, 100);