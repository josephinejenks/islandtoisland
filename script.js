var stoppedx = ballvx;
var stoppedy = ballvy;
var stoppedx2 = ballvx2;
var stoppedy2 = ballvy2;
var boxx = 0; // x coordinate for upper left corner of box
var boxy = 0; // y coordinate for upper left corner of box
var boxwidth = 550; 
var boxheight = 700;
var ballrad = 30;
var boxboundx = boxwidth+boxx-ballrad; // right boundary
var boxboundy = boxheight+boxy-2*ballrad; // bottom boundary
var inboxboundx = boxx+ballrad; // left boundary
var inboxboundy = boxy+2*ballrad; // top boundary
var ballx = inboxboundx; // initial x position of ball
var bally = 415; // initial y position of ball
var ballvx = 2.5; // horizontal displacement
var ballvy = -0.80; // vertical displacement
var ballx2 = boxboundx; // initial x position of ball2
var bally2 = 265; // initial y position of ball
var ballvx2 = -2.5; // horizontal displacement
var ballvy2 = 0.80; // vertical displacement
var ball = new Image();
var ball2 = new Image();
var bkg = new Image();
var ctx;
		/* var grad;
		var color;
		var hue = [
		[255,0,0],
		[255,255,0],
		[0,255,0],
		[0,255,255],
		[0,0,255],
		[255,0,255]
		]; */

		function init() {
			ball.src = "tramtest.png";
			ball2.src = "tramtest2.png";
			bkg.src = "background1.jpg";
			// var h;
			ctx = document.getElementById('canvas').getContext('2d');
			ctx.fillStyle = "white";
			/* grad = ctx.createLinearGradient(boxx,boxy,boxx+boxwidth,boxy+boxheight);
			for (h=0;h<hue.length;h++) {
				color = 'rgb('+hue[h][0]+','+hue[h][1]+','+hue[h][2]+')';
				grad.addColorStop(h*1/hue.length,color);
			} */
			
			changeImage();
			tidTwo = setInterval(changeImage, 23000);

			moveballs();
			tidOne = setInterval(moveballs,100);
		}

		function changeImage() {
			if (bkg.src.match("background2.jpg")) {
				bkg.src = "background1.jpg";
			}
			else {
				bkg.src="background2.jpg";
			}
			ctx.drawImage(bkg,boxx+2*ballrad,boxy+2*ballrad,boxwidth-4*ballrad,boxheight-4*ballrad);
		}

		/*function changebkg() {
			if (bkg.src = "background2.jpg") {
				bkg.src = "background1.jpg";
			}
			else {
				bkg.src = "background2.jpg";
			}
		} */

		function moveballs() {
			ctx.clearRect(boxx,boxy,boxwidth,boxheight); // erase ball display
			moveandcheck1(); // check ball position, and move ball
			moveandcheck2(); // check ball position, and move ball
			ctx.drawImage(bkg,boxx+2*ballrad,boxy+2*ballrad,boxwidth-4*ballrad,boxheight-4*ballrad); // redraw ball display
			ctx.drawImage(ball,ballx-ballrad,bally-ballrad,2*ballrad,2*ballrad);
			ctx.drawImage(ball2,ballx2-ballrad,bally2-ballrad,2*ballrad,2*ballrad);
			ctx.fillRect(boxx,boxy,2*ballrad,boxheight); //left wall
			ctx.fillRect(boxx+boxwidth-2*ballrad,boxy,2*ballrad,boxheight); //right wall
			ctx.fillRect(boxx,boxy,boxwidth,2*ballrad); //top wall
			ctx.fillRect(boxx,boxy+boxheight-2*ballrad,boxwidth,2*ballrad); //bottom wall
		}

		function moveandcheck1() {
			var nballx = ballx+ballvx; // Set tentative new x position
			var nbally = bally+ballvy; // Set tentative new y position
			if (nballx > boxboundx+1) { // Is this x value beyond the right wall?
				setTimeout(sendBack1,2000);	
			}
			else {
			ballx = nballx;
			bally = nbally;
			}
		}
		function sendBack1() {
			nballx = inboxboundx-2; // If so, send ball back to left wall
			nbally = 415; // And back to original y position
			ballx = nballx;
			bally = nbally;
			}

		function moveandcheck2() {
			var nballx2 = ballx2+ballvx2; // Set tentative new x position
			var nbally2 = bally2+ballvy2; // Set tentative new y position
			if (nballx2 < inboxboundx-1) { // Is this x value beyond the right wall?
				setTimeout(sendBack2,2000);
			}
			else {
			ballx2 = nballx2;
			bally2 = nbally2;
			}
		}

		function sendBack2() {
			nballx2 = boxboundx+2; // If so, send ball back to left wall
			nbally2 = 265; // And back to original y position
			ballx2 = nballx2;
			bally2 = nbally2;
		}

		/* function change() {
			ballvx = Number(document.f.hv.value);
			ballvy = Number(document.f.vv.value);
			return false; 
		} */

		function stopcc() {
			clearInterval(tidOne);
			// clearInterval(tidTwo);
			stoppedx = ballvx;
			stoppedy = ballvy;
			stoppedx2 = ballvx2;
			stoppedy2 = ballvy2;
			moveballs();
			return false;
		}

		function resume() {
			clearInterval(tidOne);
			// clearInterval(tidTwo);
			ballvx = stoppedx;
			ballvy = stoppedy
			ballvx2 = stoppedx2;
			ballvy2 = stoppedy2;
			tidOne = setInterval(moveballs,100);
			// tidTwo = setInterval(changebkg,2000)
			return false;
		}
