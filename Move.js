var pos_delta_x = Math.cos(pangle) * 5; // En réalité Const
var pos_delta_y = Math.sin(pangle) * 5; // Car update Perma

function move(key) {
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.stroke();
	context.beginPath();
	context.clearRect(0, 0, ecran.width, ecran.height);
	context.stroke();
	switch (key) {
		case 'd':
			pangle += 0.1;
			if(pangle>2*Math.PI){
				pangle-=2*Math.PI;
			};
			pos_delta_x = Math.cos(pangle) * 5;
			pos_delta_y = Math.sin(pangle) * 5;
			break;

		case 'a':
			pangle -= 0.1;
			if(pangle<0){
				pangle+=2*Math.PI;
			};
			pos_delta_x = Math.cos(pangle) * 5;
			pos_delta_y = Math.sin(pangle) * 5;
			break;

		case 's':
			pos_x -= pos_delta_x;
			pos_y -= pos_delta_y;
			break;

		case 'w':
			pos_x += pos_delta_x;
			pos_y += pos_delta_y;
			break;
	
		default:
			break;
	};

	draw();
	raycast(30);
};