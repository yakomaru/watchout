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
      if(d3.event.x < 15) {
        return 15;
      } else if(d3.event.x > width - 15) {
        return width - 15;
      } else {
        return d3.event.x
      }
    }).attr("cy", function() {
      if(d3.event.y < 15) {
        return 15;
      } else if(d3.event.y > height - 15) {
        return height - 15;
      } else {
        return d3.event.y;
      }
    });
  })
  .on("dragend", function(){

  });


var initialize = function(){
  //add svg
  d3.select("body").append("svg").attr("height", height).attr("width", width)
    .append("defs")
    .append("pattern")
    .attr("id", "bg")
    .attr("height", 30)
    .attr("width", 30)
    .append("image")
    .attr("xlink:href", "shuriken2.png").attr('width', 30).attr('height', 30);
  d3.select('svg').append('rect').attr('height', height).attr('width', width).attr('fill', 'red').style('display', 'none');

};



var insertPlayers = function(){
  for (var i = 0; i < 10; i++){
    enemies[i] = d3.select("svg").append("circle").attr("class", "enemy").attr("cx", Math.random() * width)
      .attr("cy", Math.random() * height).attr("r", 15).attr('fill', 'url(#bg)');
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
  var hero = d3.select("svg").append("circle").attr("class", "hero").attr("cx", width / 2)
    .attr("cy", height / 2).attr("r", 15).attr("fill", "blue").call(drag);
};

var updateEnemies = function(){
  d3.select("svg").selectAll(".enemy").transition().duration(1500).attr("cx", function(){return Math.random() * width})
    .attr("cy", function(){return Math.random() * height});
}

var collisionCheck = function(){
  // var enemy = d3.selectAll('.enemy')[0];
  // var hero = d3.selectAll('.hero')[0][0];
  rotate = (rotate + 4) % 360;
  for (var i = 0; i < 10; i++){
    enemies[i].attr('transform', function() {return 'rotate(' + rotate + ' ' + enemies[i].attr('cx') + ' ' + enemies[i].attr('cy') + ')'})
    if (Math.abs(enemy[i].cx.animVal.value - hero.cx.animVal.value) <= 30 &&
        Math.abs(enemy[i].cy.animVal.value - hero.cy.animVal.value) <= 30 ){
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


var height = screen.height * 0.7;
var width = screen.width * 0.9;


var enemies = [];
var currentScore = 0;
var highScore = 0;
var collisions = 0;
var rotate = 0;


initialize();
insertPlayers();
setInterval(updateEnemies, 1500);
setInterval(collisionCheck, 10);
setInterval(score, 100);
var enemy = d3.selectAll('.enemy')[0];
var hero = d3.selectAll('.hero')[0][0];