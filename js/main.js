
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
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    elm;


    constructor() {
      this.elm = document.createElement("div");
      this.elm.classList.add("ballon");
      this.elm.style.left = `${this.x}px`;
      this.elm.style.top = `${this.y}px`;
      this.elm.style.backgroundColor = `rgb(${this.r},${this.g},${this.b})`;
      document.body.append(this.elm);
    }
    move() {
      this.x += this.dx;
      this.y += this.dy;

      const r1 = divElm.offsetWidth / 2;
      const r2 = 50 / 2;
      const xDiff = this.x + r2 - divElm.offsetLeft;
      const yDiff = this.y + r2 - divElm.offsetTop;
      const hypot = Math.hypot(xDiff, yDiff);         

      if (hypot <= (r1 + r2 + 5)){
          const slope = Math.abs(yDiff / xDiff);
          const angle = Math.abs(Math.atan(slope));

          let translateY = (r1 + r2 +3) * Math.sin(angle);
          let translateX = (r1 + r2 +3 ) * Math.cos(angle);

          if (xDiff > 0) {
              this.x = divElm.offsetLeft + translateX - r2;
          }else {
              this.x = divElm.offsetLeft - translateX - r2;
          }
          if (yDiff > 0){
              this.y = divElm.offsetTop + translateY - r2;
          }else{
              this.y = divElm.offsetTop - translateY - r2;
          }
          divElm.style.backgroundColor = `rgb(${this.r},${this.g},${this.b})`;
          this.dy = -this.dy;
          this.dx = -this.dx;
      }  

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