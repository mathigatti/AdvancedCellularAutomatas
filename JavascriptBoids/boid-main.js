'use strict';

// ***** Variable Declerations *****

// Canvas Elements
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var xWidth = canvas.width;		// Get canvas width (full size of browser window)
var yWidth = canvas.height;		// Get canvas height

// Number of elements
var numObstacles 		= 2;	// Initial Number of circular obstacles on canvas
var numBoids 			= 50;	// Initial Number of Boids
var maxNumBoids			= 500;	// Max possible numer of Boids

// Obstacle control
var minObstacleSize 	= 20;
var maxObstacleSize 	= 60;

// Boid control parameters
var boidSize			= 5;	// Length of boids side
var maxVelocity 		= 1.5;	// Max velocity of the Boids
var maxSteering 		= 0.2;	// The maximum steering force allowed
var detectionRange 		= 50;	// Range at which Boids become neigbours
var collisionRange 		= 25;	// Range at which boids and obstacles will be avoided
var detectionAngle		= 2*Math.PI / 3;
var cosDetectionAngle 	= Math.cos( detectionAngle ); // Cos of vision cone angle of boid (Pre-calculate here and compare cosine values later)
var eyeDivisions		= 21;
var cohesionStrength	= 0.1;	
var alignStrength 		= 0.1;
var avoidStrength 		= 0.4;
var obstacleStrength 	= 0.7;
var speedUpStrength		= 0.0001;
var maxSteerAngle 		= Math.PI / 20;
var cosMaxSteerAngle	= Math.cos( maxSteerAngle );
var maxVelocityChange	= 0.1;

// Initialise arrays and variables
var Boids 			= [];		// Array of boid structures
var Obstacles 		= [];		// Array of obsctacle structures
var timeStep;					// Declare time step variable for animate			
var stopped 		= true;		// Pause switch (initialised as true)
var started 		= false;	// Start switch (initialised as false)
var displaySteering = false;	// Display steering vectors switch, initialize as false

// Display initial boids and obstacles after loading page
resetBoids(); 

// ************ Functions ******************

// Return square of number
function square(x){return x*x;}

// Return random initial velocity up to a max magnitude
function randomVelocity(max){
	var x = ( Math.random()*2 - 1 ) * max;
	var y = ( Math.random()*2 - 1 ) * Math.sqrt( square(max) - square(x)); // Ensures total velocity magnitude is less than max
	return new vec(x,y);
}

// Return random initial position inside canvas
function randomPosition(){
	var x = Math.random()*(xWidth-1) +1;
	var y = Math.random()*(yWidth-1) +1; 
	return new vec(x,y);
}

// Function called at each timestep
function animate(){
	ctx.clearRect(0,0,xWidth,yWidth); 	// Clear canvas
	for( var n = 0; n < numObstacles; n++){ Obstacles[n].render(); }
	for( var n = 0; n < numBoids; n++ ){ Boids[n].reset(); }
	neighbourTest();
	for( var n = 0; n < numBoids; n++ ){ 
		if ( Boids[n].alive  == true ){
			Boids[n].acceleration();
			Boids[n].move();
		}
		Boids[n].render();
	}
}

// Reset Boids to random initial positions and velocities
function resetBoids(){
	ctx.clearRect(0,0,xWidth,yWidth);
	makeObstacles();
	for( var n = 0; n < numObstacles; n++ ){Obstacles[n].render();}
	for( var n = 0; n < numBoids; 	  n++ ){
		Boids[n] = new boid();
		Boids[n].randomize();
		// Check if boid is inside an obstacle, Re-roll position if it is
		while (Boids[n].position.obstacleDetect(collisionRange) === true){ Boids[n].randomize(); }
		Boids[n].render();
	}
	//animate();
	document.getElementById("boidNumber").innerHTML = numBoids;
}

// Step simulation
function stepSim(){ animate(); }

// Run simulation function
function startSim(){ 
	if( started == false ){ 
	timeStep = setInterval( animate, 25 ); 
	started  = true; 
	stopped  = false; }
	else { return; }
}

// Pause Simulation function
function pauseSim(){
	if( stopped == false ){ 
	clearInterval( timeStep );
	stopped = true;
	started = false;}
}

// Add boid at mouse click
function addBoidAtClick(event){
	var mousePos 	= getMousePos( canvas, event );
	var mouseVec 	= new vec( mousePos.x, mousePos.y )
	if ( mousePos.obstacleDetect(5) == true ){ return; }
	var temp 	 	= new boid();
	temp.position 	= mouseVec;
	temp.velocity 	= randomVelocity( maxVelocity );
	Boids.push(temp);
	Boids[Boids.length-1].render();
	numBoids++;
	document.getElementById("boidNumber").innerHTML = numBoids;
}

// Remove boids after button use
function removeBoid( number ){
	if (numBoids == 0){return;}
	else{
		var n = 0;
		while ( n < number && numBoids > 0 ){
			n 		 ++;
			numBoids --;
			Boids.pop();
		}
		animate();
		document.getElementById("boidNumber").innerHTML = numBoids;
	}
}

function addBoid( number ){
	if (numBoids == 500){return;}
	else{
		var n = 0;
		while ( n < number && numBoids < 500 ){
			n 		 ++;
			numBoids ++;
			var tempBoid = new boid();
			tempBoid.randomize();
			// Check if boid is inside an obstacle, Re-roll position if it is
			while (tempBoid.position.obstacleDetect(collisionRange) === true){ tempBoid.randomize(); }
			Boids.push(tempBoid);
		}
		animate();
		document.getElementById("boidNumber").innerHTML = numBoids;	
	}
}

// Mouse position relative to canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
	var mousePos = new vec(evt.clientX - rect.left,evt.clientY - rect.top);
	return mousePos;
}

// Generate random circular obstacles for boids
function makeObstacles() {
	for (var n = 0; n < numObstacles; n++){
		Obstacles[n] = new obstacle(Math.random()*maxObstacleSize+minObstacleSize, randomPosition().x, randomPosition().y);
	}}
	
// If the window is resized, resize the canvas and shift all the elements
function resizeFunction() {
	var xScaling = window.innerWidth / canvas.width ;
	var yScaling = window.innerHeight / canvas.height ;
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	xWidth = canvas.width;
	yWidth = canvas.height;
	for( var n = 0; n < numObstacles; n++){
		Obstacles[n].centre.x = xScaling * Obstacles[n].centre.x;
		Obstacles[n].centre.y = yScaling * Obstacles[n].centre.y;
		Obstacles[n].render();
	}
	for( var n = 0; n < numBoids; n++ ){
		Boids[n].position.x = xScaling * Boids[n].position.x;
		Boids[n].position.y = yScaling * Boids[n].position.y;
		Boids[n].render();
	}
	animate();
}

// Change the number of obstacles from HTML input
function changeObstacles (plusMinus){
	if ( numObstacles >  10){ return; }
	else{	
		numObstacles += plusMinus;	
		resetBoids();
	}
	return new vec(x,y);
}

// Turn on steering vectors
function showSteeringSwitchOn (){
	if (displaySteering == true) {return;}
	else {
		displaySteering = true;
		animate();
	} 
}

// Turn of steering vectors
function showSteeringSwitchOff (){
	if (displaySteering == false) {return;}
	else {
		displaySteering = false;
		animate();
	} 
}

// Color hue changer -- Taken from "Pimp Trizkit" on Stackflow
function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}