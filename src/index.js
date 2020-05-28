const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//beckground canvas

let bgCanvas = document.createElement('canvas');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let bgCtx = bgCanvas.getContext('2d');

//text rendering
bgCtx.beginPath();
bgCtx.font = '300px impact';
bgCtx.fontStyle = '#ffffff';
bgCtx.fillText('NICE !', 100, 275);

let imageData, pixel, width, height;

imageData = bgCtx.getImageData(0, 0, bgCanvas.width, bgCanvas.height);
const densess = 14; //Gaps
var circlRadius = 6;
var timeout = 40;








//clear the on screen canvas
var clear = function () {
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
};


var circles = [];

var mouse = { x: undefined, y: undefined, radius: 30 }

//space key pres (Back to Default)
var spaceKeyPrassed = false;
//space key down
window.addEventListener('mousemove', onMouseEnter);
window.addEventListener('mouseout', onMouseOut);

//Space key press (Back to default)
let spaceKeyPressed = false;

//space key Down
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) spaceKeyPressed = true;
});
//space key Up
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) spaceKeyPressed = false;
});


const init = () => {
    for (height = 0; height < bgCanvas.height; height += densess) {
        for (width = 0; width < bgCanvas.width; width += densess) {

            pixel = imageData.data[(width + height * bgCanvas.width) * 4 - 1];
            if (pixel == 255) {
                drawCircle(width, height);
            }


        }

    }

}




///All circle need reandered


const drawCircle = (x, y) => {
    let startX = Math.random() * canvas.width;
    let startY = Math.random() * canvas.height;
    var velX = (x - startX) / timeout;
    var velY = (y - startY) / timeout;
    circles.push({
        gX: x,
        gY: y,
        stX: startX, //start X
        stY: startY, //start Y
        vel: { x: velX, y: velY }, //Velocity
        rels: true,
        col: 'yellow'
    });


}
function renderCircles(circles = {}, render) {
    for (var i = 0; i < circles.length; i++) {
        var circ = circles[i];
        // console.log(circles);
        ctx.beginPath();
        ctx.arc(circ.stX, circ.stY, circlRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = circles[i].col;
        ctx.closePath();
        ctx.fill();
        render(circ);
    }
}


renderCircles(circles);
init();

let itercount = 0;
let colors = ['#f40552', '#f6acc8', '#95389e', '#2c003e', '#342ead']

function update() {
    itercount++;
    clear();
    //Rendering

    renderCircles(circles, (circ) => {
        if (circ.rels == true) {
            circ.stX += circ.vel.x;
            circ.stY += circ.vel.y;
        }
        if (itercount == timeout) {
            circ.vel = { x: Math.random() * 6 * 2 - 6, y: Math.random() * 6 * 2 - 6 };
            circ.rels = false;
        }
        if (isCurcleCollided(circ.stX, circ.stY, circlRadius, mouse.x, mouse.y, mouse.radius)) {
            circ.rels = true;
            circ.col = colors[Math.floor(Math.random() * colors.length)];
        }

        if (spaceKeyPressed && circ.rels) {
            itercount = -50;
            var velX = (circ.gX - circ.stX) / (timeout + 50);
            var velY = (circ.gY - circ.stY) / (timeout + 50);

            //New Velocity Toward efault position
            circ.vel.x = velX;

            circ.vel.y = velY;
        }


        //window collision
        if (circ.stX + circlRadius > window.innerWidth || circ.stX - circlRadius < 0) {
            circ.vel.x *= -1;
        }
        if (circ.stY + circlRadius > window.innerHeight || circ.st - circlRadius < 0) {
            circ.vel.y *= -1;
        }

    });

}

setInterval(update, timeout);

//circle collision
function isCurcleCollided(x, y, radius, x1, y1, radius1) {
    if (Math.abs(x1 - x) > radius1 + radius && Math.abs(y1 - y) > radius1 + radius) {
        return false;
    } else {
        let dx = x1 - x;
        let dy = y1 - y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        //double checking
        if (distance < radius1 + radius) {
            return true;
        }
    }
    return false;
}

// On mouse Over circles

function onMouseEnter(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    mouseOnScreen = true;
}
function onMouseOut(event) {
    mouse.x = undefined;
    mouse.y = undefined;

    mouseOnScreen = false;
}