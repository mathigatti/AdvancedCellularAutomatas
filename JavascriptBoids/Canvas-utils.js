'use strict';

// Run simulation function
function startSim(){ 
	if( started == false ){ 
	myVar = setInterval(animate_b, 25); 
	started = true; 
	stopped = false; }
	else { return; }
}

// Pause Simulation function
function pauseSim(){
	if( stopped == false ){ 
	clearInterval(myVar);
	stopped = true;
	started = false;}
}

// Mouse position relative to canvas
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
	var mousePos = new vec(evt.clientX - rect.left,evt.clientY - rect.top);
	return mousePos;
}

// If the window is resized, resize the canvas and shift all the elements
function resizeFunction() {
	var xScaling = window.innerWidth / canvas.width ;
	var yScaling = ( window.innerHeight-100 ) / canvas.height ;
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight-100;
	xWidth = canvas.width;
	yWidth = canvas.height;
}