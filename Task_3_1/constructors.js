function Ball(x, y, radius) {


    this.radius = radius;
    this.id = null;
    this.dx = 1;
    this.dy =2;
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.stroke();
        ctx.closePath();
        if (paused && indexElement == this.id && selectedItem) {
            this.dx = (cursorPositionX - this.x) / 50;
            this.dy = (cursorPositionY - this.y) / 50;

            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";

            ctx.moveTo(this.x, this.y);
            ctx.lineTo(cursorPositionX, cursorPositionY);

            var angle = (Math.atan2(cursorPositionY - this.y, cursorPositionX - this.x))
            ctx.lineTo(cursorPositionX - 10 * Math.cos(angle - Math.PI / 6), cursorPositionY - 10 * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(cursorPositionX, cursorPositionY);
            ctx.lineTo(cursorPositionX - 10 * Math.cos(angle + Math.PI / 6), cursorPositionY - 10 * Math.sin(angle + Math.PI / 6));

            ctx.stroke();
        }
        else if (indexElement == this.id) {
            var toX = this.dx * 50 + this.x;
            var toY = this.dy * 50 + this.y;

            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(toX, toY);
            var angle = (Math.atan2(toY - this.y, toX - this.x))
            ctx.lineTo(toX - 10 * Math.cos(angle - Math.PI / 6), toY - 10 * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(toX, toY);
            ctx.lineTo(toX - 10 * Math.cos(angle + Math.PI / 6), toY - 10 * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }
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

    this.draw = function () {
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath();
    }
}