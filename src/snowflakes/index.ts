import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const settings = {
  reflect: true,
  rotate: true,
};

const snowflake: Particle[] = [];
let p: Particle;

_.setup = () => {
  _.createCanvas(600, 600);
  p = new Particle(_, _.createVector(_.width / 2, 0));
};

_.draw = () => {
  _.background(52);
  _.translate(_.width / 2, _.height / 2);
  p.update();

  if (p.shouldStop(snowflake)) {
    snowflake.push(p);
    p = new Particle(_, _.createVector(_.width / 2, 0));
  }

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
