import p5 from "p5";
import Ball from "./Ball";

const g = 0.2; // instead of 9.81m/s^2

const _ = new p5(() => {});

let ball: Ball;

_.setup = () => {
  _.createCanvas(600, 600);
  // ball = new Ball(_, _.width / 2, _.height / 2, 20, g);
};

_.draw = () => {
  ball.update();
  ball.draw();
};
