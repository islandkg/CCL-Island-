function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  g = new gObject(width/2,height/2);
}

function draw() {
  background(0);
  g.display();
  g.update();
  g.blinking();

}

class gObject {
  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    this.glowThickness = 51; // max for now with constraints on i, check below
    this.size = 100;
    this.pulseRate= 0;
    this.stretchFactor = 0;
    this.diaGoal = 20;
    this.dia1 = 0; // affects x size (length of ellipse)

    //sound
    this.warpSound = loadSound("assets/warp-sfx-6897.mp3") // load warp sound
    this.warpSound.rate(1.5);
    this.warpSound.setVolume(0.5);

  }

  update(){
    
    //drag effect
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

    if(mouseIsPressed == true && d < this.size-this.size/4){
      this.x = mouseX;
      this.y = mouseY;
      
    
    }
    this.pulseRate += random(0.004,0.07); // to change pulse rate

    // stretch horizontally

   this.dia1 = lerp(this.dia1,this.diaGoal,0.1) // lerp for stretch

    if (d < this.size) {
      this.diaGoal = this.size;
      this.warpSound.play(); // playsound
    } else {
      this.diaGoal = 0;
      this.dia1 = lerp(this.dia1,this.diaGoal,0.1); // good but not smooth liek i did in p5 trial
      
    }
  }
    blinking (){ // make the transparency pulse using sin?
    

  }
  display(){
    fill(0,255,255);
    noStroke();
    let pulse = sin(this.pulseRate)* 5 // plsing effect

      
    for(let i = 0; i < this.glowThickness; i+= 3){
     


      //FAILED ATTEMPT AT STRETCH
     // let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
      // if (d < this.size-this.size/4) {
      //   this.stretchFactor = 30;
      // } else if (d >this.size-this.size/4){
      //   this.stretchfactor = -30;
      // }


      this.transp = 255-i*5; // watch for constraint on glowthickness bc of transparency
      //with trans at i*5 --> max thickness is *51 because i+= 5 (5 * 51 = 255)

      // if (d < this.size-this.size/4){
      // this.stretchFactor = i;
      // } else if (d > this.size-this.size/4){
      //   this.stretchfactor = -i;
      // }
    
      let d = dist(mouseX,mouseY,this.x,this.y);
      if (d < this.size) {
        fill(0,255,100,this.transp); // maybe change transp for better effect
      } else {
       fill(0,225,255,this.transp)
      }


      //fill(0,225,255,this.transp);
      ellipse(this.x,this.y, this.size + pulse + i*2 + this.dia1,this.size+i*2 + pulse);
    }
    fill(0,225,255);
    noStroke();

    //color glitch green to blue on hover

    let d = dist(mouseX,mouseY,this.x,this.y);
      if (d < this.size) {
        fill(0,255,100,random(50,250));
      } else {
       fill(0,225,255,random(50,250))
      }
      //circle(250,height/2,this.size+ pulse); //reference circle for size
      //console.log(this.dia1,this.diaGoal);1
    //  let speedFactor = this.dia1*0.1 attempt at making glitch slower
      // mini circles taht stretch
      for (let x = 0; x < random(2, 4); x+= random(2,10)) { // generates between 2 and 4 circles
        for (let y = 0; y < random(2, 4); y+= random(2,10)) { // adds another loop
          let randX = random(this.x - this.size / 2, this.x + this.size/2); // rand x within the size
          let randY = random(this.y - this.size /2, this.y + this.size/2); // rand y within the size
         // fill(0,225,255,random(50,250)); //transparency change
          ellipse(randX + x, randY + y, this.dia1*random(3,5) , this.size/random(2.5,6)); // random circles with slight changes 
        }
      }
      
      //glitchy square that oround at all times (maybe add color effect)
      
      
      
     
      square(this.x+random(this.x*-0.4,this.x*0.4), this.y+random(this.y*-0.4,this.y*0.4), random(10,30));
      fill(255,50,255,random(50,200));
      square(this.x+random(this.x*-0.4,this.x*0.4), this.y+random(this.y*-0.4,this.y*0.4), random(10,30));

  }



}

function mousePressed(){
// this.warpSound.play();
}

// problem i need to fix, i cant exactly control the size of the circles because of glow tickness. ITS possible i just cant figure it out with the frickin glowthickness omggg

//might change green glitch color to pink fucia
// horizontal is GOOD i did it, but now I need the obj to stretch in someparts too