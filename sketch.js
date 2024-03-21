var confLocs = []; //store location of each confetti
var confTheta = []; //store initial angle of each confetti
var heightSlider;
var heightReset;
var speedReset;
var checkbox;
function setup() {
    createCanvas(900, 800, WEBGL);
    
    //Further improvement
    
    //height of the cubes
    heightSlider = createSlider(0,  300, 100);
    heightSlider.position(10, height - 150);
    
    heightReset = createButton('Reset Height');
    heightReset.position(10, height - 130);
    heightReset.mousePressed(resetHeight);
    
    //speed of the sin wave
    speedSlider = createSlider(0,  10, 1, 0.5);
    speedSlider.position(10, height - 110);
    
    speedReset = createButton('Reset Speed');
    speedReset.position(10, height - 90);
    speedReset.mousePressed(resetSpeed);
    
    //change the texture
    checkbox = createCheckbox('New material', false);
    checkbox.position(10, height - 60);
    checkbox.changed(newMaterial);
    

    // step 5
    while(confLocs.length < 200){
        confLocs.push(new createVector(random(-500, 500),   // X
                                       random(-800, 0),     // Y
                                       random(-500, 500))); // Z
        confTheta.push(0,360);
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    // step 2
    if(checkbox.checked()){
        newMaterial();
    }else{
        normalMaterial();
        stroke(0);
        strokeWeight(2);
    }
  
     // step 1
    for(var x=-400; x<400; x+=50){
        for(var z=-400; z<400; z+=50){
          push(); 
          translate(x,0,z);
           // step 3
          var distance = dist(x, 0, z, 0, 0, 0) + frameCount * speedSlider.value();
          var length = map(sin(distance+frameCount), -1, 1, heightSlider.value(), 300);
          box(50,length,50);
          pop(); 
        }
    }
    
    //step 4
    var locX = cos(frameCount/2) * height * 1.5;
    var locZ = sin(frameCount/2) * height * 1.5;
    // step 1
    camera(locX, -600, locZ, 0, 0, 0, 0, 1, 0);
    
  
    confetti();
}

 // step 6
function confetti(){
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    for(var i = 0; i < confLocs.length ; i++){
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);  
        plane(15, 15);
        confLocs[i].y++;
        confTheta[i] += 10;
        pop();
    
       if(confLocs[i].y >= 0){
            confLocs[i].y = -800;
        }
    }
}


function resetHeight(){
    heightSlider.value(100);
}

function resetSpeed(){
    speedSlider.value(1);
}


function newMaterial(){
    background(167, 199, 231);
    ambientMaterial(148, 0, 211);
    ambientLight(255, 255, 255); 
    pointLight(255, 255, 255, 0, 0, 50);
    
}
