import p5 from "p5";
import Particle from "./Particle";

interface Checkbox extends p5.Element {
  checked: () => boolean;
}

const _ = new p5(() => {});

const settings = {
  reflect: false,
  rotate: false,
  chaos: 3,
  radius: 5,
  fast: false,
};

let snowflake: Particle[] = [];
let p: Particle;
let chaosInput: p5.Element;
let chaosDiv: p5.Element;
let radiusInput: p5.Element;
let radiusDiv: p5.Element;

const restart = () => {
  snowflake = [];
  p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);
};

_.setup = () => {
  _.createCanvas(600, 600);
  const reflectInput = _.createCheckbox("Reflect") as Checkbox;
  reflectInput.mouseClicked(() => (settings.reflect = reflectInput.checked()));
  const rotateInput = _.createCheckbox("Rotate") as Checkbox;
  rotateInput.mouseClicked(() => (settings.rotate = rotateInput.checked()));
  chaosDiv = _.createDiv().addClass("slider-value");
  chaosInput = _.createSlider(1, 6, settings.chaos);
  _.createElement("br");
  radiusDiv = _.createDiv().addClass("slider-value");
  radiusInput = _.createSlider(1, 8, settings.radius);
  const fastInput = _.createCheckbox("Fast") as Checkbox;
  fastInput.mouseClicked(() => (settings.fast = fastInput.checked()));
  _.createButton("Restart").mouseClicked(restart);

  p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);
};

_.draw = () => {
  _.background(32);
  _.translate(_.width / 2, _.height / 2);
  if (!settings.fast) {
    p.update(settings.chaos);
    p.draw();

    if (p.shouldStop(snowflake)) {
      snowflake.push(p);
      p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);
    }
  } else {
    _.rotate((2 * Math.PI) / 12);
    let n = 0;
    while (!p.shouldStop(snowflake)) {
      p.update(settings.chaos);
      n++;
    }

    if (n > 0) {
      snowflake.push(p);
      p = new Particle(_, _.createVector(_.width / 2, 0), settings.radius);
    }
  }

  for (let i = 0; i < (settings.rotate ? 6 : 1); i++) {
    settings.rotate && _.rotate((2 * Math.PI) / 6);

    for (const other of snowflake) {
      other.draw();
    }

    if (settings.reflect) {
      _.push();
      _.scale(1, -1);
      for (const other of snowflake) {
        other.draw();
      }
      _.pop();
    }
  }

  settings.chaos = chaosInput.value() as number;
  settings.radius = radiusInput.value() as number;
  chaosDiv.html(`Max. random y value: ${settings.chaos}`);
  radiusDiv.html(`Radius: ${settings.radius}`);
};
