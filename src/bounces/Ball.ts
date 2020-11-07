import p5 from "p5";

export default class Ball {
  s: p5.Vector;
  v: p5.Vector;
  a: p5.Vector;
  m: number;
  hue: number;
  constructor(public _: p5, x: number, y: number, public w: number, g: number) {
    this.s = _.createVector(x, y);
    this.v = _.createVector(0, 0);
    this.a = _.createVector(0, g);
    this.m = 1;
    this.hue = Math.floor(_.random(0, 360));
  }
  private bounce() {
    const { _, s, v, w } = this;
    const radius = w / 2;
    if (s.x - radius <= 0 || s.x + radius >= _.width) {
      v.x *= -1;
    }
    if (s.y - radius <= 0 || s.y + radius >= _.height) {
      v.y *= -1;
    }
    this.s.x = _.constrain(this.s.x, radius, _.width - radius);
    this.s.y = _.constrain(this.s.y, radius, _.height - radius);
  }
  update(): void {
    this.v.add(this.a);
    this.bounce();
    this.s.add(this.v);
  }
  draw(): void {
    const { _, s, w } = this;
    const strokeCol = _.color(`hsl(${this.hue}, 100%, 50%)`);
    _.stroke(strokeCol);
    _.strokeWeight(2);
    const fillCol = _.color(`hsla(${this.hue}, 100%, 50%, 0.5)`);
    _.fill(fillCol);
    _.circle(s.x, s.y, w);
  }
}
