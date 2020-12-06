import p5 from "p5";

export default class Particle {
  constructor(public _: p5, public s: p5.Vector, public r: number) {}
  shouldStop(snowflake: Particle[]): boolean {
    if (this.s.x < 1) {
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
  update(chaos: number): void {
    const { _ } = this;
    this.s.x += -1;
    this.s.y += _.random(-chaos, chaos);

    const magnitude = this.s.mag();
    let theta = this.s.heading();
    theta = _.constrain(theta, 0, (2 * Math.PI) / 12);
    this.s = p5.Vector.fromAngle(theta);
    this.s.setMag(magnitude);
  }
  draw(): void {
    const { _ } = this;
    _.stroke(255);
    _.fill(255, 200);
    _.circle(this.s.x, this.s.y, 2 * this.r);
  }
}
