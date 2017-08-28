function LowerMenu(x, y, width, height, color, parent) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.playBtn = new ImageButton(x + (width*0.03), y + (height/3), 70, 70, "../assets/play.png", parent, 'imageButton', 'playbtn', exercise.play.bind(exercise));
    this.pauseBtn = new ImageButton(x + (width*0.04), y + (height/3), 70, 70, "../assets/pause.png", parent, 'imageButton', 'pausebtn', exercise.pause.bind(exercise));
    this.varBtn = new ImageButton(x + (width*0.05), y + (height/3), 70, 70, "../assets/changeExercise.png", parent, 'imageButton', 'varbtn', function(){ return toggleMenu('varbtn', 'expRightMenu'); });
    this.expBtn = new ImageButton(x + (width*0.06), y + (height/3), 70, 70, "../assets/variables.png", parent, 'imageButton', 'expbtn', function(){ return toggleMenu('expbtn', 'varRightMenu'); });
}

LowerMenu.prototype.display = function(potentialEnergy, kineticEnergy, elasticEnergy, mechanicEnergy, initialEnergy){
    let color = this.color;
    let menuColor = color;
    fill(menuColor[0], menuColor[1], menuColor[2]);
    rect(this.x, this.y, this.width, this.height);
    this.bars(potentialEnergy, kineticEnergy, elasticEnergy, mechanicEnergy, initialEnergy);
};

LowerMenu.prototype.bars = function (potentialEnergy, kineticEnergy, elasticEnergy, mechanicalEnergy, initialEnergy) {
    let actualPotential = round(potentialEnergy) || 0;
    let actualKinetic = round(kineticEnergy) || 0;
    let actualElastic = round(elasticEnergy) || 0;
    let actualMechanical = round(mechanicalEnergy) || 0;
    let actualInitial = round(initialEnergy) || 0;

    let bar1Length = map(actualPotential, 0, actualInitial, 0, 500);
    let bar2Length = map(actualKinetic, 0, actualInitial, 0, 500);
    let bar3Length = map(actualElastic, 0, actualInitial, 0, 500);
    let bar4Length = map(actualMechanical, 0, actualInitial, 0, 500);

    let barSeparation = 30;
    let stringSeparation = 15;
    let stringSize = 16;
    let barHeight = 20;
    let middleLowerMenuX = this.x + this.width/2;
    let middleLowerMenuY = this.y + this.height/2;
    push();
    //bar 1
    noStroke();
    fill(255,0,0);
    rect(middleLowerMenuX, middleLowerMenuY - barSeparation, bar1Length, barHeight);
    this.barText("Potential Energy: " + actualPotential + " N", stringSize,
        middleLowerMenuX, middleLowerMenuY - barSeparation + stringSeparation);
    //bar 2
    fill(0,255,0);
    rect(middleLowerMenuX, middleLowerMenuY, bar2Length, barHeight);
    this.barText("Kinetic Energy: " + actualKinetic + " N", stringSize,
        middleLowerMenuX, middleLowerMenuY + stringSeparation);
    //bar 3
    fill(0,0,255);
    rect(middleLowerMenuX, middleLowerMenuY + barSeparation, bar3Length, barHeight);
    this.barText("Elastic Energy: " + actualElastic + " N", stringSize,
        middleLowerMenuX, middleLowerMenuY + barSeparation+ stringSeparation);
    //bar 4
    fill(200,200,200);
    rect(middleLowerMenuX, middleLowerMenuY + 2*barSeparation, bar4Length, barHeight);
    this.barText("Mechanical Energy: " + actualMechanical + " N", stringSize,
        middleLowerMenuX, middleLowerMenuY + 2*barSeparation+ stringSeparation);
    pop();
};

LowerMenu.prototype.barText = function(string, stringSize, x, y){
    push();
    fill(0);
    textSize(stringSize);
    //textStyle(BOLD);
    stroke(0);
    text(string,x, y);
    pop();
};