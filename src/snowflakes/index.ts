import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const settings = {
  reflect: true,
  rotate: true,
  velocityChaos: 3,
  radius: 5,
};

const snowflake: Particle[] = [];
let p: Particle;

_.setup = () => {
  _.createCanvas(600, 600);
  p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);
};

_.draw = () => {
  _.background(52);
  _.translate(_.width / 2, _.height / 2);
  _.rotate((2 * Math.PI) / 12);

  let n = 0;
  while (!p.shouldStop(snowflake)) {
    p.update(settings.velocityChaos);
    n++;
  }
  n === 0 && _.noLoop();

  snowflake.push(p);
  p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);

  for (let i = 0; i < (settings.rotate ? 6 : 1); i++) {
    settings.rotate && _.rotate((2 * Math.PI) / 6);

    p.draw();
    for (const other of snowflake) {
      other.draw();
    }

    _.push();
    _.scale(1, -1);
    p.draw();
    for (const other of snowflake) {
      other.draw();
    }
    _.pop();
  }
};
