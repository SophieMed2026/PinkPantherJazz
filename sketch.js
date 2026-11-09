let fluteX = 222;
let fluteY = 50;

let font;

let testFlute;
let testFlute2;
let bgMusic;

let testFluteArray = [];
let trumpetSounds = [];
let pianoSounds = [];

let randomNum;
let fluteActive = false; // true only while the flute is being held

let bgColor;
let lineColor;

async function setup() {
  createCanvas(415, 600);
  colorMode(RGB);
  angleMode(DEGREES);

  bgColor = color(243, 184, 196);
  lineColor = color(168, 80, 106);

  // font (wrapped so a font problem can't stop the sounds from loading)
  try {
    font = await loadFont("Desigers.TTF");
    textFont(font);
  } catch (e) {
    console.log("Font failed to load");
  }
  textSize(50);

  // flute
  testFlute = await loadSound("testFlute.wav");
  testFlute2 = await loadSound("testFlute2.wav");
  bgMusic = await loadSound("jazz_drum_loop.wav");

  testFluteArray.push(testFlute);
  testFluteArray.push(testFlute2);

  // trumpet
  let trumpet1 = await loadSound("trumpet 1.mp3");
  let trumpet2 = await loadSound("trumpet2.mp3");
  trumpetSounds.push(trumpet1);
  trumpetSounds.push(trumpet2);

  // piano
  let piano1 = await loadSound("387382__sss_samples__jazz-e-piano.wav");
  let piano2 = await loadSound("571370__szegvari__jazz-piano-and-orchestra-ms.mp3");
  pianoSounds.push(piano1);
  pianoSounds.push(piano2);
}

function draw() {
  background(bgColor);
  // title: bottom left
  drawTitle();
  //background(251,174,174);

  //bgMusic.play();
  //bgMusic.loop();

  // draw and rotate the flute
  push();
  translate(fluteX, fluteY);
  rotate(10);
  drawFlute(0, 0);
  pop();

  // for sophie's trumpet and piano
  stroke(lineColor);
  strokeWeight(3);
  noFill();

  drawTrumpet();
  drawPiano();

  // jairo's sax
  push();
  translate(-120, -100); // negative x = left, negative y = up
  drawSax();
  pop();

  // FLUTE opacity and background change
  if (
    mouseIsPressed &&
    219 < mouseX &&
    mouseX < 352 &&
    50 < mouseY &&
    mouseY < 87
  ) {
    background(253, 103, 174, 50);
    //print(randomNum);
    // paw image
  }
}

// plays sound when specific instrument is selected
function mousePressed() {
  userStartAudio(); // wakes up the audio on the first click

  //print(floor(mouseX) + ", " + floor(mouseY));

  // flute: plays and loops while held
  if (219 < mouseX && mouseX < 352 && 50 < mouseY && mouseY < 87) {
    randomNum = floor(random(0, 2));
    testFluteArray[randomNum].play();
    testFluteArray[randomNum].loop();
    fluteActive = true;
  }

  // trumpet: random sound, plays the whole thing
  if (33 < mouseX && mouseX < 140 && 45 < mouseY && mouseY < 109) {
    random(trumpetSounds).play();
  }

  // piano: random sound, plays the whole thing
  if (255 < mouseX && mouseX < 329 && 129 < mouseY && mouseY < 204) {
    random(pianoSounds).play();
  }
}

// only the flute stops when you let go
function mouseReleased() {
  if (fluteActive) {
    testFluteArray[randomNum].stop();
    fluteActive = false;
  }
}

function drawTitle() {
  push();
  noStroke();
  fill(lineColor);
  textSize(50);
  text("Pink", 10, 450, width);
  text("Jazz", 50, 500, width);
  pop();
}

// OFFICIAL FLUTE FUNCTION
function drawFlute(fluteX, fluteY) {
  push();
  fill(bgColor);
  stroke(lineColor);
  strokeWeight(2.5);
  rect(fluteX, fluteY, 130, 10);
  rect(fluteX, fluteY, 50, 10);
  rect(fluteX, fluteY, 97, 10);

  // mouthpiece
  // 222, 42
  //fill(243,184,196);
  ellipse(fluteX + 21, fluteY, 25, 8); // +21, +0

  // middle keys
  let keyX = fluteX + 60; // +60
  for (let i = 0; i < 5; i++) {
    ellipse(keyX, fluteY, 7, 4);
    keyX += 7;
  }

  // end keys
  keyX = fluteX + 106; // +106
  for (let i = 0; i < 3; i++) {
    ellipse(keyX, fluteY, 7, 4);
    keyX += 7;
  }

  pop();
}

// TRUMPET
function drawTrumpet() {
  push();

  // mouthpiece
  beginShape();
  vertex(33, 101);
  vertex(41, 98);
  vertex(44, 105);
  vertex(37, 109);
  endShape(CLOSE);

  //line between the mouthpiece and the valves
  line(41, 100, 70, 86);
  line(43, 103, 72, 90);

  // valve block
  beginShape();
  vertex(67, 79);
  vertex(90, 68);
  vertex(99, 86);
  vertex(75, 97);
  endShape(CLOSE);

  // three buttons sticking out of the valve block
  line(72, 76, 70, 71);
  line(68, 72, 72, 70);
  line(78, 73, 76, 68);
  line(74, 69, 78, 67);
  line(85, 70, 83, 65);
  line(81, 66, 85, 64);

  // connect the dots from the valve block out to the opening
  beginShape();
  vertex(93, 74);
  vertex(103, 69);
  vertex(111, 63);
  vertex(118, 57);
  vertex(122, 51);
  vertex(125, 45);
  endShape();

  // bottom edge of trumpet
  beginShape();
  vertex(96, 80);
  vertex(106, 76);
  vertex(116, 73);
  vertex(124, 72);
  vertex(132, 72);
  vertex(139, 74);
  endShape();

  // the end of the trumpet where the sound comes out of
  beginShape();
  vertex(125, 45);
  vertex(130, 48);
  vertex(136, 57);
  vertex(140, 68);
  vertex(139, 74);
  vertex(134, 71);
  vertex(128, 61);
  vertex(124, 51);
  endShape(CLOSE);

  pop();
}

// piano
function drawPiano() {
  push();

  // outline of all three white keys
  beginShape();
  vertex(257, 129);
  vertex(329, 131);
  vertex(327, 204);
  vertex(255, 202);
  endShape(CLOSE);

  // lines between the white keys
  line(281, 130, 279, 203);
  line(305, 130, 303, 203);

  // black keys
  fill(168, 80, 106, 190);

  // first black key
  beginShape();
  vertex(275, 130); // top left corner
  vertex(287, 130); // top right corner
  vertex(286, 174); // bottom right corner
  vertex(274, 174); // bottom left corner
  endShape(CLOSE);

  // second black key
  beginShape();
  vertex(299, 130); // top left corner
  vertex(311, 131); // top right corner
  vertex(310, 175); // bottom right corner
  vertex(298, 174); // bottom left corner
  endShape(CLOSE);

  pop();
}

function drawSax() {
  fill(243, 184, 196);

  stroke(lineColor);
  strokeWeight(2);

  beginShape();
  ellipse(172, 336, 60, 40);
  vertex(157, 354);
  vertex(170, 392);
  vertex(200, 404);
  vertex(217, 402);
  vertex(235, 376);
  vertex(238, 348);
  vertex(237, 278);
  vertex(248, 256);
  vertex(279, 247);
  vertex(276, 242);
  vertex(239, 250);
  vertex(221, 277);
  vertex(212, 343);
  vertex(211, 363);
  vertex(213, 366);
  vertex(198, 347);
  endShape();

  fill(181, 91, 109);
  ellipse(172, 332, 50, 20);
  circle(192, 358, 15);
  circle(204, 375, 15);
  circle(223, 354, 15);
  circle(226, 333, 15);
  circle(227, 312, 15);
  circle(228, 292, 15);

  ellipse(289, 243, 30, 15);
}
