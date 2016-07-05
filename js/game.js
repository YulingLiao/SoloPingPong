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
        console.log("cursor x is : " + mouseObj.x + " cursor y is : " + mouseObj.y);
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
function pointScore(){
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top"; 
    ctx.fillText("Score: " + points, 20, 20); // 20pixels from top and down
}

pointScore();

