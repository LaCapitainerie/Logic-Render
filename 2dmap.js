function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < mapY; y++) {
        for (let x = 0; x < mapX; x++) {
            ctx.beginPath();
            ctx.fillStyle = map[y*mapX+x]==1?"#000":"#00000069";
            ctx.fillRect(x*mapS+offset, y*mapS+offset, mapS-offset, mapS-offset);
            ctx.stroke();
        };
    };

    ctx.ellipse(pos_x_source, pos_y_source, 5, 5, 360, 0, 360);

    ctx.strokeStyle = "#F0F";
    ctx.beginPath();
    ctx.moveTo(pos_x, pos_y);
    ctx.lineTo(pos_x.get()*pos_delta_x*5,pos_y.get()*pos_delta_y*5);
    ctx.stroke();

};