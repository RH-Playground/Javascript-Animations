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