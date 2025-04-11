// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 50; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 100; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(10);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.scaleFactor = 0.2;
    this.direction = 1; // for direction of bird
    // this.seeWing = -1
    this.wingOpacity = 0
    this.speed = random(1.2,2);
    this.yChange = 0;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    if(mouseX - this.x > 0){
      this.direction = 1;
    } else {
      this.direction = -1;
    }
    

    if(mouseIsPressed == true && this.seeWing == -1){
        this.seeWing = 1
    } else {
        this.seeWing = -1;
      }
    

      //birds constantly following mouseX
        if(this.direction <0) {
            this.x+= -this.speed ;
        } else {
          this.x += this.speed ;
        }

        if(mouseY < this.y) {
          this.y+= -this.speed + this.yChange ;
      } else {
        this.y+= this.speed + this.yChange;
      }
        
      let noiseValue = noise(frameCount*0.1+random(-2,2));
      this.yChange= map(noiseValue,0,1,-4,4); // up and down motion birds

    let sinValue = sin(frameCount*0.5);

    this.wingOpacity = map(sinValue, -1,1,-100,255); // start is -100 for moree flickery effect
  }
    display(){
      push();
        translate(this.x,this.y);
        scale(this.scaleFactor*this.direction,this.scaleFactor);
        fill(30,180,250);
        noStroke();
        
        circle(0,0,50);
        //circle(25,-20,30);
      push();
      rotate(-0.4);
       arc(25, -18, 30, 27, 0 + PI/4 / 2, PI - PI/4 / 2, OPEN);
        // circle(27,-10,30);
        
        arc(25, -9, 30, 26, 0 + PI/4 / 2, PI - PI/4 / 2, OPEN); // open if for it to only fill what i want
      pop();
      
       // circle(-26,10,100);
      arc(-36,10,120,120,PI-PI*2/2,PI-1,OPEN);
      //arc(-40, 31, 80, 80, 0.7 + PI/4 / 2, PI - PI/4 / 2, OPEN); // extra tail
      arc(-30, 19, 80, 80, 0 + PI/4 / 2, PI - PI/4 / 2, OPEN);
      arc(-40, 0, 80, 80, 0.6 + PI/4 / 2, PI - PI/4 / 2, OPEN);
      //last wings that wil bat
      fill(30,180,250,255);
      arc(-10, -45, 160, 160, 0.8 + PI/4 / 2, PI - PI/4 / 2, OPEN);
      fill(30,180,250,this.wingOpacity);
      arc(-10, -45, 160, 160, 0.3 + PI/4 / 2, PI - PI/4 / 2, OPEN);
      pop();
      
    }
  }

function mousePressed(){
  // has some birds come over
  for(let i = 0; i < random(4,10); i++){
    particles.push(new Particle(mouseX+random(-300,300),mouseY+random(-100,100)));
  }
}

