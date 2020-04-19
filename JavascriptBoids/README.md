# Javascript-Boids

Javascript implementation of a Boid algorithm (by zombie-einstein):

This follows the standard set of boid rules; namely:

- Cohesion: The boids steer to move to the average position of nearby neighbours.
- Alignment: The boids steer to align with the average velocity of its neighbours.
- Spacing: If a neighbouring boid is too close it steers to move away from it.

Additionally there is a steering rule to avoid the walls. It does this by prediciting it's future position given that it carries on it's current velocity vector. If the future position overlaps with a border, it then rotates it's current velocity until it no longer overlaps with the border. It then steers towards this new vector in addition to the other steering effects. The same algorithm now also avoids circular obstructions placed in the boid area.

Improvements and possible additions to be made:

- Currently boids have a tendency to check in one direction first when encountering a boundary, ideally this should be randomized.
- Add some form of predeator? Would need some sort of hunting algorithm.
- Some sort of analytics, e.g. average vector etc.
- Additional randomness in each boids max velocity turning, flocking parameters etc.

 
