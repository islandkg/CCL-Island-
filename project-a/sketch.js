// urchin variables
let transparency = 150;
let see = 0; // 1 = yes, 0 = no
let x, y;
let size = 20;
let angle = 25;

//for flash
let flashTransp = 0; 
let flashDuration = 10; 
let flashActive = false; 
let flashCount = 0;
let flashCountMax;
let seeFlash = 1;
let lightTransp = 0;

let crackCount = 0; // crack

let phoneTransp = 0;
let handSize = 0.6;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
  drawDisplay();
  drawBubbles();
  drawBG();
  //urchin whereabouts
  x = width / 2
  y = height / 2;
  flashCountMax = random(30, 60);
}

function draw() {
  //for flash
  //console.log(flashActive);
  drawDisplay();
  drawBubbles();
  drawUrchin();
   let fogTransp = map(sin(frameCount/6),-1,1,0,60);
  
   if (size == 300){
    noStroke();
    fill(255,fogTransp);
    circle(x,y,400); // fix placement of fog fix border and make size
  }
  drawBG();

  //people
  if (size < 300){
    drawPerson(-380, 0, 0, 0, 0, 0); // bald
  drawPerson(-300, 20, 0, 255, 255, 0); // short bob
  drawPerson(290, 30, 255, 0, 255, 0); // long bob
  drawPerson(370, 5, 0, 255, 0, 255); // buns
  } 
  if (size < 300 && phoneTransp >2){
    flash();
  }  
  
  //console.log(phoneTransp)

  // hand
  noStroke();
  fill(0, 200);

  push();
  translate(mouseX, mouseY);
  scale(handSize); 

  // palm
  rect(-15 / 2, -15 / 2, 15, 15);

  // thumb
  quad(-15 / 2, -15 / 2, 15 - 15 / 2, 15 - 15 / 2, -10, 55, -50, 60);

  // fingers
  quad(20, 40, 40, 40, 40, 70, 0, 100);
  quad(-50, 60, -20, 45, 40, 70, 20, 140);
  triangle(20, 140, -50, 60, -50, 140);
  quad(20, 140, -50, 140, -300, 900, 300, 900);

  pop();
  
  drawPhone();
  

  
if (size < 300) {
  fogTransp = 0;
}
  // flash handling on mouse press
  if (mouseIsPressed && phoneTransp >2) {
    flashActive = true; // flash goes off
    flashTransp = 180; // set transparency
    flashCount++;
    size += 1;
    //fill(255, 255, 0,lightTransp);
    stroke(255,255,0,flashTransp);


    // Cracks drawing logic when mouse is pressed
    if (crackCount < 30) {
      stroke(255, 255);
      let cx = map(random(0, 1), 0, 1, 40, 760);
      let cy = map(random(0, 1), 0, 1, 0, 450);
      let angle = random(PI * 2);
      let crackLength = random(10, 40);
      let noiseStartPoint = random(200);
      
      drawCrack(cx, cy, angle, crackLength, noiseStartPoint);
      crackCount++;
    }
  }
}

function drawBG() {
  noStroke();
  fill(9, 32, 49);
  rect(0, 0, 40, 450);
  rect(760, 0, 800, 450);
  fill(3, 25, 42);
  triangle(0, 450, 40, 450, 0, 500);
  triangle(800, 450, 760, 450, 800, 500);
  fill(2, 38, 59);
  quad(40, 450, 760, 450, 800, 500, 0, 500);
}



function drawCrack(cx, cy, angle, crackLength, noiseStartPoint) {
  let linex = cx, liney = cy;

  for (let i = 0; i < crackLength; i++) {
    let nx = linex + cos(angle) * 5; // for direction x
    let ny = liney + sin(angle) * 5; // same for y

    let n = noise(noiseStartPoint + i * 0.05) - 0.5; // noise for randomness
    nx += n * 20;
    ny += n * 20;

    if (nx >= 0 && nx <= width && ny >= 0 && ny <= height) {
      line(linex, liney, nx, ny);
      linex = nx;
      liney = ny;
    }
  }
}

// flash effect function
function flash() {
  if (flashActive == true) {
    fill(255, flashTransp);
    rect(0, 0, width, height); 

    if (flashTransp > 0) {
      flashTransp -= 5;
    } else if (flashTransp < 0) {
      flashActive = false; // stop flash
    }
  }
}

// key press to put oon phone transparency
function keyPressed() {
  if (key === 's') {
    phoneTransp = 255;
  } else if (key === 'h') {
    phoneTransp = 0;
  }
}

// function for drawing the person figures
function drawPerson(x, y, cap, bob, skirt, spacebuns) {
  push();

  fill(0);
  translate(width / 2, height / 2);
  ellipse(x, y, 60, 80);
  ellipse(x, y + 120, 100, 160);
  rect(x - 40, 180, 30, 100);
  rect(x + 10, 180, 30, 100);
  noStroke();
  fill(0, cap);
  arc(x, y + 40, 80, 160, PI, 0);
  fill(0, bob);
  arc(x, y, 80, 100, PI, 0);
  fill(0, skirt);
  quad(x - 40, y + 180, x + 40, y + 180, x + 60, y + 210, x - 60, y + 210);
  fill(0, spacebuns);
  circle(x - 25, y - 25, 30);
  circle(x + 25, y - 25, 30);

  pop();
  
}

// function to draw phone
function drawPhone() {
  push();

  translate(mouseX, mouseY - 150);
  scale(0.6);
  stroke(0, phoneTransp);
  strokeWeight(12);
  noFill();
  rect(0, 0, 160, 300, PI * 3);
  fill(0, phoneTransp);
  rect(0, 0, 160, 20, PI * 3);
  rect(0, 270, 160, 30, PI * 3);
  noFill();
  stroke(255, phoneTransp);
  strokeWeight(10);
  fill(255, phoneTransp);
  circle(80, 285, 18);
  fill(0, phoneTransp);
  strokeWeight(0);
  circle(80, 285, 25); // why so small
  fill(255, phoneTransp);
  circle(80, 285, 23);

  fill(255, phoneTransp);
  strokeWeight(3);
  line(50, 10, 110, 10);
  circle(40, 10, 3);
  circle(120, 10, 3);

  // flashes
  if (flashActive == true && size < 300 && phoneTransp > 2) {
    stroke(255, 225, 20, flashTransp);
    strokeWeight(5);
    line(160, -10, 175, -25);
    line(174, 6, 195, 6);
    line(145, -15, 145, -35);
  }

  pop();
}

function drawDisplay() {
   push();
    noStroke();
    translate(40,0);
    //color for bg of display on top bright
  for (let i = 0; i <100; i +=4) {
    
    let darkPace = 1;
    
     if (i > 50){
      // darkPace = 1.01;
       i = i*1.05;
    }
    
     fill(80-(i/1.3), 190-i*1.4, 247-i*1.4);
    // background of display
    rect(0,0+i*1.5,720,450);
    //console.log(i)
    
    
  }
  
   for (let i = 50; i <350; i +=5) {
   
     fill(80-(i/1.3), 140-i/2.4, 198-i/2.4);
    // background of display
    rect(0,0+i*1.5,720,450);  
    
  }
  
 
  //furthest mountains in back
      push();
    translate(140,-80);
      beginShape();
        fill(10, 76, 133);
        vertex(-150,380);
        vertex(0,450);
        vertex(750,340);
        vertex(710,360);
        vertex(650,300);
        vertex(650,290);
        vertex(635,304);
        // vertex(585,310);
        vertex(590,300);
        vertex(565,240);
        vertex(515,250);
        vertex(500,270);
        vertex(445,284);
        vertex(435,280);
        vertex(400,250);
        // vertex(355,265);
        vertex(320,295);
        vertex(300,270);
        vertex(286,260);
        vertex(250,280);
        // vertex(230,263);
        vertex(160,274);
        vertex(140,260);
        // vertex(100,255);
        vertex(80,270);
        vertex(50,260);
        vertex(0,280);
        vertex(-40,250);
        vertex(-100,290);
        vertex(-120,270);
        vertex(-150,250);

    endShape();
   pop();
  
  
    //vertex mountain shape in back closest
    beginShape();
      fill(10, 64, 110)
      vertex(0,300);
      vertex(0,450);
      vertex(720,450);
      vertex(720,350);
      vertex(690,300);
      vertex(650,320);
      vertex(615,324);
      vertex(585,310);
      vertex(560,300);
      vertex(535,260);
      vertex(515,250);
      vertex(500,270);
      vertex(475,260);
      vertex(435,280);
      vertex(400,250);
      vertex(355,265);
      vertex(320,295);
      vertex(300,270);
      vertex(286,260);
      vertex(250,280);
      vertex(230,263);
      vertex(200,284);
      vertex(140,260);
      vertex(100,255);
      vertex(80,240);
      vertex(50,250)


    endShape();

      push(); //rocks on right
  translate(100,20);
        fill(9,43,75);
        ellipse(670,220,180,100);
        ellipse(560,275,150,100);
        rect(550,230,1200,300);
        ellipse(630,290,150,200);  
        ellipse(490,340,160,100);
        ellipse(480,440,300,200);
        ellipse(420,450,300,100);

    pop();
  
   push(); //rocks on left
      translate(width-350,0);
      scale(-1,1);
        fill(9,43,75);
        ellipse(670,220,180,100);
        ellipse(560,275,150,100);
        rect(550,230,1200,300);
        ellipse(630,290,150,200);  
        ellipse(490,340,160,100);
        ellipse(480,440,300,200);
        ellipse(420,450,300,100);

    pop();
  
  
  pop();
  
}
function drawBubbles() {
  for (let by = 0; by < 440; by += random(height/40, height/180)) {
    for (let bx = 0; bx < width-20; bx += random(width/20, width/2)) {
       //for (let i = 0; i < 2; i += random(1, 2)) {
        // let bx = 200;
        //let by = 200;
        let bstroke = 2;
        let distance = 1;
        let bsize = 20;
        let smallchange = 3; // for the little white bubble size
        let transparency = 200;
        bstroke = random(0.1, 3);
        bsize = random(1, 20);
        distance = random(bsize / 4, bsize / 2); // white little circle
        smallchange = random(5, 8);
        transparency = random(10, 30);
        strokeWeight(bstroke);
        stroke(200, 226, 255, random(10,60));
        fill(150, 200, 250, transparency / 2); // main cirle
        circle(bx, by, bsize/2);
        fill(255, 50);
        noStroke();
        circle(bx - distance * random(0.1,0.5), by - distance * random(0.1,0.5),(bsize * 1) / smallchange); // white circle top
        circle(bx + distance * random(0.1,0.5), by + distance * random(0.1,0.5),((bsize * 1) / smallchange) * 2);
    //}
  }
}
}

function drawUrchin(){
  noStroke();
  fill(0, transparency);

  // Moving creature with noise
  let noiseValue = noise(frameCount / 200);
  x = map(noiseValue, 0, 1, 50, 750);
  let noiseValue2 = noise(10 + frameCount / 200);
  y = map(noiseValue2, 0, 1, 50, 450);
  
  // break glass, size up, people leave
    if (flashCount > flashCountMax){ // if flashCountMac aquired --> break glass
      size = 300;
    }

  push(); // to draw creatyure
    translate(x, y);
    let lclX = 0;
    let lclY = 0;
    rotate(angle);
    angle+= 5;
    for (let i = 0; i < size*6; i += size*0.18) {
      let sinValue = sin(frameCount / 50 + i);
      let y2 = map(sinValue, -1, 1, size / 1.01, size * 1.6);
      let x2 = i*0.8; // possible change of thing with flash
      fill(100, 29, 49, transparency);
      circle(x2 - size / 10, y2 - size * 1.2, size*0.25);

  }
    noStroke();
    fill(55, 19, 39,transparency);
    circle(lclX, lclY, size);
    fill(120,50,70, transparency-200);
    circle(lclX, lclY, size / 2);
 // fill(0, transparency);
  //line(lclX,lclY,lclX+100,lclY+100)
  
  pop();
  
  
  
  fill(200, 200, 200);
  //circle(mouseX, mouseY, 10);

  if (abs(mouseX - x) < 100 && abs(mouseY - y) < 100) {
    transparency = transparency / 1.08;
    see = 1;
  } else {
    see = 0;
  }

  if (see == 1) {
    transparency = transparency - 1.3;
  } else if (see == 0) {
    transparency = 2 + transparency + 1.2;
  }
}


// fogging up glass
function fogUpGlass() {
 

}