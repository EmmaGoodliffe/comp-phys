import { writeFileSync } from "fs";
import fetch from "node-fetch";
import { resolve } from "path";

const url = "https://editor.p5js.org/editor/EmmaG/projects";
const path = resolve(__dirname, "../../src/sketches.json");

interface Sketch {
  name: string;
  id: string;
}

const run = async () => {
  const response = await fetch(url);
  const json: Sketch[] = await response.json();
  const miniJson = json.map(sketch => ({
    name: sketch.name,
    id: sketch.id,
  }));
  writeFileSync(path, JSON.stringify(miniJson));
};

run().catch(console.error);
