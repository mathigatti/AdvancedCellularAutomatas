'use strict';

function obstacle(r,x,y){
	this.radius = r;
	this.centre = new vec(x,y);
}

obstacle.prototype.render = function() {
	ctx.beginPath();
	ctx.arc(this.centre.x,this.centre.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = '#007ACC';
	ctx.fill();
}