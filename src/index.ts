import p5 from "p5";

const s = new p5(() => {});

s.setup = () => {
  s.createCanvas(400, 400);
};

s.draw = () => {
  s.background(52);
};
