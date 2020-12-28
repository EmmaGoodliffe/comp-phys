import sketches from "./sketches.json";

const colour = "white";
const ul = document.querySelector("ul");

const getLi = (
  title: string,
  url: string,
  description: string,
  colour: string,
  classes = "",
) => `
<li class="${classes}">
  <div class="description">
    <a href="${url}">${title}</a>
    <p>${description}</p>
  </div>
  <div class="arrow">
    <a href="${url}" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="48"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" fill="${colour}" />
      </svg>
    </a>
  </div>
</li>
`;

const data: Record<string, string> = {
  Collisions: "Colliding blocks produce &pi;",
  Orbits: "Christmas game",
  Particles: "Random particle simulation",
  Snowflakes: "Brownian trees generate snowflakes",
};

const run = async () => {
  for (const title in data) {
    const url = title.toLowerCase();
    const description = data[title];
    const li = getLi(title, url, description, colour);
    if (ul) {
      ul.innerHTML += li;
    }
  }
  for (const sketch of sketches) {
    const title = sketch.name;
    const url = `https://editor.p5js.org/EmmaG/sketches/${sketch.id}`;
    const issueNumberHash = title.split(" ").filter(word => word[0] === "#")[0];
    const issueNumber = issueNumberHash && parseInt(issueNumberHash.slice(1));
    const gitHubUrl = `https://github.com/ml5js/ml5-library/issues/${issueNumber}`;
    let description = "<em>p5</em>";
    const isMl5 = title.toLowerCase().includes("ml5");
    let classes = "p5";
    if (isMl5) {
      description = `<em>ml5 demo for <a href="${gitHubUrl}">#${issueNumber}</a></em>`;
      classes = "ml5";
    }
    const li = getLi(title, url, description, colour, classes);
    if (ul) {
      ul.innerHTML += li;
    }
  }
};

run().catch(console.error);
