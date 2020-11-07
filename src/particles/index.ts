import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const particles: Particle[] = [];

_.setup = () => {
  _.createCanvas(600, 600);
  _.angleMode("degrees");
  for (let i = 0; i < 12; i++) {
    particles.push(new Particle(_, Math.random() * 10));
  }
};

_.draw = () => {
  _.background(32);
  for (const p of particles) {
    p.update({
      G: 10,
      g: 0,
      mouseMass: 0,
      attractors: particles,
      widthToMassRatio: 10,
      lengthToAccelerationRatio: 10 ** 5,
      maxSpeed: 3,
    });
    p.draw();
  }
};
