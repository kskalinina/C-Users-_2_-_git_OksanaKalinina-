import { Position } from "./position.js";
import {PlanetRender} from "./renders";
class Planet {
  x;
  y;
  center;
  radius;
  speed;
  alpha;
  isMoving;
  planetRender;


  constructor(center, radius = 50, speed = 0.1, planetRender ) {
    this.center = center;
       this.radius = radius
    this.speed = speed
    this.alpha = 0
    this.isMoving = speed !== 0;
    this.position = new Position(center.x,center.y);
    this.planetRender = planetRender;
  }

  move() {
    if (this.isMoving) {
      this.alpha += (this.speed * Math.PI) / 180;
      this.position.x = this.radius * Math.sin(this.alpha) + this.center.x;
      this.position.y = this.radius * Math.cos(this.alpha) + this.center.y;
    }
  }

  render(ctx) {
      this.planetRender.render(ctx, this.position);
    }
}
class Earth extends Planet{
  moon;
  constructor(center) {
    super( center, 100,2.2, new PlanetRender(30,'blue'));
    this.moon = new Planet(this.position, 50, 1.3, new PlanetRender(10,'#aaa'));
  }
  move (){
    super.move();
    this.moon.move();
  }
  render(ctx) {
    super.render(ctx);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.position.x+10, this.position.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath()
    this.moon.render(ctx)
  }
}


export
  { Planet,
  Earth}
