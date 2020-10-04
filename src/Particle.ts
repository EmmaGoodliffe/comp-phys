import p5 from "p5";

export default class Particle {
  s: p5.Vector;
  v: p5.Vector;
  a: p5.Vector;
  w: number;
  hue: number;
  constructor(public _: p5, public m = 1) {
    this.s = _.createVector();
    this.v = _.createVector();
    this.a = _.createVector();
    this.w = 20 * m;
    this.hue = 192;
  }
  update(): void {
    const { _ } = this;
    this.v.add(this.a);
    this.s.add(this.v);
    this.a = _.createVector();
  }
  draw(): void {
    const { _, s, a, w, hue } = this;
    const strokeCol = _.color(`hsl(${hue}, 100%, 50%)`);
    _.stroke(strokeCol);
    _.strokeWeight(2);
    const fillCol = _.color(`hsla(${hue}, 100%, 50%, 0.5)`);
    _.fill(fillCol);
    _.circle(s.x, s.y, w);

    _.strokeWeight(3);
    const arrow = new Arrow(_, s, a, w);
    arrow.draw();
  }
}

class Arrow {
  line: p5.Vector;
  tips: [p5.Vector, p5.Vector];
  constructor(public _: p5, public s: p5.Vector, a: p5.Vector, w: number) {
    this.line = a.copy().setMag(1.5 * w);
    this.tips = [this.createTip(1), this.createTip(-1)];
  }
  createTip(direction: 1 | -1) {
    const { _ } = this;
    const baseR = this.line.mag();
    const baseTheta = _.atan(this.line.y / this.line.x);
    const thetaAdjustment = 45 * direction;
    const theta = baseTheta + 180 + thetaAdjustment;
    const r = baseR / 4;
    const x = r * _.cos(theta);
    const y = r * _.sin(theta);
    const tip = _.createVector(x, y);
    return tip;
  }
  draw() {
    const { _, s } = this;
    _.line(s.x, s.y, s.x + this.line.x, s.y + this.line.y);
    for (const tip of this.tips) {
      const absLine = p5.Vector.add(s, this.line);
      _.line(absLine.x, absLine.y, absLine.x + tip.x, absLine.y + tip.y);
    }
  }
}
