import p5 from "p5";
import Particle from "./Particle";

const _ = new p5(() => {});

const w = 1200;
const h = 800;
const EarthR = w / 8;
const fontSize = 32;
const textBoxSize = 200;
const starPositions = Array<p5.Vector>(200)
  .fill(_.createVector())
  .map(() => _.createVector(_.random(-w, w), _.random(-h, h))); // Some off-screen
const target = {
  minX: -100,
  maxX: 100,
  minY: -w / 3,
  maxY: -EarthR + 50,
} as const;

const sleigh = new Particle(_, 0, 0, 10);

let phase: "pause" | "play" = "pause";
let text: string;
let globeImage: p5.Image;
let sleighImage: p5.Image;
let halfOrbitIsComplete: boolean;

const areOverlapping = (
  s1: p5.Vector,
  r1: number,
  s2: p5.Vector,
  r2: number,
) => {
  const distance = p5.Vector.dist(s1, s2);
  return distance < r1 + r2;
};

const restart = () => {
  const x = 0;
  const y = -(EarthR + sleigh.r + 20);
  sleigh.s = _.createVector(x, y);
  text = "";
  halfOrbitIsComplete = false;
};

const stars = () => {
  _.stroke(255);
  _.strokeWeight(4);
  for (const s of starPositions) {
    _.point(s.x, s.y);
  }
};

_.preload = () => {
  globeImage = _.loadImage("./globe.png");
  sleighImage = _.loadImage("./sleigh.png");
};

_.setup = () => {
  _.createCanvas(w, h);
  _.angleMode("degrees");
  _.imageMode("center");
  restart();
};

_.draw = () => {
  _.background(52);
  _.translate(w / 2, h / 2);
  stars();
  _.fill(0, 0, 255);
  _.noStroke();
  // _.circle(0, 0, 2 * EarthR);
  _.image(globeImage, 0, 0, 2 * EarthR, 2 * EarthR);
  _.fill(255, 255, 0, 100);
  const targetW = target.maxX - target.minX;
  const targetH = target.maxY - target.minY;
  _.rect(target.minX, target.minY, targetW, targetH);
  _.fill(255);
  _.textSize(fontSize);
  _.textAlign("center");
  _.text(text, -textBoxSize, -fontSize / 2, 2 * textBoxSize, textBoxSize);
  const sleighToEarth = p5.Vector.mult(sleigh.s, -1);
  sleigh.applyForce(sleighToEarth.setMag(0.01));
  if (phase === "pause") {
    _.stroke(255);
    const mouseS = _.createVector(_.mouseX - w / 2, _.mouseY - h / 2); // Account for translation
    sleigh.v = p5.Vector.sub(mouseS, sleigh.s).mult(0.04);
    _.strokeWeight(4);
    if (text === "") {
      _.line(sleigh.s.x, sleigh.s.y, mouseS.x, mouseS.y);
    }
  } else if (phase === "play") {
    sleigh.update();
    const EarthS = _.createVector(0, 0);
    const isCrashed = areOverlapping(EarthS, EarthR, sleigh.s, sleigh.r);
    if (isCrashed) {
      text = "CRASHED!";
      phase = "pause";
      setTimeout(restart, 2000);
    }
    const isXInTarget = target.minX < sleigh.s.x && sleigh.s.x < target.maxX;
    const isYInTarget = target.minY < sleigh.s.y && sleigh.s.y < target.maxY;
    const isInTarget = isXInTarget && isYInTarget;
    if (isInTarget && halfOrbitIsComplete) {
      text = "SUCCESS!";
      phase = "pause";
      setTimeout(restart, 2000);
    }
    if (sleigh.s.y > EarthR) {
      halfOrbitIsComplete = true;
      console.log("HALF ORBIT!");
    }
  }
  sleigh.draw();
  _.push();
  let theta = _.atan(sleigh.s.y / sleigh.s.x) + 90;
  if (sleigh.s.x < 0) {
    theta += 180;
  }
  _.translate(sleigh.s.x, sleigh.s.y);
  _.rotate(theta);
  _.image(sleighImage, 0, 0, 200, 200);
  _.pop();
};

_.mouseClicked = () => {
  if (phase === "pause") {
    phase = "play";
  }
};
