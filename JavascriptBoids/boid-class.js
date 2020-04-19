'use strict';
//****************** Boid Class & associated functions ********************

// Boid Constructor
function boid(){
	this.position 		= new vec(0,0);	// Boids position
	this.velocity 		= new vec(0,0);	// Boids velocity
	this.accVec 		= new vec(0,0); // Boids acceleration vector, newly calculated at each timestep
	this.steerCohesion 	= new vec(0,0); // Steering vector to average position of neighbours
	this.steerAlign 	= new vec(0,0);	// Steering vector to align boid velocity with neighbours
	this.steerAvoid 	= new vec(0,0);	// Steering vector to avoid other boids
	this.steerObstacle 	= new vec(0,0);	// Steering vector to avoid walls and obstacles
	this.numNeighbours 	= 0;			// Count the boids neighbours
	this.numCollisions 	= 0;			// Count the number of boids that are in collision range
	this.numObstacles	= 0;			// Count the number of walls or obstacles to be avoided
	this.alive 			= true;			// Status of boid
	this.eye			= [];			// 
	for ( var n = 0; n < eyeDivisions; n++ ){ this.eye[n] = new vec(0,0); }
	this.leftOrRight	= Math.round(Math.random())*2 -1;
	this.triangle 		= [ new vec(0,0), new vec(0,0), new vec(0,0) ];		// Points of triangle used to render boid
	this.color 			= shadeColor2( "#FF9900", Math.random()*0.3 -0.15 );	// Give each boid a random shade from a base colour
}

// Generate compound eye vectors
boid.prototype.generateEye = function(){
	this.eye[0].assign( this.velocity );
	this.eye[0].setMagnitude( detectionRange );
	for ( var n = 1;  n < eyeDivisions; n++ ){
		this.eye[n].assign( this.eye[n-1] );
		this.eye[n].rotate( n*this.leftOrRight*Math.pow(-1,n)*2*detectionAngle/eyeDivisions );
	}
}

// Check for obstacles
boid.prototype.look = function(){
	for ( var n = 0; n < eyeDivisions; n++ ){
		var testVec = this.position.sum( this.eye[n] );
		if ( testVec.obstacleDetect(5) == false && testVec.boundaryDetect(5) == false ){
			return n;
		}
	}
	return 0;
}

// Adds vector that points away from vector to average
vec.prototype.collisionAvgs = function( object, subject, range, count ){
	var tempVec = new vec( object.position.x -subject.x, object.position.y -subject.y );
	tempVec.setMagnitude( range -tempVec.magnitude() );
	this.cumAvg( tempVec, count );
}

// Add 'neighbour' position and velocity to average
boid.prototype.neighbourAvgs = function( neighbour ){ 
	this.numNeighbours += 1;	// increment number of neighbours
	this.steerCohesion.cumAvg(neighbour.position,this.numNeighbours);
	this.steerAlign.cumAvg(neighbour.velocity,this.numNeighbours);
}

// Give boid random initial position and velocity
boid.prototype.randomize = function () {
	this.position = randomPosition();
	this.velocity = randomVelocity( maxVelocity );	
	this.generateEye();
}

// Update Boid position function 
//( i.e. add acceleration to the velocity, and velocity to position )
boid.prototype.move = function () {
	this.velocity.add( this.accVec );
	this.velocity.maxLimit( maxVelocity );	// Double check that the velocity does not exceed the maximum velocity after acceleration
	this.position.add( this.velocity );
	this.generateEye();
	// Hard wall against obstacles, stops boids if they try to enter an obstacle
	//if (this.position.obstacleDetect(5)){
	//	this.position.subtract(this.velocity); 
	//}
}

// Work out triangular boid render points by scaling and rotating velocity vector
boid.prototype.triVec = function() {
	this.triangle[0].assign(this.velocity);
	this.triangle[0].setMagnitude(boidSize*1.5);
	this.triangle[1].assign(this.triangle[0]);
	this.triangle[1].setMagnitude(boidSize);
	this.triangle[1].rotate(2*Math.PI/3);
	this.triangle[2].assign(this.triangle[1]);
	this.triangle[2].rotate(2*Math.PI/3);
}

// Render the boid on screen
boid.prototype.render = function() {	
	this.triVec();
	ctx.beginPath();
	ctx.moveTo(this.position.x+this.triangle[0].x,this.position.y+this.triangle[0].y);
	ctx.lineTo(this.position.x+this.triangle[1].x,this.position.y+this.triangle[1].y);
	ctx.lineTo(this.position.x+this.triangle[2].x,this.position.y+this.triangle[2].y);
	ctx.fillStyle =  this.color;
	ctx.fill();				
}

// Draw vector from boid
boid.prototype.renderLine = function( subject, color ){
	ctx.beginPath();
	ctx.moveTo(this.position.x,this.position.y);
	ctx.lineTo(this.position.x +subject.x, this.position.y +subject.y)
	ctx.strokeStyle =  color;
	ctx.stroke();
}

// Draw steering vectors and vision range
boid.prototype.drawSteering = function(){
	// Render collision range
	ctx.beginPath();
	ctx.arc( this.position.x, this.position.y, detectionRange, Math.atan2(this.velocity.y, this.velocity.x)-detectionAngle, Math.atan2(this.velocity.y, this.velocity.x)+detectionAngle );
	ctx.strokeStyle = "rgba(255, 0, 0, 0.25)";
	ctx.stroke();

	this.renderLine( this.eye[eyeDivisions-1], "rgba(255, 0, 0, 0.25)" );
	this.renderLine( this.eye[eyeDivisions-2], "rgba(255, 0, 0, 0.25)" );

	if (this.numNeighbours > 0){
		this.renderLine( this.steerAlign, '#ff0000' );		// Red
		this.renderLine( this.steerCohesion, '#0000ff' );	// Blue
	}
	if (this.numCollisions > 0){
		this.renderLine( this.steerAvoid, '#00ff00' );		// Green
	}
	if (this.numObstacles > 0){
		this.renderLine( this.steerObstacle, '#ff9900' );		// Orange
	}
}

// Reset the neighbour averages and counts
boid.prototype.reset = function() {
	this.accVec.reset();
	this.steerCohesion.reset();
	this.steerAlign.reset();
	this.steerAvoid.reset();
	this.steerObstacle.reset();
	this.numNeighbours	= 0;
	this.numCollisions	= 0;
	this.numObstacles	= 0;
}

// Calculate new velocity based on neighbours
boid.prototype.acceleration = function(){
	
	if ( this.numNeighbours > 0 ) { this.steerCohesion.subtract(this.position); } // This is now vector to local average

	if ( displaySteering == true ){ this.drawSteering(); } // Draw correct steering vectors here before steering

	if ( this.numNeighbours > 0 ) {
		this.numNeighbours = 1; // Setting this.numNeighbours to 0 or 1 will make weighted sum easier to calculate

		this.steerCohesion.maxLimit(maxVelocity);	// Limit the size of this vector
		
		// Steering
		this.steerCohesion.subtract( this.velocity );
		this.steerCohesion.maxLimit( maxSteering );
		this.steerAlign.subtract( this.velocity );
		this.steerAlign.maxLimit( maxSteering );
		
		// Avoid neighbour calculation
		if ( this.numCollisions > 0 ){

			this.numCollisions = 1;
			this.steerAvoid.maxLimit(maxVelocity);		// Limit avoid vector to max velocity

			// Steering
			this.steerAvoid.subtract( this.velocity );
			this.steerAvoid.maxLimit( maxSteering );
		}
	}

	this.steerObstacle.maxLimit(maxVelocity);
	this.steerObstacle.subtract( this.velocity );
	this.steerObstacle.maxLimit( maxSteering );
	
	// Speed up vector steering
	var speedUp = new vec( this.velocity.x, this.velocity.y );
	speedUp.setMagnitude( maxVelocity );
	speedUp.subtract( this.velocity );
	speedUp.maxLimit( maxSteering );
	
	// Weighted average of steering contributions
	speedUp.scale( speedUpStrength );
	this.steerCohesion.scale( cohesionStrength );
	this.steerAlign.scale( alignStrength );
	this.steerAvoid.scale( avoidStrength );
	this.steerObstacle.scale( obstacleStrength );

	this.accVec.add( speedUp );
	this.accVec.add( this.steerCohesion );
	this.accVec.add( this.steerAlign );
	this.accVec.add( this.steerAvoid );
	this.accVec.add( this.steerObstacle );
	this.accVec.scale( 1 / ( speedUpStrength +this.numNeighbours*( cohesionStrength + alignStrength ) +this.numCollisions*avoidStrength +this.numObstacles*obstacleStrength ) );

}


// Return vector to another boid
boid.prototype.vecTo = function( subject ){
	return new vec(subject.position.x -this.position.x, subject.position.y -this.position.y);
}

// Neighbour check function
function neighbourTest(){
	// The arrangement of these loops means that neighbour checks are only
	// made once between pairs of boids, slightly more effecient than
	// check all boids for each boid	
	for ( var n = 0; n < numBoids-1; n++ ){
	for ( var m = n+1; m < numBoids; m++ ){ 
		// This checks that neighbours are both within a certain range
		var d = Boids[n].position.squareDistance(Boids[m].position);
		if ( d < square(detectionRange) ){
				// Check if neighbour is inside vision cone
				if ( Boids[n].velocity.cosAngle(Boids[n].vecTo(Boids[m])) >  cosDetectionAngle){
					Boids[n].neighbourAvgs(Boids[m]);
					if ( d < square(collisionRange) ){
						Boids[n].numCollisions ++;
						Boids[n].steerAvoid.collisionAvgs( Boids[n], Boids[m].position, collisionRange, Boids[n].numCollisions ); 
					}
				}
				// Check if neighbour is inside vision cone
				if ( Boids[m].velocity.cosAngle(Boids[m].vecTo(Boids[n])) >  cosDetectionAngle){
					Boids[m].neighbourAvgs(Boids[n]);
					if ( d < square(collisionRange) ){
						Boids[m].numCollisions ++;
						Boids[m].steerAvoid.collisionAvgs( Boids[m], Boids[n].position, collisionRange, Boids[m].numCollisions ); 
					}
				}
	}}
}
	for ( var n = 0; n < numBoids; n++ ){
		var testLook = Boids[n].look();
		if ( testLook > 0 ){ Boids[n].numObstacles = 1; } 
		document.getElementById("testValues").innerHTML = testLook;
		Boids[n].steerObstacle.assign( Boids[n].eye[ testLook ] );
	}

		
}

// Some alternate methods below here

/*
// Avoid the circular obstacles
boid.prototype.obstacleAvoid = function( offset, range ){
	for ( var n = 0; n < numObstacles; n++ ){
		var d = this.position.squareDistance( Obstacles[n].centre );
		// First check if boid is in range of the obstacle
		if ( d < square( range +offset +Obstacles[n].radius ) ){
			var dToTangent 		= Math.sqrt( d +square( Obstacles[n].radius +offset ) );	// Distance to the tangent points of the obstacle
			var vecToObstacle 	= new vec(Obstacles[n].centre.x -this.position.x, Obstacles[n].centre.y -this.position.y); //Vector from Boid to obstacle
			var cosToTangent 	= ( Obstacles[n].radius +offset ) /dToTangent;				// Cos of angle from centre of obstacle to tangent
			var cosToVelocity 	= this.velocity.cosAngle( vecToObstacle );		// Cos of angle between velocity of boid and vector to obstacle
			// Secondly check if Boid will eventually intercept obstacle
			if ( cosToVelocity > cosToTangent ){
				//vecToObstacle.setMagnitude( Math.sqrt(d) -offset -Obstacles[n].radius );
				// Generate temporary boid at obstacle boundary closest to boid
				//var boundVec 	= new vec( this.position.x +vecToObstacle.x, this.position.y +vecToObstacle.y );
				// Add vector pointing away from obstacle boid to average vector
				this.numObstacles +=1;
				this.steerObstacle.collisionAvgs( this, Obstacles[n].centre, range+Obstacles[n].radius+offset, this.numObstacles );
			}
		}
	}
}

// Avoid walls
boid.prototype.wallAvoid = function( offset, range ){
	if ( this.position.x < offset +range && this.velocity.x < 0 ){
			var boundVec = new vec( offset, this.position.y );
			this.numObstacles +=1;
			this.steerObstacle.collisionAvgs( this, boundVec, range, this.numObstacles );
		}
	if ( this.position.x > xWidth -offset -range && this.velocity.x > 0 ){
			var boundVec = new vec( xWidth -offset, this.position.y );
			this.numObstacles +=1;
			this.steerObstacle.collisionAvgs( this, boundVec, range, this.numObstacles );
		}
	if ( this.position.y < offset +range && this.velocity.y < 0 ){
			var boundVec = new vec( this.position.x, this.numObstacles );
			this.numObstacles +=1;
			this.steerObstacle.collisionAvgs( this, boundVec, range, this.numObstacles );
		}
	if ( this.position.y > yWidth -offset -range && this.velocity.y > 0 ){
			var boundVec = new vec( this.position.x, yWidth -offset );
			this.numObstacles +=1;
			this.steerObstacle.collisionAvgs( this, boundVec, range, this.numObstacles );
		}
}*/