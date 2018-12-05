/*
 * @name Snowflakes
 * @description Particle system simulating the motion of falling snowflakes.
 * Uses an array of objects to hold the snowflake particles.
 * Contributed by Aatish Bhatia.
 */

let snowflakes = []; // array to hold snowflake objects

function setup() {
  createCanvas(400, 600);
  fill(90,123,200,150);
  noStroke();
}

function draw() {
  background(0);
  let t = frameCount / 70; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < random(1); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(2, 4 * PI);
  this.size = random(24, 27);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.05);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
