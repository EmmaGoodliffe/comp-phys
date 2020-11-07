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
  colliding(other: Square): boolean {
    return this.x + this.w > other.x;
  }
  bounce(other: Square): number {
    let diffM = this.m - other.m;
    // v = (dm * v1) + (2 * p2)
    //     --------------------
    //     m1 + m2
    let p2 = other.m * other.v;
    let numerator = diffM * this.v + 2 * p2;
    let denominator = this.m + other.m;
    let fraction = numerator / denominator;
    return fraction;
  }
  draw(_: p5): void {
    _.rect(this.x, this.y, this.w, this.w);
  }
}
