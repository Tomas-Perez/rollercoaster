function LowerMenu(x, y, width, height, color, parent) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.playBtn = new ImageButton(x + (width*0.03), y + (height/3), 70, 70, "../assets/play.png", parent, 'imageButton', 'playbtn', exercise.play.bind(exercise));
    this.pauseBtn = new ImageButton(x + (width*0.04), y + (height/3), 70, 70, "../assets/pause.png", parent, 'imageButton', 'pausebtn', exercise.pause.bind(exercise));
    this.varBtn = new ImageButton(x + (width*0.05), y + (height/3), 70, 70, "../assets/changeExercise.png", parent, 'imageButton', 'varbtn', toggleExpMenu);
    this.expBtn = new ImageButton(x + (width*0.06), y + (height/3), 70, 70, "../assets/variables.png", parent, 'imageButton', 'expbtn', toggleVarMenu);
    // energy variables
    this.initialEnergy = exercise.energy.actualEnergy;
    this.potentialEnergy = exercise.energy.getPotential();
    this.kineticEnergy = exercise.energy.getKinetic();
    this.elasticEnergy = exercise.energy.getElastic();
    this.totalEnergy = exercise.energy.actualEnergy;
}

LowerMenu.prototype.display = function(){
    let menuColor = this.color;
    fill(menuColor[0], menuColor[1], menuColor[2]);
    rect(this.x, this.y, this.width, this.height);
    this.potentialEnergy = exercise.energy.getPotential();
    this.kineticEnergy = exercise.energy.getKinetic();
    this.elasticEnergy = exercise.energy.getElastic();
    this.totalEnergy = exercise.energy.actualEnergy;
    let bar1Length = map(this.potentialEnergy, 0, this.initialEnergy, 0, 500);
    let bar2Length = map(this.kineticEnergy, 0, this.initialEnergy, 0, 500);
    let bar3Length = map(this.elasticEnergy, 0, this.initialEnergy, 0, 500);
    let bar4length = map(this.totalEnergy, 0, this.initialEnergy, 0, 500);
    this.bars(bar1Length ,bar2Length,bar3Length, bar4length);
};

LowerMenu.prototype.bars = function (bar1length, bar2length, bar3length, bar4length) {
    let barSeparation = 30;
    let stringSeparation = 15;
    let stringSize = 16;
    let barHeight = 20;
    let middleLowerMenuX = this.x + this.width/2;
    let middleLowerMenuY = this.y + this.height/2;
    //bar 1
    stroke(255);
    fill(255,0,0);
    rect(middleLowerMenuX, middleLowerMenuY - barSeparation, bar1length, barHeight);
    this.barText("Energia potencial: " + round(this.potentialEnergy) + " N", stringSize,middleLowerMenuX, middleLowerMenuY - barSeparation + stringSeparation);
    //bar 2
    fill(0,255,0);
    rect(middleLowerMenuX, middleLowerMenuY, bar2length, barHeight);
    this.barText("Energia cinetica: " + round(this.kineticEnergy)+ " N", stringSize,middleLowerMenuX, middleLowerMenuY + stringSeparation);
    //bar 3
    fill(0,0,255);
    rect(middleLowerMenuX, middleLowerMenuY + barSeparation, bar3length, barHeight);
    this.barText("Energia elastica: " + round(this.elasticEnergy)+ " N", stringSize,middleLowerMenuX, middleLowerMenuY + barSeparation+ stringSeparation);
    //bar 4
    fill(200,200,200);
    rect(middleLowerMenuX, middleLowerMenuY + 2*barSeparation, bar4length, barHeight);
    this.barText("Energia mecanica: " + round(this.totalEnergy)+ " N", stringSize,middleLowerMenuX, middleLowerMenuY + 2*barSeparation+ stringSeparation);
};

LowerMenu.prototype.barText = function(string, stringSize, x, y){
    fill(0);
    textSize(stringSize);
    //textStyle(BOLD);
    stroke(0);
    text(string,x, y);
};