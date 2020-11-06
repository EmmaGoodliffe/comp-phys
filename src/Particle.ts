import p5 from "p5";

interface Inputs {
  g: number;
  G: number;
  mouseMass: number;
  attractors: Particle[];
  widthToMassRatio: number;
  lengthToAccelerationRatio: number;
}

export default class Particle {
  s: p5.Vector;
  v: p5.Vector;
  a: p5.Vector;
  w: number;
  hue: number;
  arrow: Arrow;
  constructor(public _: p5, public m = 1) {
    const x = _.random(1, _.width);
    const y = _.random(1, _.height);
    this.s = _.createVector(x, y);
    this.v = _.createVector(0, 0);
    this.a = _.createVector(0, 0);
    this.w = m;
    this.hue = 192;
    this.arrow = new Arrow(_, this.s, this.a);
  }
  applyForce(force: p5.Vector): void {
    const a = p5.Vector.div(force, this.m);
    this.a.add(a);
  }
  private constrain() {
    const { _, s } = this;
    s.x = _.constrain(s.x, 0, _.width);
    s.y = _.constrain(s.y, 0, _.height);
  }
  private bounce() {
    const { _, s, v, w } = this;
    const radius = w / 2;
    if (s.x - radius <= 0 || s.x + radius >= _.width) {
      v.x *= -1;
      // this.v.mult(0.5);
    }
    if (s.y - radius <= 0 || s.y + radius >= _.height) {
      v.y *= -1;
      // this.v.mult(0.5);
    }
  }
  private getGravitationalAttraction(
    attractor: { s: p5.Vector; m: number },
    G: number,
  ) {
    const displacement = p5.Vector.sub(attractor.s, this.s);
    const distance = displacement.mag();
    const magnitude = (G * attractor.m * this.m) / distance ** 2;
    if (magnitude === Infinity || distance < 10) {
      return false;
    } else {
      const forceAttractorOnParticle = displacement.setMag(magnitude);
      return forceAttractorOnParticle;
    }
  }
  update(inputs: Inputs): void {
    const { _ } = this;
    const { g, G } = inputs;
    const forceEarthOnParticle = _.createVector(0, 1).setMag(this.m * g);
    this.applyForce(forceEarthOnParticle);
    const mouseS = _.createVector(_.mouseX, _.mouseY);
    const forceMouseOnParticle = this.getGravitationalAttraction(
      { s: mouseS, m: inputs.mouseMass },
      G,
    );
    forceMouseOnParticle && this.applyForce(forceMouseOnParticle);
    for (const attractor of inputs.attractors) {
      const forceAttractorOnParticle = this.getGravitationalAttraction(
        attractor,
        G,
      );
      if (forceAttractorOnParticle) {
        forceAttractorOnParticle.setMag(
          _.constrain(forceAttractorOnParticle.mag(), -1, 1),
        );
        this.applyForce(forceAttractorOnParticle);
      }
    }
    this.w = this.m * inputs.widthToMassRatio;
    this.arrow = new Arrow(_, this.s, this.a);
    this.v.add(this.a);
    this.bounce();
    this.v.setMag(_.constrain(this.v.mag(), 0, 3));
    this.s.add(this.v);
    this.a = _.createVector(0, 0);
  }
  draw(): void {
    const { _, s, w } = this;
    const strokeCol = _.color(`hsl(${this.hue}, 100%, 50%)`);
    _.stroke(strokeCol);
    _.strokeWeight(2);
    const fillCol = _.color(`hsla(${this.hue}, 100%, 50%, 0.5)`);
    _.fill(fillCol);
    _.circle(s.x, s.y, w);
    _.strokeWeight(3);
    this.arrow.draw();
  }
}

class Arrow {
  line: p5.Vector;
  tips: [p5.Vector, p5.Vector];
  constructor(public _: p5, public s: p5.Vector, a: p5.Vector) {
    // this.line = a.copy().mult(lengthToAccelerationRatio);
    this.line = a.copy().setMag(20);
    this.tips = [this.createTip(1), this.createTip(-1)];
  }
  createTip(direction: 1 | -1) {
    const { _ } = this;
    const baseR = this.line.mag();
    const baseTheta = _.atan(this.line.y / this.line.x);
    const thetaAdjustment = 45 * direction;
    let theta = baseTheta + 180 + thetaAdjustment;
    if (this.line.x < 0) {
      theta += 180;
    }
    const r = baseR / 4;
    const x = r * _.cos(theta);
    const y = r * _.sin(theta);
    const tip = _.createVector(x, y);
    return tip;
  }
  draw() {
    const { _, s } = this;
    const absLine = p5.Vector.add(s, this.line);
    _.line(s.x, s.y, absLine.x, absLine.y);
    for (const tip of this.tips) {
      _.line(absLine.x, absLine.y, absLine.x + tip.x, absLine.y + tip.y);
    }
  }
}
