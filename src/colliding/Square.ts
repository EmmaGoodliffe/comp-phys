import p5 from "p5";

export default class Square {
  w: number;
  y: number;
  constructor(_: p5, public x: number, public m = 1, public v = 0) {
    this.w = 20;
    this.y = _.height - this.w;
  }
  update(): void {
    this.x += this.v;
  }
  collide(other: Square): boolean {
    const overlapping = this.x + this.w > other.x;
    return overlapping;
  }
  bounce(other: Square): number {
    const sumM = this.m + other.m;
    const diffM = this.m - other.m;
    // v = (dm * v1) + (2 * p2)
    //     --------------------
    //     m1 + m2
    const p2 = other.m * other.v;
    const numerator = diffM * this.v + 2 * p2;
    const denominator = sumM;
    const fraction = numerator / denominator;
    return fraction;
  }
  draw(_: p5): void {
    _.rect(this.x, this.y, this.w, this.w);
  }
}
