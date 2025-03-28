let dancer1;
let earAngle = 0.25; // between 0.25 and -0.25
let feetsize = 1;
let armAngle = 1;
let armScale = 1;
let bodyMove = 1;
let YbodyMove;
let earangleSpeed = 1;
let kick;
let eyecolor;
let eyecolorchangeR;
let eyecolorchangeG;
let eyecolorchangeB;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    dancer1 = new Dancer();
  kick = random(-1,0.89);
  eyecolor = random(0,255);
  eyecolorchangeR = random(-150,150);
  eyecolorchangeG = random(-150,150);
  eyecolorchangeB = random(-150,150);
}

function draw(){
    background(8,200,140);
    dancer1.feet_move();
    dancer1.ears_move();
    dancer1.display();
    dancer1.arms_move();
  dancer1.body_jump();
}  

class Dancer{
    constructor() {
    this.x = width/2;
    this.y = height/2;
    this.scaleFactor = 1;

    }
  
   arms_move() {
        let armAngleSinValue = sin(frameCount * 0.05);
        armAngle = map(armAngleSinValue, -1, 1, -PI / 4, PI / 4);  // pi used for angles super helpful
        let armScaleSinValue = sin( -1, 1, 0.8, 1.2);
     armScale = map(armScaleSinValue, -1, 1, 0.8, 1.2);
     
    }
  
  feet_move(){
     let feetsinValue = sin(frameCount * 0.06); 
    feetsize = map(feetsinValue, -1, 1, kick, kick+0.8);
  }
  
  ears_move(){
    earangleSpeed = mouseX*0.01+1;
    let earsinValue = sin(frameCount * 0.07*earangleSpeed); 
    earAngle = map(earsinValue, -1, 1, -0.25, 0.25);
    
    
  }
  body_jump(){
    // let bodysinValue = sin(frameCount*0.09);
    // bodyMove = map(bodysinValue,-1,1,-40,40);
    // //console.log(bodyMove);
    // let YbodysinValue = sin(frameCount*0.09);
    //   YbodyMove = map(YbodysinValue,-1,1,0,30);
    
    // for jump effect
    let bodysinValue = sin(frameCount * 0.06); // Side-to-side motion
    bodyMove = map(bodysinValue, -1, 1, -30, 30);  

    //abs value used to flip it instead of concave down
    YbodyMove = map(1 - abs(bodysinValue), 0, 1, 0, 30); 
  }
  
    display(){
        push();
        translate(this.x+bodyMove, this.y+YbodyMove);
     
     push();
        stroke(220, 130, 120);
        strokeWeight(8);

        // lft Arm
        push();
        stroke(100,2,80);
        translate(-30, -50);
        rotate(armAngle);
       // scale(armScale, 1);
        line(0, 0, -30, 30);
        line(-30, 30, -50, 70);
        pop();

        // right Arm
        push();
        translate(30, -50);
        stroke(100,2,80);
        rotate(armAngle);
        //scale(this.armScale, 1);
        line(0, 0, 30, 30);
        line(30, 30, 50, 70);
        pop();
        pop();

        noStroke();
       
        fill(100,2,80);
        ellipse(0,-100,80,60);

      //body

      
      //feet left
      fill(100,2,80);
      push();
      translate(-20,70);
      rotate(-feetsize*0.2);
      fill('white');
      circle(0,0,4)
      fill(100,2,80);
      rect(-5,-10,20,40);
      ellipse(5,30,20,40);
      //scale();
      
      pop();
      
      //feet right
      push();
    
      translate(10,70);
      fill('white');
    
      circle(0,0,4)
      rotate(feetsize);
      fill(100,2,80);
      rect(-5,-10,20,40);
      
      ellipse(5,30,20,40);
      pop();
      
      //belly
      ellipse(0,5,80,160);
      fill(100+eyecolorchangeR*0.2,100+eyecolorchangeG*0.2,100+eyecolorchangeB*0.2);
      ellipse(0,30,70,110);
      
      
        // eyes
        fill("white");
        circle(0-20,-95,20);
        fill(eyecolor+eyecolorchangeR,eyecolor+eyecolorchangeG,eyecolor+eyecolorchangeB);
        circle(0-20,-95,10);
        fill("white");
        circle(0+20,-95,20);
        fill('black');
        circle(0+20,-95,10);
      
      //mouth
        arc(0,-85,30,20,0,PI);
        fill("pink");
        arc(0,-80,20,10,0,PI);
      
      //ear hair thing
       fill(100,2,80);
        arc(32,-120,70,40,3*PI,PI/2)
        fill(100+eyecolorchangeR*0.2,100+eyecolorchangeG*0.2,100+eyecolorchangeB*0.2);
        ellipse(45,-115,40,20);
      
      push();
      scale(-1,1)
       fill(100,2,80);
        arc(32,-120,70,40,3*PI,PI/2);
        fill(100+eyecolorchangeR*0.2,100+eyecolorchangeG*0.2,100+eyecolorchangeB*0.2);
        ellipse(45,-115,40,20);
      pop();

      //dangling ears
      //left
      
        push();
       
      fill(220,130,120);
      translate(-60,-120);
      rotate(earAngle);
     //see the translation 
      fill(220);
      //circle(0,0,3);
      fill(100+eyecolorchangeR*0.5,100+eyecolorchangeG*0.6,100+eyecolorchangeB*0.2,200);

      ellipse(0,0+70,30,140) // ear needs to dangle back and forth using rotate
            
      
      //right
        pop();
      
       push();
       
      fill(220,130,120);
      translate(60,-120);
      rotate(-earAngle);
     //see the translation 
      fill(220);
      //circle(0,0,3);
      fill(100+eyecolorchangeR*0.5,100+eyecolorchangeG*0.6,100+eyecolorchangeB*0.2,200);

      ellipse(0,0+70,30,140) // ear needs to dangle back and forth using rotate
            
      
      
        pop();
      
      
      
        pop();
      }
     
}








