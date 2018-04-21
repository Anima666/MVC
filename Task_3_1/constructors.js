function Ball(x, y, radius) {
    this.isArrow = false;
    this.idArrow = null;
    this.radius = radius;
    this.dx = randomDx();
    this.dy = randomDy();
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.stroke();
        ctx.closePath();
    };
    this.speed = function() {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function() {
        return (this.y + this.radius >= canvas.height)
    }
}

function Wall(x,y,x2,y2) {

    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;

    this.color = randomColor();



    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.x2, this.y2);
    }
}

function Arrow(x, y, x2, y2,ball) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    var headlen = 10;
    var angle = (Math.atan2(this.y2 - this.y, this.x2 - this.x));


    this.draw = function () {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "red";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - headlen * Math.cos(angle - Math.PI / 6), this.y2 - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - headlen * Math.cos(angle + Math.PI / 6), this.y2 - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }
}




 
//        var coord = getPosition(ee);
//        var endPosX = coord.x;
//        var endPosY = coord.y;
//        //alert(endPosX+" "+endPosY);
//        var c = document.getElementById("myCanvas");
//        var ctx = c.getContext("2d");
//        var headlen = 10; // length of head in pixels
//        var angle = Math.atan2(endPosY - startPosY, endPosX - startPosX);
//        ctx.beginPath();
//        ctx.moveTo(startPosX, startPosY);
//        ctx.lineWidth = 15;
//        ctx.strokeStyle = "#ff0000"; // цвет линии
//        ctx.lineTo(endPosX, endPosY);
        
//        ctx.moveTo(endPosX, endPosY);
//        ctx.stroke();
//        ctx.closePath();

//    });
//}