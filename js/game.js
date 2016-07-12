// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return  window.cancelAnimationFrame          ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame    ||
			window.oCancelRequestAnimationFrame      ||
			window.msCancelRequestAnimationFrame     ||
		clearTimeout;
} )();

// DO NOT TOUCH THE CODE ABOVE

//console.log('Holla');





//Step 01 ..yl.. Create game canvas and track mouse position
    var gameCanvas = document.getElementById("canvas");
    //Store HTML5 canvas tag into JS variable
    
    var ctx = gameCanvas.getContext("2d"); // Create context 2D
    var W = window.innerWidth;
    var H = window.innerHeight;

    var mouseObj = {};

//    console.log('broser width is currenly' + W);
//    console.log('broser width is currenly' + H);
    
    gameCanvas.width = W;
    gameCanvas.height = H;







//Step 02 ..yl.. Clear page canvas by covering it in black 
    
    function paintCanvas(){
        ctx.fillStyle = "#000000"; // not background color
        ctx.fillRect(0, 0, W, H);
    }
    paintCanvas();//call function



    function trackPosition(evt){
        mouseObj.x = evt.pageX;
        mouseObj.y = evt.pageY;
//        console.log("cursor x is : " + mouseObj.x + " cursor y is : " + mouseObj.y);
    }
    gameCanvas.addEventListener("mousemove", trackPosition, true);





//Step 03 ..yl.. Place a ball on the canvas 
var ball = {}; //Ball obeject 

ball = {
    x: 50, // variable 
    y: 50,
    r: 5, //radius
    c: "#ffffff",
    vx: 4, //volocity 
    vy: 8,
    
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = this.c; // the variable c in ball obejct <this> is a command
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    } // regular js function inside a object named draw
}

ball.draw(); 





//Step 04 ..yl.. Place a start button on canvas 
var startBtn = {}; // Start button object
startBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 25, 
    
    draw: function() {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Start", W / 2, H / 2); //Fill text in the button
    }
}

startBtn.draw();




//Step 05 ..yl.. Place score and points on canvas 

var points = 0; // game poins - a global adn regular varieble
function paintScore(){
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top"; 
    ctx.fillText("Score: " + points, 20, 20); // 20pixels from top and down
}

paintScore();





//Step06 ..yl.. Place paddles (top and bottom) on canvas 
function paddlePosition(TB) {
    this.w = 150; // lower w is in the funtion-declarable 
    this.h = 5; // in pixels 
    
    this.x = W/2 - this.w/2; 
    
    if (TB == "top"){
        this.y = 0; // on the top of browser
    } else {
        this.y = H - this.h; 
    }
    // this.y = (TB == "top") ? 0 : H - this.h; (short version)
}



var paddlesArray = []; //Paddles Array 
paddlesArray.push(new paddlePosition("top"));
paddlesArray.push(new paddlePosition("bottom")); 

//console.log("top paddle y is: "+ paddlesArray[0].y);
//console.log("bottom paddle y is: "+ paddlesArray[1].y);


function paintPaddles(){
    for (var lp = 0; lp < paddlesArray.length; lp++){
        p = paddlesArray[lp];//object that hold anything in lp array 
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        
    }
}
paintPaddles();







// Step 07 ..yl.. Detect when the user clicks on the screen 

gameCanvas.addEventListener("mousedown", btnClick, true);

function btnClick(evt) {
    var mx = evt.pageX;
    var my = evt.pageY;
    
    //user clicked on the start btn
    if (mx >= startBtn.x && mx <= startBtn.x + startBtn.w){
        if (my >= startBtn.y && my <= startBtn.y + startBtn.h){
            console.log("Start button clicked");
            //Delete the start btn
            startBtn = {};
            
            //Start Game animation lop
            animloop();
        }
    }
}

//Function for running the whole game animations
var init; //Variable to initialize animation 
function animloop(){
    init = requestAnimFrame(animloop);
    refreshCanvasFun();
}




//Step 08 ..yl.. Draw everything in canvas over and over again 
function refreshCanvasFun(){
    paintCanvas();
    paintPaddles();
    ball.draw();
    paintScore();
    update();
}

function update(){
    //move the paddles, track the mouse 
    for (var lp = 0; lp < paddlesArray.length; lp++) {
        p = paddlesArray[lp];
        p.x = mouseObj.x - p.w / 2;
    }
    
    //move the ball 
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    //Check for ball paddle collision 
    check4collision();
}

function check4collision(){
    var pTop = paddlesArray[0];
    var pBot = paddlesArray[1];
    
    if (collides(ball, pTop)){
        collideAction(ball, pTop);
    }else if (collides(ball, pBot)){
        collideAction(ball, pBot);
    }else {
    // Ball off the top or bottom of screen
        if (ball.y + ball.r > H){
            // Game over 
        }else if (ball.y < 0) {
            //Game over 
        }
        //Ball hits the side of screen
        if (ball.x + ball.r > W){
            ball.vx = -ball.vx;
            ball.x = W - ball.r;
        }else if (ball.x - ball.r < 0){
            ball.vx = -ball.vx;
            ball.x = ball.r; 
        }
    }
}

var paddleHit; // Which paddle was hit 0=top, 1=bottom
function collides(b, p){
    if (b.x + b.r >= p.x && b.x - b.r <= p.x + p.w){
        if (b.y >= (p.y - p.h) && p.y > 0){
            paddleHit = 0;
            return true;
        }else if (b.y <= p.h && p.y === 0){
            paddleHit = 1;
            return true;
        }else{
            return false;
        }
    }
}

var collisionSnd = document.getElementById("collide");

function collideAction(b, p){
    //console.log ("sound and then bounce"); 
    if (collisionSnd) {
         collisionSnd.play();
    }
    // Reverse ball y velocity 
    ball.vy = -ball.vy;
    // increase the score by 1 
    points++; 
}



