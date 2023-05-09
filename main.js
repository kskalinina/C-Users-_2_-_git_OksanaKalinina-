import { Earth, Planet } from "./src/solar-system.js";
import { Position } from "./src/position.js";
import { PlanetRender } from "./src/renders.js";

const canvas = document.getElementById('canvas');
const ctx =canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const centerPosition = new Position(canvas.width/2, canvas.height/2);
const sun = new Planet(centerPosition,100,0,new PlanetRender(10, 'red'));
const earth = new Earth(sun.position);

const planets =[
  sun,
  earth,
  new Planet(sun.position,250,0.7,new PlanetRender(15,'green')),
  new Planet(sun.position,180,1.5,new PlanetRender(35,'gold'))
];
let planet;

const render = () => {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }
       window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);




