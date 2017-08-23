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
    this.initialEnergy = exercise.energy.actualEnergy;
}

LowerMenu.prototype.display = function(){
    let menuColor = this.color;
    fill(menuColor[0], menuColor[1], menuColor[2]);
    rect(this.x, this.y, this.width, this.height);
    let potentialEnergy = exercise.energy.calculatePotential(exercise.energy.height);
    let kineticEnergy = exercise.energy.calculateKinetic(exercise.energy.velocity);
    let elasticEnergy = exercise.energy.calculateElastic(exercise.energy.springLength);
    let totalEnergy = exercise.energy.actualEnergy;
    let bar1Length = map(potentialEnergy, 0, this.initialEnergy, 0, 500);
    let bar2Length = map(kineticEnergy, 0, this.initialEnergy, 0, 500);
    let bar3Length = map(elasticEnergy, 0, this.initialEnergy, 0, 500);
    let bar4length = map(totalEnergy, 0, this.initialEnergy, 0, 500);
    this.bars(bar1Length ,bar2Length,bar3Length, bar4length);
};

LowerMenu.prototype.bars = function (bar1length, bar2length, bar3length, bar4length) {
    let barSeparation = 30;
    let stringSeparation = 15;
    let stringSize = 17;
    let barHeight = 20;
    let middleLowerMenuX = this.x + this.width/2;
    let middleLowerMenuY = this.y + this.height/2;
    stroke(255);
    fill(255,0,0);
    rect(middleLowerMenuX, middleLowerMenuY - barSeparation, bar1length, barHeight);
    fill(0);
    textSize(stringSize);
    text("Energia potencial: " + round(exercise.energy.calculatePotential(exercise.energy.height)) + " N",middleLowerMenuX, middleLowerMenuY - barSeparation + stringSeparation);
    fill(0,255,0);
    rect(middleLowerMenuX, middleLowerMenuY, bar2length, barHeight);
    fill(0);
    textSize(stringSize);
    text("Energia cinetica: " + round(exercise.energy.calculateKinetic(exercise.energy.velocity))+ " N",middleLowerMenuX, middleLowerMenuY + stringSeparation);
    fill(0,0,255);
    rect(middleLowerMenuX, middleLowerMenuY + barSeparation, bar3length, barHeight);
    fill(0);
    textSize(stringSize);
    text("Energia elastica: " + round(exercise.energy.calculateElastic(exercise.energy.springLength))+ " N",middleLowerMenuX, middleLowerMenuY + barSeparation+ stringSeparation);
    fill(200,200,200);
    rect(middleLowerMenuX, middleLowerMenuY + 2*barSeparation, bar4length, barHeight);
}