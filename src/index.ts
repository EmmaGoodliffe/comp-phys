const colour = "white";
const ul = document.querySelector("ul");

const getLi = (title: string, description: string, colour: string) => {
  const url = title.toLowerCase();
  return `
<li>
  <div class="description">
    <a href="${url}">${title}</a>
    <p>${description}</p>
  </div>
  <div class="arrow">
    <a href="collisions">
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
};

const data: Record<string, string> = {
  Collisions: "Colliding blocks produce &pi;",
  Orbits: "Christmas game",
  Particles: "Random particle simulation",
  Snowflakes: "Brownian trees generate snowflakes",
};

for (const title in data) {
  const description = data[title];
  const li = getLi(title, description, colour);
  if (ul) {
    ul.innerHTML += li;
  }
}
