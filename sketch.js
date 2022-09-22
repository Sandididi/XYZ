let bgIndex = 0;
let backgroundImgs;
let mobileBGImgs;
let cam;
let BGmodel;
let boxs;
let flower;

let v=[];
let rows = 6, cols=10;
let roangle=0;




function preload() {
  backgroundImgs = [
    loadImage('Img/050.jpg'),
    loadImage('Img/051.jpg'),
    loadImage('Img/052.jpg'),
    loadImage('Img/053.jpg'),
    loadImage('Img/054.jpg'),
    loadImage('Img/055.jpg'),
    loadImage('Img/056.jpg'),
    loadImage('Img/057.jpg'),
    loadImage('Img/058.jpg'),
    loadImage('Img/059.jpg'),
    loadImage('Img/060.jpg'),
    loadImage('Img/061.jpg'),
    loadImage('Img/062.jpg'),
    loadImage('Img/063.jpg'),
    loadImage('Img/064.jpg'),
    loadImage('Img/065.jpg'),
    loadImage('Img/066.jpg'),
    loadImage('Img/067.jpg'),
    loadImage('Img/068.jpg'),
    loadImage('Img/069.jpg'),
    loadImage('Img/070.jpg'),
    loadImage('Img/071.jpg'),
    loadImage('Img/072.jpg'),
    loadImage('Img/073.jpg'),
    loadImage('Img/074.jpg'),
    loadImage('Img/075.jpg'),
    loadImage('Img/076.jpg'),
    loadImage('Img/077.jpg'),
    loadImage('Img/078.jpg'),
    loadImage('Img/079.jpg'),
    loadImage('Img/080.jpg'),
  ];
  mobileBGImgs = [
    loadImage('Img/050.jpg'),
    loadImage('Img/051.jpg'),
    loadImage('Img/052.jpg'),
    loadImage('Img/053.jpg'),
    loadImage('Img/054.jpg'),
    loadImage('Img/055.jpg'),
    loadImage('Img/056.jpg'),
    loadImage('Img/057.jpg'),
    loadImage('Img/058.jpg'),
    loadImage('Img/059.jpg'),
    loadImage('Img/060.jpg'),
    loadImage('Img/061.jpg'),
    loadImage('Img/062.jpg'),
    loadImage('Img/063.jpg'),
    loadImage('Img/064.jpg'),
    loadImage('Img/065.jpg'),
    loadImage('Img/066.jpg'),
    loadImage('Img/067.jpg'),
    loadImage('Img/068.jpg'),
    loadImage('Img/069.jpg'),
    loadImage('Img/070.jpg'),
    loadImage('Img/071.jpg'),
    loadImage('Img/072.jpg'),
    loadImage('Img/073.jpg'),
    loadImage('Img/074.jpg'),
    loadImage('Img/075.jpg'),
    loadImage('Img/076.jpg'),
    loadImage('Img/077.jpg'),
    loadImage('Img/078.jpg'),
    loadImage('Img/079.jpg'),
    loadImage('Img/080.jpg'),
  ];

  boxs = loadModel('Img/cube.obj');
  BGmodel = loadModel('Img/BG.obj');
  flower = loadModel('Img/flower.obj');
}


function setup() {
  colorMode(HSB,360,255,255);
  angleMode(DEGREES);
  var canv = createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  camView = createCamera();
  // camView.setPosition(0, 0, 0);
  // camView.lookAt(0, 0, 0);
  
  camView.ortho(windowWidth / 2, -windowWidth / 2, -windowHeight / 2, windowHeight / 2, 0, 4000);

  cam = createCapture(VIDEO);
  cam.hide();
  canv.parent("canvas-container");
  stroke(25,150,255);
  strokeWeight(1);
  textureMode(NORMAL);
}

function draw() {
  background(160,100,255);
  moveFrame();
  
  // camView.setPosition(0, 0, 1600);
  // camView.lookAt(0, 0, -1000);

  //orbitControl(8,8);
  roangle++;
  push();
  rotateX(-30);
  rotateY(-roangle);
  rotateZ(roangle/3);
  texture(cam);
  push();
  rotateX(90);
  rows=6+round(mouseX/360);
  cols=10+round(mouseY/180);
  for(theta = 0; theta<rows; theta+=1){
    v.push([]);
    for(let phi=0; phi<cols; phi+=1){
      let r = (60*pow(abs(sin(5/2*phi*360/cols)),1)+300)*theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      // let bumpin = 2*pow(r/100,2)*sin(phi*12);
      // let z = 300*pow(Math.E,-0.1*pow(abs(r/100),1.5))*pow(abs(r/100),0.5)-180+bumpin;
      let z = vShape(300,r/100,0.5,0.1,1.5)-180+bumpin(1,r/100,12,phi*360/cols);
        let pos = createVector(x,y,z);
        v[theta].push(pos);
    }
  }
  for(let theta = 0; theta<v.length; theta++){
    for(let phi = 0; phi<v[theta].length; phi++){
      tint(340,130-theta*10,205+theta*10);
      if(theta<v.length-1 && phi<v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z,0,1);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z,0,0);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z,1,0);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z,1,1);
        endShape(CLOSE);
      }else if(theta<v.length-1 && phi == v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z,0,1);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z,1,1);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z,1,0);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z,0,0);
        endShape(CLOSE);
      }
    }
  }
  v = [];
  pop();
  

  push();
  
  rotateX(120);
  noStroke();
  scale(72+(mouseX/60));
  smooth();
  translate(0,1,-3);
  tint(360,100,255);
  
  model(flower);
  pop();
  push();
  rotateY(80);
  rotateZ(30);
  rotateX(120);
  noStroke();
  scale(65+(mouseX/60));
  smooth();
  translate(0,1,-3);
  tint(320,100,255);
  model(flower);
  pop();
  push();
  rotateY(-80);
  rotateZ(0);
  rotateX(80);
  noStroke();
  scale(80+(mouseX/60));
  smooth();
  translate(0,1.5,-1);
  tint(350,100,255);
  model(flower);
  pop();

  pop();
  //Size 16:9  9:16
  var screenH = windowHeight/2;
  var screenW = windowWidth/2;

  push();
  if(screenH>screenW){
    texture(mobileBGImgs[bgIndex]);
  }else{
    texture(backgroundImgs[bgIndex]);
  }
  translate(0,0,-1000);
  scale(screenW,screenH,10);
  rotateX(90);
  noStroke();
  model(BGmodel);
  pop();
  
  
}
function vShape(A,r,a,b,c){
  return A*pow(Math.E,-b*pow(abs(r),c))*pow(abs(r),a);
}
function bumpin(A,r,f,angle){
  return 1 + A*pow(r,2)*sin(f*angle);
}

//序列
function moveFrame() {
  bgIndex++;
  if(bgIndex > backgroundImgs.length-1){
    bgIndex=0;
  }
}
