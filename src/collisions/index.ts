import p5 from "p5";
import calculateTimeSteps from "./calculateTimeSteps";
import Square from "./Square";

const _ = new p5(() => {});

// Initialise
let squares: Square[] = [];
let collisions = 0;
let div: p5.Element;
let indexRatio = 0;
let slider: p5.Element;
let sliderValDiv: p5.Element;
let startButton;
let timeSteps: number;
let timeStepsDiv: p5.Element;

const start = () => {
  squares = [];
  squares.push(new Square(_, 100, 1));
  const m2 = 100 ** indexRatio;
  squares.push(new Square(_, 200, m2, -1));
  collisions = 0;
};

_.setup = () => {
  _.createCanvas(400, 400);
  start();
  div = _.createDiv();
  sliderValDiv = _.createDiv();
  slider = _.createSlider(0, 8, 0);
  startButton = _.createButton("Start");
  startButton.mousePressed(start);
  timeStepsDiv = _.createDiv();
};

_.draw = () => {
  _.background(32);
  _.noStroke();
  for (let i = 0; i < timeSteps; i++) {
    // If they are colliding, bounce them off each other
    if (squares[0].colliding(squares[1])) {
      const v1 = squares[0].bounce(squares[1]);
      const v2 = squares[1].bounce(squares[0]);
      squares[0].v = v1;
      squares[1].v = v2;
      collisions++;
    }
    // If the first one is touching the wall, invert its velocity
    if (squares[0].x <= 0) {
      squares[0].v *= -1;
      collisions++;
    }
    // Update squares
    squares[0].update();
    squares[1].update();
  }
  // Draw squares
  squares[0].draw(_);
  squares[1].draw(_);
  // Show number of collisions
  _.fill(255);
  div.html(`Number of collisions: ${collisions}`);
  indexRatio = parseFloat(`${slider.value()}`);
  sliderValDiv.html(`Mass ratio: 100<sup>${indexRatio}</sup>`);
  timeSteps = calculateTimeSteps(indexRatio);
  timeStepsDiv.html(`Time: ${timeSteps}x`);
};
