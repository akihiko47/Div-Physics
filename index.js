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

  divs.push(new PhysicsDiv(width/2-125, height/2, 250, 150, "div-first-test", particles, joints));
  particles.push(new Particle(width/2 - 200, height/2 - 200, 15, "#49afc1", true));
  particles.push(new Particle(width/2 + 200, height/2 - 200, 15, "#49afc1", true));
  springs.push(new Spring(particles.at(-1), divs[0].p1, 3, 3))
  springs.push(new Spring(particles.at(-2), divs[0].p4, 3, 3))
  springs.push(new Spring(particles.at(-1), divs[0].p2, 3, 3))
  springs.push(new Spring(particles.at(-2), divs[0].p3, 3, 3))

  // MAIN FUNCTION
  function main() {
    width = window.innerWidth;
    height = window.innerHeight;

    secNow = window.performance.now(); // get start time of this frame

    // substeps loop
    // you can perform several updates per frame for greater accuracy
    // in this case, the frame time is divided by the number of sub-steps
    for (let i = 0; i < subSteps; i++) {
      applyGravity(particles, G);
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
