
//for start screen
let gameState = "Start"; // intro → transition → play
let fadeAlpha = 255;
let Alpha = 0
let introTimer = 0;

//wires clicked or not
let wiresClicked = false;
let wiresTint = 255;

let end = false;
//let lastTimer = 0;

let worldX = 0;
let worldY = 0;

//mouth visibile or not
let byemMouth = 1;

//see fully transp heart and brain
let seeFull = 0;


//scaling for dissaperaing objects when c pressed
let photoScale = 0.5;
let earphonesScale = 0.8;
let tapeScale = 1;
//bg
let bgImg;


let worldWidth = 2000; // bigger than canvas
let worldHeight = 2000;
//


MeMoveX = 0; // to explore window
MeMoveY = 0; // to explore window

// sidebar
let seeSB = false;
let SBtransp = 0;
let SBappear = false;
let SBlength = 0
let SBlengthGoal = 0;

//phrases transparency
let phrasesTransp = 255;

//goal dissapear
let byeGoal2 = 1;

//text 
let phrases = [
  "Island: Wha… what happened? You… brought me back.",
  "Island: My name is uh... Island... Gabler",
  "Island: I’ve been asleep for a thousand years.",
  "Island: My limbs… well, they're now robotic...",
  "Island: They move again. Thank you kind stranger",
  "Island: A long time ago, I designed a way to rebuild myself, so I could experience the future",
  "Island: Except...I guess I didn't realize I would need some help rebuilding myself",
  "Island: But I'm not whole yet. My brain and heart...",
  "Island: They're on...left, but can't be restored yet",
  "Island: I sealed them in a time capsule...",
  "Island: Go ahead, Open it up!",
  "Island: It holds the pieces I need to fully awaken",
  "Island:You might not be familiar with these pieces as they are from my time on earth...",
  "Island: But I believe in you to find them, so, Goodluck, stranger!"
  
];
let goal2 = "Find them: a set of photos… my earphones… and the OK tape. Use WASD to move. Press C key when located. Restore me."
let infoKnown1 = "Name: Island Gabler? Age: 1000+ years";

let earphoneKnowledge = "Island:Ah yes, my earphones! I used to listen to all my favorite songs with these. Not wireless — they were already outdated even back then"
let tapeKnowledge = "Island: Oh, you found my OK Tape! I used it for a shoulder injury I never quite recovered from."
let photoKnowledge = "Island: Wow... so many memories in those photos. I remember taking them with some friends at a photobooth downtown."
let Finalphrase = "Island: I’m whole again. After all this time... Thank you, stranger.Oh? What’s that — you’re curious about the past, you say? Well... the least I can do is tell you about it."

let seeGoal2 = false;

//loading bar war 



let show33 = true; // load bar vars
let show66 = true;
let show100 =  true;

let currentPhraseI = 0; // to track the current phrase
let pos = 0; // to track the position of the letter in the current phrase
let restartDelay = 100;
let phraseComplete = false; // to track if the current phrase is finished


//hovering body parts array
// let hoveringParts = []; delete

let objects = [];
let torsoCoords = [
  [-12, -40],
  [-25, -38],
  [-25, -38], 
  [-28, -6],  // armpit
  [-25, 50],  // hip

  // Center line
  [0, 60],    // center waist
  [0, 0],     // center
  [0, -40],   // mid neck

  // Right side
  [12, -40],
  [25, -38],
  [28, -6],   // armpit
  [25, 50]    // hip/pelvis
  
];

let armCoords = [
  
  // [0, 0],              // center for reference

  // left arm
  [-38, -28],          // shoulder left
  [-28, 0],            // armpit
  [-50, 35],           // elbow left
  [-36, 38],           // elbow right
  [-62, 90],           // wrist left
  [-50, 92],           // wrist right
  [-58, 96],           // middle wrist
  [-62, 120],          // hand left
  [-46, 112],          // hand right
  [-52, 126],          // finger

  // right arm
  [38, -28],           // shoulder right
  [28, 0],             // armpit
  [50, 35],            // elbow left
  [36, 38],            // elbow right
  [62, 90],            // wrist left
  [50, 92],            // wrist right
  [58, 96],            // middle wrist
  [62, 120],           // hand left
  [46, 112],           // hand right
  [52, 126]            // finger
  
  ];

let headCoords = [
  [0, -25],        // top middle

  // left side
  //[0, 0],          // center of head
  [-20, -5],       // mid up left
  [-18, -20],      // top left
  [-18, 12],       // lower left
  [-5, 29],        // bottom left

  // right side
  [20, -5],        // mid up right
  [18, -20],       // top right
  [18, 12],        // lower right
  [5, 29]          // bottom right
  
];

let legCoords = [
    [0, 0],             // center ref

  // left leg
  [-30, -38],         // hip top left
  [-35, -20],
  [-33, 58],          // knee left
  [-14, 58],          // knee right
  [-33, 75],          // knee bottom left
  [-14, 75],          // knee bottom right
  [-30, 160],         // ankle left
  [-15, 162],         // ankle right

  // right leg
  [30, -38],          // hip top right
  [35, -20],
  [33, 58],           // knee left
  [14, 58],           // knee right
  [33, 75],           // knee bottom left
  [14, 75],           // knee bottom right
  [30, 160],          // ankle left
  [15, 162],          // ankle right

  // feet
  // left foot
  [-40, 178],         // toe left
  [-15, 178],         // toe right

  // right foot
  [40, 178],          // toe left
  [15, 178]           // toe right
];
//photos
let photosX;
let photoObj
//tape
let tapeX;
//earphones
let earphones;

//let noSoulImg;

//wire
let wires;
let Mewave;
let wiresConnected;

// almost done just need wires and boom

let done = false;


let offSetXTorso = 400 + worldX; // instead of transalte
let offSetYTorso = 160 + worldY;

let offSetXArms = 400 + worldX; // instead of transalte
let offSetYArms = 150 + worldY;

let offSetXHead = 400 + worldX;
let offSetYHead = 75 + worldY;

let offSetXLegs = 400 + worldX;
let offSetYLegs = 260 + worldY;

//image bg
function preload(){
  bgImg = loadImage("assets/bg_warp_glitch_CCL.jpg");

  //body parts
  headImg = loadImage("assets/Me_head.png");
  armsImg = loadImage("assets/Me_arms.png");
  torsoImg = loadImage("assets/Me_torso.png");
  legsImg = loadImage("assets/Me_legs.png");
  MewaveImg = loadImage("assets/Me_complete_wave.png"); // load wave image me
  wiresImg = loadImage("assets/Obj_wires.png"); // load wires image
  wiresConnectedImg = loadImage("assets/wires_connected.png"); // load wires image


  //body 1
  noSoulImg = loadImage("assets/Me_complete.png");

  //brain and heart
  brainImg = loadImage("assets/Obj_me.png");
  heartImg = loadImage("assets/Obj_heart.png")

  
}

function setup() {
  //let canvas = createCanvas(windowWidth, windowHeight);
  let canvas = createCanvas(800,500);
  canvas.parent("p5-canvas-container");
  hoverHead = new HeadObj(620,380);
  hoverLegs = new LegsObj(700,130);
  hoverArms = new ArmsObj(120,350,height/2.5);
  hoverTorso = new TorsoObj(150,110);
  photosX =  1300; // photos coords
  tapeX = 1100;
  earphonesX = 350;


  // hoveringParts.push(new BreathingCircle(200, 150, 100, "head"));
  // hoveringParts.push(new BreathingCircle(400, 300, 100, "arms")); delete
  // hoveringParts.push(new BreathingCircle(600, 300, 100, "torso"));
  // hoveringParts.push(new BreathingCircle(800, 300, 100, "legs"));
  
  // hover = new BreathingCircle(500, 200, 50);

     // create gObjects from body part coords
   for (let i = 0; i < torsoCoords.length; i++) {
 
    let x = torsoCoords[i][0]  + offSetXTorso;
    let y = torsoCoords[i][1]+ offSetYTorso;
    let torso = new gObject(x, y,1);
    objects.push(torso);
  }
  
  //arms
   for (let i = 0; i < armCoords.length; i++) {   
      let x = armCoords[i][0] + offSetXArms; //add instead of translate
      let y = armCoords[i][1] + offSetYArms;
      let arms = new gObject(x, y, 1); // create new gObject 
      objects.push(arms); //add the object to  array
    }
  
  //head
    for (let i = 0; i < headCoords.length; i++) {
      let x = headCoords[i][0] + offSetXHead;
      let y = headCoords[i][1] + offSetYHead;
      let head = new gObject(x, y, 1);
      objects.push(head);
    }
  
  //legs
  
    for (let i = 0; i < legCoords.length; i++) {
      let x = legCoords[i][0] + offSetXLegs;
      let y = legCoords[i][1] + offSetYLegs;
      let leg = new gObject(x, y, 1);
      objects.push(leg);
    }

  
   photosObj = new photos(photosX,photosX/2); // pos
   tapeObj = new tape(tapeX/2.5,tapeX); //tape pos
   earphonesObj = new Earphones(earphonesX*random(4,5),earphonesX*random(2,3));
  //console.log(tapeX);
}

function draw() {
  background(0);



translate(worldX,worldY);
tint(255, 200);
image(bgImg,0,0,worldWidth,worldHeight);

//photo obj

push();
translate(worldX, worldY);
photosObj.display();
// photosObj.clicked();  // now will detect properly
pop();

  tapeObj.display();
  tapeObj.clicked();
  tapeObj.update();

  earphonesObj.display();
  earphonesObj.clicked();
  earphonesObj.update();

SBlength = lerp(SBlength,SBlengthGoal,0.2); // from what, goal, by how much// from what, goal, by how much // lerp for sidebar
if (SBappear == true){
    seeSB = true;
  } else {
    seeSB = false;
  }
  
  if (seeSB == false){
    SBtransp = 0;
  } else {
    SBtransp = 250;
    SBlengthGoal = 140;
  }

  //hovering obects appear
  hoverHead.display();
  hoverHead.update();
  hoverHead.drag();

  hoverLegs.display();
  hoverLegs.update();
  hoverLegs.drag();

  hoverArms.display();
  hoverArms.update();
  hoverArms.drag();

  hoverTorso.display();
  hoverTorso.update();
  hoverTorso.drag();
  
  push();
  translate(-worldX,-worldY);
  //sidebar drawing
  
  stroke(150,250,255,SBtransp);
  strokeWeight(4);
  fill(26,31,46,SBtransp);
  rect(20,40,SBlength,420,20);
  pop();
  
push();

// text for world x and y coords
fill(255,255);
textSize(10);
  text(-worldX, 740-worldX,20-worldY); 
  text(-worldY,770-worldX,20-worldY);

 //background for ME
  //head
  
  push();
  translate(400+worldX,100+worldY);

  fill(255,0,0);
  //circle(0,0,5);

  fill(150,250,255,15); 
  //ellipse(0,-18,48,52);
  beginShape();
    vertex(0,-54);
    vertex(-18,-48);
    vertex(-23,-32);
    vertex(-21,-12);
    vertex(-8,4);///switch after this one
    vertex(8,4);
    vertex(21,-12);
    vertex(23,-32);
    vertex(18,-48);


  endShape();
  quad(-10,-5,-13,22,13,22,10,-5);

  //torso
    beginShape();
      vertex(0,20);
      vertex(-28,22)
      vertex(-30,55)
      vertex(-26,110);
      vertex(0,120);
      vertex(26,110);
      vertex(30,55)
      vertex(28,22);
    endShape();

    //arms
      beginShape();
        vertex(-28,22)
        vertex(-40,22);
        vertex(-52,90);
        vertex(-62,140);
        vertex(-60,144);
        vertex(-64,169);
        vertex(-49,175);
        vertex(-45,165);
        vertex(-48,144);
        vertex(-35,90);
        vertex(-29,45);



      endShape();

      beginShape();
        vertex(28,22)
        vertex(40,22);
        vertex(52,90);
        vertex(62,140);
        vertex(60,144);
        vertex(64,169);
        vertex(49,175);
        vertex(45,165);
        vertex(48,144);
        vertex(35,90);
        vertex(29,45);

      endShape();

      // legs
      beginShape();
        vertex(-26,110);
        vertex(-30,120);
        vertex(-37,138);
        vertex(-34,220);
        vertex(-34,240);
        vertex(-33,320);
        vertex(-42,342);
        vertex(-13,342);
        vertex(-11,240);
        vertex(-11,220);
        vertex(0,160); // middle bottom
        vertex(11,220);
        vertex(11,240);
        vertex(13,342);
        vertex(42,342);
        vertex(33,320);
        vertex(34,240);
        vertex(34,220);
        vertex(37,138);
        vertex(30,120);
        vertex(26,110); // make shape better like add calves

        
      endShape();


  pop();

  //barrier for hologram
  noFill();
  push();
  translate(0+worldX,-10 + worldY);
  stroke(190,240,250,40);
  strokeWeight(3);
  arc(400, 80, 326, 80, 0, PI);
  stroke(190,240,250,130);
  strokeWeight(4);
  arc(400, 80, 326, 80, PI, TWO_PI);
  
 //bottom  
  stroke(190,240,250,130);
  arc(400, 450, 326, 80, 0, PI);
  strokeWeight(3);
  stroke(190,240,250,50);
  arc(400, 450, 326, 80, PI, TWO_PI);
  pop();


// draw here new
//center of photos
// push();
// translate(0,0)
// fill(255,100,200);
// circle(photosX,photosX/2,20);
// pop();
// hover.display(1000,300,50);
// hover.update();
  
    for (let i = 0; i < objects.length; i++) {
    objects[i].update();   // move, animate, etc.
    objects[i].display();  // draw the ellipse
  }



  if(seeH_and_B == true){
    //load brain
    seeSoul = 1;

    //text
    push();
  translate(worldX,worldY);
  textFont('Courier New');
  textSize(10);
  fill(10,255,100,phrasesTransp); // text color

  // Display the current phrase with typewriter effect
  text(phrases[currentPhraseI].substring(0, pos + 1), 450, 60,280);
 
  pos++;

  // Check if the current phrase is complete
  if (pos > phrases[currentPhraseI].length + restartDelay) {
    phraseComplete = true;
  }

  // Once a phrase is complete, move to the next one
  if (phraseComplete && currentPhraseI < phrases.length - 1) {
    currentPhraseI++;
    pos = 0; // reset position for the next phrase
    phraseComplete = false; // reset phrase complete flag
  }
  pop();
  push();
  translate(-worldX,-worldY);
  textSize(12);
  if (phraseComplete && currentPhraseI === phrases.length - 1) {
  fill(20,255,200,255*byeGoal2)
  text(goal2,30,350,125);
  seeGoal2 = true;
  textSize(10);
  text(infoKnown1,30,300,120);



  }
  pop();

  let collectedCount = 0;
  if (photoCollected) {
    collectedCount++;
    push();
    translate(0-worldX,0-worldY);
    textFont('Courier New');
    
    textSize(10);
    fill(10,255,100)
    text(photoKnowledge,600,80,190);
    pop();
  }
  if (earphonesCollected) {
    collectedCount++;
    push();
    translate(0-worldX,0-worldY);
    textFont('Courier New');
    textSize(10);
    fill(10,255,100)
    text(earphoneKnowledge,600,160,190);
    pop();
  }
  if (tapeCollected) {
    collectedCount++;
    push();
    translate(0-worldX,0-worldY);
    textFont('Courier New');
    textSize(10);
    fill(10,255,100)
    text(tapeKnowledge,600,240,200);
    pop();
  }
  // Update loading bar stages based on count
  show33 = collectedCount >= 1;
  show66 = collectedCount >= 2;
  show100 = collectedCount >= 3;
  
     //loading bar 1
  push();
  translate(18-worldX,105-worldY);
  scale(0.4)
  stroke(0);
  fill(20,255,200);
  textSize(15);
  text("Loading...",105,92);
  fill(0)
  stroke(0);
  strokeWeight(3);
  fill(255);
  rect(100,100,176,30,20);
  fill(0);
  noStroke();
  arc(115,115,20,20,PI/2,PI*3/2);
  if(show33 == true){
     // FIRST 33% – dark purple to dark bluish-purple
fill(60, 0, 90);   rect(118,105,10,20);
fill(50, 0, 100);  rect(131,105,10,20);
fill(40, 10, 110); rect(144,105,10,20);
fill(30, 20, 120); rect(157,105,10,20);
  }
   if(show66 == true){
    // SECOND 66% – blue to bluish green
fill(20, 40, 180); rect(170,105,10,20);
fill(20, 60, 170); rect(183,105,10,20);
fill(20, 80, 150); rect(196,105,10,20);
fill(20, 100, 120); rect(209,105,10,20);

  }
   if(show100 == true){
    // THIRD 100% – bluish green to teal (manually extended gradient)
fill(20, 120, 100); rect(222,105,10,20);
fill(20, 140, 80);  rect(235,105,10,20);
fill(20, 160, 60);  rect(248,105,10,20);
fill(20, 180, 50);  arc(261,115,20,20,PI*3/2,PI/2);

  }

  pop();


     //loading bar 1
     push();
     translate(16-worldX,228-worldY);
     scale(0.4)
     stroke(0);
     fill(20,255,200);
     textSize(15);
     text("Loading...",105,92);
     fill(0)
     stroke(0);
     strokeWeight(3);
     fill(255);
     rect(100,100,176,30,20);
     fill(0);
     noStroke();
     arc(115,115,20,20,PI/2,PI*3/2);
     if(show33 == true){
        // FIRST 33% – dark purple to dark bluish-purple
   fill(60, 0, 90);   rect(118,105,10,20);
   fill(50, 0, 100);  rect(131,105,10,20);
   fill(40, 10, 110); rect(144,105,10,20);
   fill(30, 20, 120); rect(157,105,10,20);
     }
      if(show66 == true){
       // SECOND 66% – blue to bluish green
   fill(20, 40, 180); rect(170,105,10,20);
   fill(20, 60, 170); rect(183,105,10,20);
   fill(20, 80, 150); rect(196,105,10,20);
   fill(20, 100, 120); rect(209,105,10,20);
   
     }
      if(show100 == true){
       // THIRD 100% – bluish green to teal (manually extended gradient)
   fill(20, 120, 100); rect(222,105,10,20);
   fill(20, 140, 80);  rect(235,105,10,20);
   fill(20, 160, 60);  rect(248,105,10,20);
   fill(20, 180, 50);  arc(261,115,20,20,PI*3/2,PI/2);
   
     }
   
     pop();
 
  
}

tint(255,255*seeSoul);
push();
translate(-worldX,-worldY);
tint(255,100*seeSoul+seeFull) // use array for transparency
image(brainImg,50,70,84,66);
image(heartImg, 58,180,60,80);
fill(255,0,0);
//console.log(worldX,worldY);
console.log(Alpha,end)

pop();




  //navigation : 
let navigationSpeed = 3;
ObjsCollected(); // display objscollected function

// if(done = true){ // for last stage start wires connected appear
//   fill(26,31,46,255);
//   rect(24,330,131,110,5);
//   push();
//   scale(1.7)
//   image(wiresConnectedImg,52,12,195,120)
//   pop();
// }

if (key == "p"){

  done = true;
  //wire dissapear
  wiresTint = 0;
  //Mewave appear
  push();
  translate(0+worldX,0+worldY);
  scale(1);
  image(MewaveImg,308,46,168 ,395); // show wave
  //noTint();
  pop();
  
  //Text well doen dis
  byeWellDone = 500;// out of canvas

  

  //me dissapear GOOD

  if (worldX == 0 && worldY == 0 ){
    textSize(10);
    fill(253,220,92)
    text(Finalphrase,435,50,140);

    Alpha++
    end = true;

  }
  
}
//after limbs fixed
  if (legsFixed == true && armsFixed == true && torsoFixed == true && headFixed == true){ // IMPORTANT for after limb assembling now heart and brain
    limbsAssembled();
    noLimb = 0;
    seeH_and_B = true;
 
    push();
    tint(255,200);
    translate(worldX,worldY);
    if (done == false){
      image(noSoulImg,328,44,140 ,400);
    } else if (done == true){
      tint(255,0);
      image(noSoulImg,328,44,140 ,400);
      byeMouth = 0;
    }

    pop();

   
    if(seeH_and_B == true){
      fill(0,255);  
      if(seeGoal2 == false){
        let sinValue = sin(frameCount*0.8);
        y = map(sinValue,-1,1,2,6);
        byeMouth = 0;
        fill(0,255*byeMouth); 
        push();
        translate(worldX,worldY); 
         ellipse(399,93,10,y); // mouth talking?
         push();
    
      }
        
        
      }
      if(done == false){

      
  if (keyIsPressed == true ){ //tyr to add border to world//&& worldX < 0
    if(key == "a" && -worldX >0){
    worldX += navigationSpeed;
  
    }else if (key == "d" && -worldX <1200){ //&& wolrdX > -1200 for border?
      worldX -= navigationSpeed;

    }else if (key == "w"&& -worldY > 0 ){
      worldY += navigationSpeed;

    }else if (key == "s" && -worldY < 1000){
      worldY -= navigationSpeed;
    }

}
      }
  }

  if (introTimer > 120) { //after like 2 seconds
    fadeAlpha -= 2;
  }
  //console.log(fadeAlpha,introTimer);

  // for start , before limb assmebly
  if (gameState === "Start") {
    

    fill(255,fadeAlpha);
    circle(width/2,height/2,1000)
    textSize(32);
    fill(0,fadeAlpha);
    text("Where... am I?", width/2-100, height/2);
    introTimer++;
  }
  if(done == true){ // for last stage start wires connected appear
    fill(26,31,46,255);
    rect(24,330,131,110,5);
    push();
    scale(1.7)
    image(wiresConnectedImg,52,12,195,120)
    pop();
  }
  
  if (end == true){
    fill(255,Alpha);
    circle(400,250,2000);
  }
}


// if (fadeAlpha < 0) {

// }
let seeH_and_B = false;
  let seeSoul = 0;  




class gObject {
  constructor(x, y,startSize){
    this.baseX = x; // for exploring option
    this.baseY = y;
    // this.x = worldWidth/2;
    // this.y = worldHeight/2;
    this.x = x;
    this.y = y;

    this.scaleFactor = 1;
    this.glowThickness = 100; // max for now with constraints on i, check below
    this.size = startSize;
    this.pulseRate= 0;
    this.stretchFactor = 0;
    this.diaGoal = 20;
    this.dia1 = 0; // affects x size (length of ellipse)

    //sound
    // this.warpSound = loadSound("assets/warp-sfx-6897.mp3") // load warp sound
    // this.warpSound.rate(1.5);
    // this.warpSound.setVolume(0.5);

  }

  update(){
    
  

    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    
    this.x = this.baseX + worldX; // makes it stay in position withotu moving it ** need to center it
    this.y = this.baseY + worldY;

    this.pulseRate += random(0.004,0.07); // to change pulse rate

    // stretch horizontally

   this.dia1 = lerp(this.dia1,this.diaGoal,0.1) // lerp for stretch

    if (d < this.size+40) {
      this.diaGoal = this.size+3; // the +3 is for the stretch and thena lso little ellipses
      //this.warpSound.play(); // playsound
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
    let pulse = sin(this.pulseRate)* 2.5 // plsing effect, *3 changes max and min size

      
 let glowScale = 0.2; // adjust this (0.1 to 0.3 looks good for small objects)
    
    // main ellipse changing fr transaprency glow effect
for (let i = 0; i < this.glowThickness; i+= 15) {
  this.transp = 255 - i *5;

  let d = dist(mouseX, mouseY, this.x, this.y);
  if (d < this.size+10) {
    fill(0, 255, 100, this.transp);
  } else {
    fill(0, 225, 255, this.transp);
  }

  //smaller glow layer growth
  let growAmount = i * glowScale;

  ellipse(this.x,this.y,this.size + pulse +growAmount + this.dia1,this.size + growAmount + pulse);
  
    }
    
    
    
    fill(0,225,255);
    noStroke();

    //color glitch green to blue on hover

    let d = dist(mouseX,mouseY,this.x,this.y);
      if (d < this.size+10) {
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
          
          if(random(0,1) < 0.2){
            ellipse(randX + x, randY + y, this.dia1*random(10,20) , this.size*random(1,3)); // random circles with slight changes // idk if it should stretch horizontally or vertically
          }
        }
      }
      
      //glitchy square that oround at all times (maybe add color effect)
      
      
      
     if(random(0,1) < 0.1) {
         square(this.x+random(this.x*-0.1,this.x*0.1), this.y+random(this.y*-0.1,this.y*0.1), random(this.size*0.5,this.size*10));
        fill(255,50,255,random(50,200));
      square(this.x+random(this.x*-0.1,this.x*0.1), this.y+random(this.y*-0.1,this.y*0.1), random(this.size*0.5,this.size*10));
     }
      //square(this.x+random(this.x*-0.1,this.x*0.1), this.y+random(this.y*-0.1,this.y*0.1), random(this.size*0.5,this.size*8));
      // fill(255,50,255,random(50,200));
      // square(this.x+random(this.x*-0.1,this.x*0.1), this.y+random(this.y*-0.1,this.y*0.1), random(this.size*0.5,this.size)*8);
    
   // console.log(pulse,this.size, this.glowThickness);

  }



}
let armsFixed = false;

// objects classes (hovering limbs)
class ArmsObj {
  constructor(startX,startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    //this.type = t;
    //this.dragging = false;
  }
  drag() {

    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

    if(mouseIsPressed == true && d < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
    //console.log(this.x,this.y,mouseX,mouseY,d)
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
  
    let imgX, imgY, imgW, imgH;
    //console.log(this.x,this.y,mouseX,mouseY)
    //console.log(this.baseX,this.baseY);
  
      imgX = this.x
      imgY = this.y + yOffset 
      imgW = 162 ;
      imgH = 220 ;
      let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj

      if (d < 100) {
        tint(255, 250*noLimb);
      
      } else {
        tint(255, 150*noLimb);
      }
      push();
      translate(-100,-144);
      image(armsImg, imgX, imgY, imgW, imgH);
      pop();

   //placement of obj
   if(mouseIsPressed == true && d < 100){
    this.x = mouseX;
    this.y = mouseY;
    if (mouseX >300 && mouseX < 500 && mouseY <300 && mouseX > 100){
      armsFixed = true;
    } 
   
  }

  }
  
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
    //console.log(worldX,worldY)

    if(armsFixed == true){
      // this.imgW = 58;
      // this.imgH = 68;
      this.x = 420;
      this.y = 210;
    }
    

    //console.log(this.baseX,this.baseY);
  }

}
let headFixed = false;

class HeadObj {
  constructor(startX,startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
  }
  drag() {
    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

    if(mouseIsPressed == true && d < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
    //console.log(this.x,this.y,mouseX,mouseY,d)
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
  
    let imgX, imgY, imgW, imgH;
    // console.log(headFixed,this.x,this.y)
    //console.log(this.baseX,this.baseY);
  
      imgX = this.x
      imgY = this.y + yOffset 
      imgW = 58 ;
      imgH = 68 ;
      let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj

      if (d < imgH && d < imgW) {
        tint(255, 250*noLimb);
       
      } else {
        tint(255, 150*noLimb);
      }
      push();
      translate(-35,-38);
      image(headImg, imgX, imgY, imgW, imgH);
      pop();
  
      //placement of obj
      if(mouseIsPressed == true && d < 100){
        this.x = mouseX;
        this.y = mouseY;
        if (mouseX >350 && mouseX < 450 && mouseY <120){
          headFixed = true;
        } 
      }
   
  }
  
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
    //console.log(worldX,worldY)
    if(headFixed == true){
      // this.imgW = 58;
      // this.imgH = 68;
      this.x = 407;
      this.y = 72;
    }

  
    //console.log(this.baseX,this.baseY);
  }

}
let legsFixed = false;
class LegsObj {
  constructor(startX,startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    //this.type = t;
    //this.dragging = false;
  }
  drag() {
    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 200);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

    if(mouseIsPressed == true && d < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
    //console.log(this.x,this.y,mouseX,mouseY,d)
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
  
    let imgX, imgY, imgW, imgH;

    //console.log(this.baseX,this.baseY);
  
      imgX = this.x
      imgY = this.y + yOffset 
      imgW = 224 //* 1.2;
      imgH = 300 //* 1.2;
      let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj

      if (d < 100) {
        tint(255, 255*noLimb);
      
      } else {
        tint(255, 150*noLimb);
      }
      push();
      translate(-130,-148);
      image(legsImg, imgX, imgY, imgW, imgH);
      pop();

      if(mouseIsPressed == true && d < 100){
        this.x = mouseX;
        this.y = mouseY;
        if (mouseX >350 && mouseX < 450 && mouseY <380 && mouseY > 200){
          legsFixed = true;
        } 
      }
   
  
  }
  
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
    //console.log(worldX,worldY)
    if(legsFixed == true){
      // this.imgW = 58;
      // this.imgH = 68;
      this.x = 415;
      this.y = 320;
    }

    //console.log(this.baseX,this.baseY);
  }

}

let torsoFixed = false;
class TorsoObj {
  constructor(startX,startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    //this.type = t;
    this.dragging = true;
  }
  drag() {


    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    
  
    if(mouseIsPressed == true && d < 100){
      if (this.dragging == true){
      this.x = mouseX;
      this.y = mouseY;
      }
  }
    //console.log(this.x,this.y,mouseX,mouseY,d)
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
  
    let imgX, imgY, imgW, imgH;

    //console.log(this.baseX,this.baseY);
    

      imgX = this.x
      imgY = this.y + yOffset 
      imgW = 80 ;
      imgH = 115;
      let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj

      if (d < 80) {
        tint(255, 250*noLimb);
        
      } else {
        tint(255, 150*noLimb);
      }
      push();
      translate(-50,-58);
      image(torsoImg, imgX, imgY, imgW, imgH);
      pop();

      if(mouseIsPressed == true && d < 100){
        this.x = mouseX;
        this.y = mouseY;
        if (mouseX >350 && mouseX < 450 && mouseY <300 && mouseY > 150){
          torsoFixed = true;
          this.dragging = false;
        } 
      }
      //console.log(noLimb)
   
  
  }
  
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
    //console.log(worldX,worldY)
    if(torsoFixed == true){
      // this.imgW = 58;
      // this.imgH = 68;
    
      this.x = 410;
      this.y = 165;
    }

    //console.log(this.baseX,this.baseY);
    //console.log("worlds: ",worldX,worldY,"mouse:", mouseX,mouseY);
  //console.log("p",photoCollected,"t",tapeCollected,"e",earphonesCollected);
  }

}


function ObjsCollected(){  // function for objs collected

  if (key == "c"&& worldX > -650 && worldX <-250 && worldY > -350 && worldY < -60){
    photoCollected = true;
    photoScale = 0;
  }

  if (key == "c"&& worldX > -1030 && worldX < 0 && worldY > -1002 && worldY < -800){
    tapeCollected = true;
    tapeScale = 0;
  }

  if (key == "c"&& worldX > -1200 && worldX <-700 && worldY > -1002 && worldY < -490){
    earphonesCollected = true;
    earphonesScale = 0;
  }
    
  if (photoCollected == true && tapeCollected == true && earphonesCollected == true){

  seeGoal2 = false; // keep flase if i want mouth moving
  phrasesTransp = 0;
  byeGoal2 = 0; // move out of canvas
  worldX = 0;
  worldY = 0;
  seeFull = 255;
  textSize(12);
  //console.log(seeGoal2);
  let byeWellDone = 0;
  text("Well done, you found all of my items!  Press P to connect wires from my body to my brain and heart.",25-byeWellDone,350,135);
  
  
  //done = true; for after wire

  // load images
  push();
  //translate(0+worldX,0+worldY);
  scale(1.2);
  
    let wiresImgX = 540;
    let wiresImgY = 270;
    let wiresImgL = 100;
    let wiresImgW = 110;

    //let d = dist(mouseX, mouseY, wiresImgX + wiresImgL / 2, wiresImgY + wiresImgW / 2);
  
   // if (mouseIsPressed && d < 60 && wiresTint > 0) {
    tint(255, wiresTint);
    image(wiresImg, wiresImgX, wiresImgY, wiresImgL, wiresImgW);
  // show wire preconnected
  noTint();
  pop();
    //}
  
 
 
}

console.log(mouseX,mouseY)


}




// function mousePressed(){
 
// }

let noSoulImg;
let noLimb = 1;

function limbsAssembled (){
  //add if in draw
 
  SBappear = true;
  noLimb = 0;
}

// WAIT TI WORKS OMG
// ok add other body parts and fix transparency problem
// problem, cant move object
//for brain and heart, when clicked if not loaded yet, --> says find my memories to restore (HINT: WASD);

//explore object (photos, kt tape, music note etc...)

function startText() {

}


let photoCollected = false;

class photos {
  constructor(startX,startY) {
    
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    this.wasPressed = false;
    //this.type = t;
    //this.dragging = false;
  }
  clicked() {
    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
  
    
  
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
  
   
        //photos;
      
      //photo#1
      noStroke();
      push();
      translate(this.x,this.y + yOffset);
      scale(photoScale);
      rotate(0.2);
              //main
          fill(70,20,20);
          strokeWeight(2.5);
        stroke(255,255);

        rect(-100,-135,200,260)
        noStroke()
        // top tiny
          fill(23);
        rect(5,-105,90,100);
        rect(-95,-105,90,100);
        
        //bottom tiny
        rect(5,5,90,100);
        rect(-95,5,90,100);
        
        //photo#2 (front)
          
          translate(-50,15);
          strokeWeight(2.5);
        stroke(255,255);
          rotate(-0.3);
        //second
        fill(82,23,23);
        rect(-100,-135,200,260)
          noStroke()
        // top tiny
          fill(25);
        rect(5,-105,90,100);
        rect(-95,-105,90,100);
        
        //bottom tiny
        rect(5,5,90,100);
        rect(-95,5,90,100);
        
              
    
      pop();
      // fill(255,0,0)
      // circle(this.x,this.y+yoffSet,10)
      
        
  }
  
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
  }

}

let tapeCollected = false;

class tape {
  constructor(startX,startY) {
    
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    //this.type = t;
    //this.dragging = false;
  }
  clicked() {
    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

    // if(mouseIsPressed == true && d < 100){
    //   tapeCollected = true;
    // }
    // //console.log(mouseX,mouseY,photoCollected,d,);
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
    //kt tape;
  
  fill(20);
  push();
  translate(this.x,this.y + yOffset);
  scale(tapeScale)
  strokeWeight(3);
  stroke(255,255);
    arc(400, 200, 200, 50, PI, 0, OPEN);
    arc(550, 250, 120, 50, 0, PI, OPEN);
    rect(300,200,100,50);
    rect(400,200,100,50); // connec tto top one
    rect(460,210,150,40);
    triangle(490,210,530,210,490,190);
    triangle(590,210,610,210,610,190);
    triangle(300,250,300,265,320,250);
    triangle(504,250,504,265,470,250);
    noStroke();
    fill(20,255);
    rect(302,198,200,51);
    rect(477,213,133,43,11);
      fill(20);
  triangle(301,240,301,260,322,248);
     fill(20);
    triangle(480,210,531,213,487,189);
  fill(20)
    triangle(589,212,609,212,610,192);
    triangle(505,250,506,265,471,249);

     fill(20,255);
    rect(302,198,200,51);
    rect(477,213,133,43,11);
      fill(20);
  triangle(301,240,301,260,322,248);
     fill(20);
    triangle(480,210,531,213,487,189);
  fill(20)
    triangle(589,212,609,212,610,192);
    triangle(505,250,506,265,471,249);
  
  //text
    fill(255,200);
  push();
  translate(325,210);
  //circle(0,0,10); ref for translation center
  rotate(-1.6);
    textSize(22);
    text("OK",-20,10);
  pop();
  
  pop();
  
  
  }
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
  }

}

let earphonesCollected = false;

class Earphones {
  constructor(startX,startY) {
    
    this.x = startX;
    this.y = startY;
    this.scaleFactor = 1;
    //this.type = t;
    //this.dragging = false;
  }
  clicked() {
    let sinCurveStepSize = frameCount / 15;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0, 100);
    let d = dist(mouseX,mouseY,this.x,this.y); // to see if mouse is on obj
    

   
  }
  display() {
    let sinCurveStepSize = frameCount / 20;
    let sinValue = sin(sinCurveStepSize);
    let yOffset = map(sinValue, -1, 1, 0,10);
   
  push();
  translate(this.x,this.y + yOffset);
    scale(earphonesScale);
    fill(255);
      ellipse(0,0,60,54);
      rect(10,0,20,70);
      ellipse(20,70,20,16);
  fill(0);
    ellipse(-10,0,10,8);
  //black part
  stroke(0);
    strokeWeight(6);
    line(10,-15,18,-6);
  
  push();
  translate(70,0)
  scale(-1,1);
    fill(255);
  noStroke();
      ellipse(0,0,60,54);
      rect(10,0,20,70);
      ellipse(20,70,20,16);
  fill(0);
    ellipse(-10,0,10,8);
  //black part
  stroke(0);
    strokeWeight(6);
    line(10,-15,18,-6);
  
  
  pop();
  
  //wires
  stroke(255);
  strokeWeight(3);
  line(20,75,33,150);
  line(50,75,41,150);
  line(37,200,50,250);
  noFill();
  ellipse(75,240,50,80);
  ellipse(75,244,40,70);
  ellipse(75,253,30,50);
  noStroke();
  fill(255);
  rect(29,150,16,60);
  
  
  pop();
  
  
  
  
  }
  update(){
    // this.x = this.baseX + worldX; // for exploration
    // this.y = this.baseY + worldY;
  }

}

function mousePressed() {
  photosObj.clicked();
  tapeObj.clicked();
  earphonesObj.clicked();
}
