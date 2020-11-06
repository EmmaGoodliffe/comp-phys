import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const particles: Particle[] = [];

_.setup = () => {
  _.createCanvas(400, 400);
  _.angleMode("degrees");
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(_, 1));
    particles[i].hue = Math.floor(_.random(0, 360));
  }
};

_.draw = () => {
  _.background(32);
  for (const p of particles) {
    p.update({
      G: 10,
      g: 0,
      mouseMass: 2,
      attractors: particles,
      widthToMassRatio: 10,
      lengthToAccelerationRatio: 10 ** 5,
    });
    p.draw();
  }
};
