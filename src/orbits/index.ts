import p5 from "p5";

const _ = new p5(() => {});

_.setup = () => {
  _.createCanvas(400, 400);
  _.background(0);
};
