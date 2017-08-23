function LowerMenu(x, y, width, height, color, parent) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.playBtn = new ImageButton(x + (width*0.03), y + (height/3), 70, 70, "../assets/play.png", parent, 'imageButton', 'playbtn', toggleVarMenu);
    this.pauseBtn = new ImageButton(x + (width*0.04), y + (height/3), 70, 70, "../assets/pause.png", parent, 'imageButton', 'pausebtn', toggleVarMenu);
    this.varBtn = new ImageButton(x + (width*0.05), y + (height/3), 70, 70, "../assets/changeExercise.png", parent, 'imageButton', 'varbtn', function(){ return toggleVarMenu('varbtn'); });
    this.expBtn = new ImageButton(x + (width*0.06), y + (height/3), 70, 70, "../assets/variables.png", parent, 'imageButton', 'expbtn', function(){ return toggleExpMenu('expbtn'); });
}

LowerMenu.prototype.display = function(){
    let menuColor = this.color;
    fill(menuColor[0], menuColor[1], menuColor[2]);
    rect(this.x, this.y, this.width, this.height);
    this.bars(500,500,500);
};

LowerMenu.prototype.bars = function (bar1length, bar2length, bar3length) {
    let barSeparation = 30;
    let barHeight = 20;
    let middleLowerMenuX = this.x + this.width/2;
    let middleLowerMenuY = this.y + this.height/2;
    stroke(255);
    fill(255,0,0);
    rect(middleLowerMenuX, middleLowerMenuY - barSeparation, bar1length, barHeight);
    fill(0,255,0);
    rect(middleLowerMenuX, middleLowerMenuY, bar2length, barHeight);
    fill(0,0,255);
    rect(middleLowerMenuX, middleLowerMenuY + barSeparation, bar3length, barHeight);
    fill(200,200,200);
    rect(middleLowerMenuX, middleLowerMenuY + 2*barSeparation, bar3length, barHeight);
}