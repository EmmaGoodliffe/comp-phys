import p5 from "p5";

export default class Particle {
  r: number;
  constructor(public _: p5, public s: p5.Vector) {
    this.r = 5;
  }
  shouldStop(snowflake: Particle[]): boolean {
    if (this.s.x < 0) {
      return true;
    }
    let result = false;
    for (const other of snowflake) {
      const distance = p5.Vector.dist(this.s, other.s);
      if (distance < 2 * this.r) {
        result = true;
        break;
      }
    }
    return result;
  }
  update(): void {
    const { _ } = this;
    this.s.x += -1;
    this.s.y += _.random(-1, 1);
  }
  draw(): void {
    const { _ } = this;
    _.stroke(255);
    _.fill(255, 200);
    _.circle(this.s.x, this.s.y, 2 * this.r);
  }
}
