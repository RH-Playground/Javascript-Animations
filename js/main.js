
/*===============Moving Cursor================= */

const divElm = document.createElement('div');
let tmrId = null;

divElm.classList.add('cursor');
document.body.append(divElm);

function detectStaticPos(){
    divElm.style.opacity = '0';
}

document.body.addEventListener('mousemove',(eventData)=> {
    clearTimeout(tmrId);
    divElm.style.visibility = 'visible';
    divElm.style.opacity = '1';
    divElm.style.left = eventData.clientX + "px";
    divElm.style.top = eventData.clientY + "px";
    tmrId = setTimeout(detectStaticPos, 30000);
});

document.body.addEventListener('mouseleave',(eventData)=> {
    divElm.style.visibility = 'hidden';
});

 /*=========================Moving Balloons============================*/
class Ballon {
    dx = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
    dy = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
    x = Math.random() * (innerWidth - 50);
    y = Math.random() * (innerHeight - 50);
    r = Math.random() * 256;
    g = Math.random() * 256;
    b = Math.random() * 256;
    elm;


    constructor() {
      this.elm = document.createElement("div");
      this.elm.classList.add("ballon");
      this.elm.style.left = `${this.x}px`;
      this.elm.style.top = `${this.y}px`;
      this.elm.style.backgroundColor = `rgb(${this.r},${this.g},${this.g})`;
      document.body.append(this.elm);
    }
    move() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.x >= innerWidth - 50 || this.x <= 0) this.dx = -this.dx;
      if (this.y >= innerHeight - 50 || this.y <= 0) this.dy = -this.dy;
      this.elm.style.left = `${this.x}px`;
      this.elm.style.top = `${this.y}px`;
    }
    set() {
      this.dy = -this.dy;
      this.dx = -this.dx;
    }
  }
  let ballons = [];
  for (let i = 0; i < 60; i++) {
    ballons.push(new Ballon());
  }
  
  setInterval(() => {
    ballons.forEach((ballon) => ballon.move());
  }, 60);