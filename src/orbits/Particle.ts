import p5 from "p5";

export default class Particle {
  s: p5.Vector;
  v: p5.Vector;
  a: p5.Vector;
  m: number;
  constructor(public _: p5, x: number, y: number, public r: number) {
    this.s = _.createVector(x, y);
    this.v = _.createVector();
    this.a = _.createVector();
    this.m = 1;
  }
  applyForce(force: p5.Vector): void {
    this.a.add(p5.Vector.div(force, this.m));
  }
  update(): void {
    this.v.add(this.a);
    this.s.add(this.v);
    this.a.mult(0);
  }
  draw(): void {
    const { _ } = this;
    _.fill(255);
    _.noStroke();
    _.circle(this.s.x, this.s.y, 2 * this.r);
  }
}
