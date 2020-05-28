var canvas = document.getElementById('main-canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//beckground canvas

var bgCanvas = document.createElement('canvas');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

var bgCtx = bgCanvas.getContext('2d');



//text rendering
bgCtx.font = '300px impact';
bgCtx.fontStyle = '#ffffff';
bgCtx.fillText('NICE !', 50, 275);