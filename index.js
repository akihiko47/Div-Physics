// start only when everything is loaded
window.onload = function () {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let particles = []; // main array of particles
  let springs = []; // main array of springs
  let joints = []; // main array of rigid joints
  let divs = [];

  // update function iterations
  // more substeps => better accuracy
  // more substeps => poor performance
  let subSteps = 4;

  let G = 10; // gravitational force

  let secNow = 0; // variable for storing frame start time
  let secPrev = 0; // variable for storing the end time of the previous frame
  let secPassed = 0; // time betweeen frames

  let mouse = new Mouse();

  // ADD OBJECTS PART
  divs.push(new PhysicsDiv(width/2-125, 100, 250, 150, "div-first", particles, joints));
  particles.push(new Particle(width/2 - 150, 20, 15, "#49afc1", true));
  particles.push(new Particle(width/2 + 150, 20, 15, "#49afc1", true));
  springs.push(new Spring(particles.at(-1), divs[0].p1, 2, 2))
  springs.push(new Spring(particles.at(-2), divs[0].p4, 2, 2))
  springs.push(new Spring(particles.at(-1), divs[0].p2, 2, 2))
  springs.push(new Spring(particles.at(-2), divs[0].p3, 2, 2))

  divs.push(new PhysicsDiv(width/2-125, 370, 250, 150, "div-second", particles, joints));
  particles.push(new Particle(divs[0].p2.x_now, divs[0].p2.y_now + 20, 10, "#49afc1"))
  joints.push(new Joint(divs[0].p2, particles.at(-1)))
  particles.push(new Particle(divs[0].p3.x_now, divs[0].p3.y_now + 20, 10, "#49afc1"))
  joints.push(new Joint(divs[0].p3, particles.at(-1)))
  for (let i = 2; i < 6; i++) {
    particles.push(new Particle(divs[0].p2.x_now, divs[0].p2.y_now + 20*i, 10, "#49afc1"))
    joints.push(new Joint(particles.at(-3), particles.at(-1)))
    particles.push(new Particle(divs[0].p3.x_now, divs[0].p3.y_now + 20*i, 10, "#49afc1"))
    joints.push(new Joint(particles.at(-3), particles.at(-1)))
  }
  joints.push(new Joint(divs[1].p1, particles.at(-2)))
  joints.push(new Joint(divs[1].p4, particles.at(-1)))

  particles.push(new Particle(divs[1].p2.x_now, divs[1].p2.y_now + 20, 10, "#49afc1"))
  joints.push(new Joint(divs[1].p2, particles.at(-1)))
  particles.push(new Particle(divs[1].p3.x_now, divs[1].p3.y_now + 20, 10, "#49afc1"))
  joints.push(new Joint(divs[1].p3, particles.at(-1)))
  for (let i = 2; i < 12; i++) {
    particles.push(new Particle(divs[1].p2.x_now, divs[1].p2.y_now + 20*i, 10, "#49afc1"))
    joints.push(new Joint(particles.at(-3), particles.at(-1)))
    particles.push(new Particle(divs[1].p3.x_now, divs[1].p3.y_now + 20*i, 10, "#49afc1"))
    joints.push(new Joint(particles.at(-3), particles.at(-1)))
  }

  particles.push(new Particle(width/2, height-50, 50, "#49afc1", false, 'particle-big'))
  particles.push(new Particle(width/2 + 90, height-50, 40, "#49afc1", false, 'particle-med'))
  particles.push(new Particle(width/2 - 90, height-50, 30, "#49afc1"))

  // MAIN FUNCTION
  function main() {
    width = window.innerWidth;
    height = window.innerHeight;

    secNow = window.performance.now(); // get start time of this frame

    // substeps loop
    // you can perform several updates per frame for greater accuracy
    // in this case, the frame time is divided by the number of sub-steps
    for (let i = 0; i < subSteps; i++) {
      applyGravity(particles, 0, -(secNow/800 % 10) + 8);
      update(particles, springs, joints, secPassed / subSteps);

      drawDivs(divs);
      drawParticles(particles);

      // this function prevents particles from falling off the screen
      applyConstraint(particles, width, height);

      mouse.applyPickUp(particles);
    }

    secPassed = (secNow - secPrev) / 1000; // get frame time and convers to seconds
    secPrev = secNow; // get end time of this frame

    requestAnimationFrame(main); // continue main loop
  }

  main();
};
