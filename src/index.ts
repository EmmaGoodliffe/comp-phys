import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const p = new Particle(_);

_.setup = () => {
  _.createCanvas(400, 400);
  _.angleMode("degrees");
  p.s.y = 200;
};

_.draw = () => {
  _.background(32);
  p.update();
  p.draw();
};
