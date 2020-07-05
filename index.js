document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

let color_picker = document.querySelectorAll('.color')[0];
console.log(color_picker);

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchmove', touchMove);
canvas.addEventListener('touchend', touchEnd);

$(document).ready(function () {
    $("#c1").click(function () {
        color_picker = document.querySelectorAll('.color')[1];
        $(this).css("border", "2px solid red");
        $("#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c2").click(function () {
        color_picker = document.querySelectorAll('.color')[2];
        $(this).css("border", "2px solid red");
        $("#c1,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c3").click(function () {
        color_picker = document.querySelectorAll('.color')[3];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c4,#c5,#c6,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c4").click(function () {
        color_picker = document.querySelectorAll('.color')[4];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c5,#c6,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c5").click(function () {
        color_picker = document.querySelectorAll('.color')[5];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c6,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c6").click(function () {
        color_picker = document.querySelectorAll('.color')[6];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c7,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c7").click(function () {
        color_picker = document.querySelectorAll('.color')[13];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c8,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c8").click(function () {
        color_picker = document.querySelectorAll('.color')[8];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c9,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c9").click(function () {
        color_picker = document.querySelectorAll('.color')[9];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c_10,#c_11,#c_12").css("border", "none");
    });
    $("#c_10").click(function () {
        color_picker = document.querySelectorAll('.color')[10];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c_11,#c_12").css("border", "none");
    });
    $("#c_11").click(function () {
        color_picker = document.querySelectorAll('.color')[11];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c_10,#c_12").css("border", "none");
    });
    $("#c_12").click(function () {
        color_picker = document.querySelectorAll('.color')[12];
        $(this).css("border", "2px solid red");
        $("#c1,#c2,#c3,#c4,#c5,#c6,#c7,#c8,#c9,#c_10,#c_11").css("border", "none");
    });
});

function start(e) {
    isDrawing = true;
    draw(e);
}


function draw({
    clientX: x,
    clientY: y
}) {
    if (!isDrawing) return;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = color_picker.getAttribute("value");

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stop() {
    isDrawing = false;
    ctx.beginPath();
}


window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();


// 後台顯示開始及結束時間

let entertime;

window.onload = function () {
    entertime = new this.Date();
    this.console.log("開始測驗時間" + " " + entertime);
}

function stopTest() {
    var stoptime = new this.Date();
    console.log("結束測驗時間" + " " + stoptime);
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
    let time = stoptime - entertime;
    console.log('操作時間總共 : ' + time / 1000 + '秒');
}

function touchStart(e) {
    this.draw = true;
    this.ctx = this.getContext("2d");
    this.touch = e.targetTouches[0];
    this.ctx.strokeStyle = color_picker.getAttribute("value");
    this.ctx.lineWidth = 6;

    var o = this;
    this.offsetX = this.offsetLeft;
    this.offsetY = this.offsetTop;

    while (o.offsetParent) {
        o = o.offsetParent;
        this.offsetX += o.offsetLeft;
        this.offsetY += o.offsetTop;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.touch.pageX - this.offsetX, this.touch.pageY - this.offsetY);
    e.preventDefault();
}

function touchMove(e) {
    this.touch = e.targetTouches[0];
    if (this.draw) {
        this.ctx.lineTo(this.touch.pageX - this.offsetX, this.touch.pageY - this.offsetY);
        this.ctx.stroke();
    }
    e.preventDefault();
}

function touchEnd(e) {
    this.draw = false;
    e.preventDefault();
}