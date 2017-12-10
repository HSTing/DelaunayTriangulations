// algorithm functionable!!!
// modified helper triangle size
// add speed up/ speed down
// add prev function
// add title


// TBdone: Bkgd color, zoom in/out


var input, button, button2, button3, button4, button5, button6, button7, radio;
var margin = 10;
var points;
var highest;
var p0, p1, p2, pr;
var fps = 0;
var prev_fps=3;
var checked = [], unchecked = [], edges = [];
var width = 600, height = 600;
var triangles = [];
var findTriangle_result, triT, tirT_idx;
var outA, outB, outC;
var shareEdge;
var steps=0;
var step_checked = [];
var step_unchecked = [];
var step_edges = [];
var step_swap = [];
var step_point = [];
// var prev_edge = [];
var step_circle = [];
var helper = [];
var step_d = [];
var step_line = [];

var prev_step_checked = [];
var prev_step_unchecked = [];
var prev_step_edges = [];
var prev_step_swap = [];
var prev_step_point = [];
// var prev_prev_edge = [];
var prev_step_circle = [];
// var prev_helper = [];
var prev_step_d = [];
var prev_step_line = [];

var bkgd;
var unchecked_color, checked_color, word_color, init_pt_color;
var step_text_pt = [], step_text_info = [];
var prev_step_text_pt = [], prev_step_text_info =[];

function setup(){
	
	var title = createDiv('Delaunay Triangulations Pedagogical Aid&nbsp;&nbsp;<font size="2"><I>by <a href="mailto:sh3964@rit.edu"> Shih-Ting Huang</a></I></font>');
	title.position(margin, margin);

  	var c = createCanvas(600, 600);
  	background(0);
  	c.position(margin, title.height + margin);

  	var inputText = createDiv('# of points:');
	inputText.position(width+ margin*2, title.height + margin);

	input = createInput();
	input.style('width', '60px');
	input.position(width + margin*2, title.height + inputText.height + margin);

	button = createButton('Submit');
	button.position(width + input.width+ margin*2, title.height+ inputText.height + margin);
	button.mousePressed(initial);
	button.style('width', '60px');

	button2 = createButton('Run');
	button2.position(width + margin*2, title.height + (input.height + margin) * 2);
	button2.mousePressed(start);
	button2.style('width', '60px');

	// button3 = createButton('Pulse');
	// button3.position(width + margin*2, title.height + (input.height + margin) * 3);
	// button3.mousePressed(pulse);
	// button3.style('width', '60px');


	var step_title = createDiv('Steps:');
	step_title.position(width + margin*2, title.height +(input.height + margin) * 3);

	button4 = createButton('Prev<<');
	button4.position(width + margin*2, title.height +(input.height + margin) * 4);
	button4.mousePressed(prev);
	button4.style('width', '60px');
	
	button5 = createButton('Next>>');
	button5.position(width + margin*2 + button4.width , title.height + (input.height + margin) * 4);
	button5.mousePressed(next);
	button5.style('width', '60px');

	var speed_title = createDiv('Speed:');
	speed_title.position(width + margin*2, title.height + (input.height + margin) * 5);

	button6 = createButton('Down -');
	button6.position(width + margin*2, title.height + (input.height + margin) * 6);
	button6.mousePressed(speedDown);
	button6.style('width', '60px');

	button7 = createButton('Up +');
	button7.position(width + margin*2 + button6.width , title.height + (input.height + margin) * 6);
	button7.mousePressed(speedUp);
	button7.style('width', '60px');

	var color_title = createDiv('Bkgd color:');
	color_title.position(width + margin*2, title.height + (input.height + margin) * 7);

	radio = createRadio();
  	radio.option('black');
  	radio.option('white');
  	radio.position(width + margin*2, title.height + (input.height + margin) * 8);
	radio.style('width', '80px');
	radio.value('black');


	var goBack = createDiv("<a target='_blank' href='https://hsting.github.io/DelaunayTriangulations/'>Main page</a>");
	goBack.position(width + margin*2, title.height + (input.height + margin) * 10);
	// goBack.position(width + margin*2, height-goBack.height-margin);

	var reference = createDiv('Reference:');
	reference.position(width + margin*2, title.height + (input.height + margin) * 11 + goBack.height);
	// reference.position(width + margin*2, title.height + (input.height + margin) * 10);
	//<a href="#deTri">Delaunay Triangulations</a>	

	var wiki = createDiv("<a target='_blank' href='https://en.wikipedia.org/wiki/Delaunay_triangulation'>Delaunay triangulation wikipedia</a>");
	wiki.position(width + margin*2, title.height + (input.height + margin) * 11 + goBack.height + reference.height);
	// wiki.position(width + margin*2, title.height + (input.height + margin) * 10 + reference.height);

	
	var cnt_title = createDiv('Number of visitors');
	cnt_title.position(width + margin*2, height - cnt_title.height);
	// var cnt_visit = createDiv("<div align='center'><a href='http://www.free-website-hit-counter.com'><img src='http://www.free-website-hit-counter.com/c.php?d=9&id=109177&s=18' border='0' title='free website hit counter'></a><br / ><small></small></div>");
	
	// var cnt_visit = createDiv('<a href="http://www.reliablecounter.com" target="_blank"><img src="http://www.reliablecounter.com/count.php?page=hsting.github.io/DelaunayTriangulations/demo.html&digit=style/plain/12/&reloads=1" alt="" title="" border="0"></a><br />');
	var cnt_visit = createDiv('<a href="http://www.reliablecounter.com" target="_blank"><img src="http://www.reliablecounter.com/count.php?page=hsting.github.io/DelaunayTriangulations/demo.html2&digit=style/plain/6/&reloads=1" alt="" title="" border="0"></a><br />');
	cnt_visit.position(width + margin*2, height);

}


function draw() {
	// scale(1.1, 1.1);
	// translate(-width/10, -height/10);
	frameRate(fps);
	// frameRate(button4.value());
	bkgd = radio.value();
	background(bkgd);
	setColor(bkgd);
	// background(0);
	stroke('black');
	strokeWeight(1);
	noFill();
	rect(0, 0, width-1, height-1);

	if (step_unchecked.length > 0) {
		console.log("THIS STEPS", steps);
		steps--;


		// draw unchecked points
		// stroke(255, 255, 255, 100);
		stroke(unchecked_color);
		strokeWeight(10);
		this_step_unchecked = step_unchecked.shift();
		prev_step_unchecked.push(this_step_unchecked);
		for (var i=0; i < this_step_unchecked.length; i++) {
			point(this_step_unchecked[i][0], this_step_unchecked[i][1]);
		}

		// draw edges
		strokeWeight(1);
		stroke(checked_color);
		this_step_edges = step_edges.shift();
		prev_step_edges.push(this_step_edges);
		for (var i=0; i < this_step_edges.length; i++) {
			line(this_step_edges[i][0][0], this_step_edges[i][0][1], this_step_edges[i][1][0], this_step_edges[i][1][1]);
		}		

		// draw checked points
		stroke(checked_color);
		strokeWeight(10);
		this_step_checked = step_checked.shift();
		prev_step_checked.push(this_step_checked);
		for (var i=0; i < this_step_checked.length; i++) {
			point(this_step_checked[i][0], this_step_checked[i][1]);
		}

		// draw red this check point
		stroke(255, 0, 0);
		strokeWeight(15);
		this_step_point = step_point.shift();
		prev_step_point.push(this_step_point);
		point(this_step_point[0], this_step_point[1]);

		// draw illegal d point
		this_step_d = step_d.shift();
		prev_step_d.push(this_step_d);
		if (this_step_d.length > 0) {
			strokeWeight(12);
			point(this_step_d[0], this_step_d[1]);
			// textSize(32);
			// fill(0, 102, 153);
			// text("Illegal", this_step_d[0], this_step_d[1]);
		}

		fill(204, 101, 192, 127);
		noStroke();
		this_step_line = step_line.shift();
		prev_step_line.push(this_step_line);
		triangle(this_step_point[0], this_step_point[1], this_step_line[0][0], this_step_line[0][1], this_step_line[1][0], this_step_line[1][1]);	

		// noFill();
		// draw circle
		// stroke(255, 255, 0);
		stroke(255, 0, 0, 127);
		noFill();
		strokeWeight(3);
		this_step_circle = step_circle.shift();
		prev_step_circle.push(this_step_circle);
		ellipse(this_step_circle[0][0], this_step_circle[0][1], this_step_circle[1])

		// draw swap edge
		strokeWeight(3);
		stroke(255, 0, 0);
		this_step_swap = step_swap.shift();
		prev_step_swap.push(this_step_swap);
		if (this_step_swap.length > 0) {
			line(this_step_swap[0][0], this_step_swap[0][1], this_step_swap[1][0], this_step_swap[1][1]);
			textSize(20);
			// fill(100, 200, 255);
			fill(word_color);
			noStroke();
			textAlign(CENTER);
			text("Flip", (this_step_swap[0][0]+this_step_swap[1][0])/2, (this_step_swap[0][1]+this_step_swap[1][1])/2);
		}

		// var step_text_pt, step_text_info;
		// var prev_step_text_pt, prev_step_text_info;
		fill(init_pt_color);
		noStroke();
		textAlign(LEFT);
		textSize(18);

		var this_step_text_pt = [];
		this_step_text_pt = step_text_pt.shift();
		prev_step_text_pt.push(this_step_text_pt);
		text(this_step_text_pt, 2, 20);

		var this_step_text_info = [];
		this_step_text_info = step_text_info.shift();
		prev_step_text_info.push(this_step_text_info);
		text(this_step_text_info, 2, 40);


	} else {

		// draw checked points
		stroke(checked_color);
		strokeWeight(10);
		for (var i=0; i < checked.length; i++) {
			point(checked[i][0], checked[i][1]);
		}

		// draw out line
		strokeWeight(1);
		for (var i=0; i < edges.length; i++) {
			line(edges[i][0][0], edges[i][0][1], edges[i][1][0], edges[i][1][1]);
		}

		// draw unchecked points
		stroke(unchecked_color);
		strokeWeight(10);
		for (var i=0; i < unchecked.length; i++) {
			point(unchecked[i][0], unchecked[i][1]);
		}

		// find the new pr point
		if (unchecked.length > 0) {
			steps = 0;
			pr = unchecked.shift();
			console.log("THIS POINT", pr);
			checked.push(pr);
			stroke(255, 0, 0);
			point(pr[0], pr[1]);

			// find the triangle contains pr
			findTriangle_result = findTriangle(pr);
			triT = findTriangle_result[0];
			tirT_idx = findTriangle_result[1];
			console.log("THIS TRIANGLE", triT);

			// remove that triangles
			triangles.splice(tirT_idx, 1)

			// updata triangles
			triangles.push([pr, triT[0], triT[1]]);
			triangles.push([pr, triT[1], triT[2]]);
			triangles.push([pr, triT[2], triT[0]]);	
			
			// update edges
			edges.push([pr, triT[0]]);
			edges.push([pr, triT[1]]);
			edges.push([pr, triT[2]]);

			// swap test
			swapTest(pr, triT[0], triT[1]);
			swapTest(pr, triT[1], triT[2]);
			swapTest(pr, triT[2], triT[0]);

		} else {
			if (helper.length > 0) {
				deleteHelper();
			}

			// locate mouse in which triangle
			if (mouseIsPressed) {
				console.log("THIS mouseX, mouseY:", mouseX, mouseY);
				var tmp_x = mouseX;
				var tmp_y = mouseY;
				var mouse_circle_result = findTriangle([mouseX, mouseY]);
				if (mouse_circle_result != null) {
					console.log("THIS mouse_circle_result", mouse_circle_result);
					var mouse_circle = mouse_circle_result[0];
					console.log("THIS mouse_circle", mouse_circle);
					var mouse_circle_center = circleCenter(mouse_circle[0], mouse_circle[1], mouse_circle[2]);
					console.log("THIS mouse_circle_center", mouse_circle_center);
					var mouse_circle_r = distant(mouse_circle_center, mouse_circle[0]);
					console.log("THIS mouse_circle_r", mouse_circle_r);
					
					// circle
					stroke(255, 0, 0, 127);
					noFill();
					strokeWeight(3);
					ellipse(mouse_circle_center[0], mouse_circle_center[1], mouse_circle_r*2);

					// triangle
					fill(204, 101, 192, 127);
					noStroke();
					triangle(mouse_circle[0][0], mouse_circle[0][1], mouse_circle[1][0], mouse_circle[1][1], mouse_circle[2][0], mouse_circle[2][1]);	
				
					// red point of triangle
					stroke(255, 0, 0);
					strokeWeight(10);
					point(mouse_circle[0][0], mouse_circle[0][1]);
					point(mouse_circle[1][0], mouse_circle[1][1]);
					point(mouse_circle[2][0], mouse_circle[2][1]);
				}
			}
			
		}

		// console.log("checked", checked);
		console.log("edges", edges);
		console.log("unchecked", unchecked);
		console.log("checked", checked);
		console.log("triangles", triangles);

		fill(init_pt_color);
		noStroke();
		textAlign(LEFT);
		textSize(18);
		if (checked.length > 0) {
			if (helper.length > 0) {
				text('#'.concat((checked.length-3).toString(), ' point'), 2, 20);
			} else {
				text('All points are done!', 2, 20);
			}
			
		}
		
	}



}

function deleteHelper() {
	console.log("DELETE HELPER");
	for(var i=0; i < helper.length; i++) {
		console.log("helper point:", helper[i]);

		for (var j=edges.length-1; j >= 0; j--) {
			console.log("edge", edges[j]);
			var query_edge = edges[j];
			if (query_edge[0] == helper[i] || query_edge[1] == helper[i]) {
				edges.splice(j, 1);
			}
		}


		for (var j=checked.length-1; j >= 0; j--) {
			console.log("point", checked[j]);
			var query_point = checked[j];
			if (query_point == helper[i]) {
				checked.splice(j, 1);
			}
		}

		for (var j=triangles.length-1; j >= 0; j--) {
			var query_tri = triangles[j];
			if (query_tri[0] == helper[i] || query_tri[1] == helper[i] || query_tri[2] == helper[i]) {
				triangles.splice(j, 1);
			}
		}
	}
	helper = [];
}

function swapTest(p, a, b) {
	console.log("SWAP TEST!!!!!");
	console.log("p", p);
	console.log("a", a);
	console.log("b", b);

	if (onOutEdge(a, b)) {
		console.log('a, b on the out edges');
		steps++;
		step_checked.push(checked.slice());
		step_unchecked.push(unchecked.slice());
		step_edges.push(edges.slice());
		step_swap.push([]);
		step_line.push([a, b].slice());
		step_point.push(p.slice());
		var center = circleCenter(p, a, b);
		var _p = distant(p, center);
		step_circle.push([center, _p*2].slice());
		step_d.push([]);
		step_text_pt.push(['#'.concat((checked.length-3).toString(), ' point')]);
		step_text_info.push('Test edge is on helper triangle');
		return;
	}
	var d = findShare(p, a, b);
	var swap_idx1;


	if (inCircle(p, a, b, d)) {	// d violates the incircle test: d inside pab
		if (helper.indexOf(d) > -1) {
			steps++;
			step_checked.push(checked.slice());
			step_unchecked.push(unchecked.slice());
			step_edges.push(edges.slice());
			step_swap.push([]);
			step_line.push([a, b].slice());
			step_point.push(p.slice());
			var center = circleCenter(p, a, b);
			var _p = distant(p, center);
			step_circle.push([center, _p*2].slice());
			step_d.push(d.slice());
			step_text_pt.push(['#'.concat((checked.length-3).toString(), ' point')]);
			step_text_info.push('InCircle point is on helper triangle');
			return;
		}
		console.log('SWAP!');

		// delete old edge ab
		while (edgeIndex(a, b) >= 0){
			swap_idx1 = edgeIndex(a, b);
			edges.splice(swap_idx1, 1);	
		}
		// add new edge pd
		edges.push([p, d]);

		// update triangles
		// delete abd
		var del_idx = triangleIndex(a, b, d);
		triangles.splice(del_idx, 1);
		del_idx = triangleIndex(p, a, b);
		triangles.splice(del_idx, 1);
		// add new pad, pdb 
		triangles.push([p, a, d]);
		triangles.push([p, d, b]);



		//
		steps++;
		step_checked.push(checked.slice());
		step_unchecked.push(unchecked.slice());
		step_edges.push(edges.slice());
		step_swap.push([p, d].slice());
		step_line.push([p, d].slice());
		step_point.push(p.slice());

		var last_circle = step_circle[step_circle.length - 1];
		step_circle.push(last_circle.slice());
		step_d.push(d.slice());

		step_text_pt.push(['#'.concat((checked.length-3).toString(), ' point')]);
		step_text_info.push('Edge Flipping');

		swapTest(p, a, d);
		swapTest(p, d, b);
	}

}

function edgeIndex(a, b) {
	for (var i=0; i<edges.length; i++) {
		if ((a == edges[i][0] && b == edges[i][1] ) || 
			(b == edges[i][0] && a == edges[i][1] )) {
			console.log("Find the edge index");	
			return i;
		}
	}
	console.log("Can't find the edge index");
	return -1;
}



function triangleIndex(a, b, c) {
	for (var i=0; i < triangles.length; i++) {
		if ((a == triangles[i][0] || a == triangles[i][1] || a == triangles[i][2]) && 
			(b == triangles[i][0] || b == triangles[i][1] || b == triangles[i][2]) && 
			(c == triangles[i][0] || c == triangles[i][1] || c == triangles[i][2]))
			return i;
	}
	console.log("Can't find the old triangle abc");
	return null;
}

function inCircle(p, a, b, d) {
	var center = circleCenter(p, a, b);
	var _p = distant(p, center);
	var _d = distant(d, center);

	steps++;
	step_checked.push(checked.slice());
	step_unchecked.push(unchecked.slice());
	step_edges.push(edges.slice());
	step_swap.push([]);
	step_line.push([a, b].slice());
	step_point.push(p.slice());
	step_circle.push([center, _p*2].slice());
	step_d.push([]);
	step_text_pt.push(['#'.concat((checked.length-3).toString(), ' point')]);
	step_text_info.push('Any point in Circle?');	

	if (_p > _d) {
		steps++;
		step_checked.push(checked.slice());
		step_unchecked.push(unchecked.slice());
		step_edges.push(edges.slice());
		step_swap.push([a, b].slice());
		step_line.push([a, b].slice());
		step_point.push(p.slice());
		step_circle.push([center, _p*2].slice());
		step_d.push(d.slice());
		step_text_pt.push(['#'.concat((checked.length-3).toString(), ' point')]);
		step_text_info.push('Found illegal point');	
		return true;
	} else {
		return false;
	}
} 

function distant(a, b) {
	var del_x = a[0] - b[0];
	var del_y = a[1] - b[1];
	var dis = Math.sqrt(del_x*del_x + del_y*del_y);
	return dis;
}

function circleCenter(a, b, c) {
	var yDelta_a = b[1] - a[1];
	var xDelta_a = b[0] - a[0];
	var yDelta_b = c[1] - b[1];
	var xDelta_b = c[0] - b[0];
	var center = [0, 0];
	var aSlope = yDelta_a/xDelta_a;
	var bSlope = yDelta_b/xDelta_b;
	center[0] = (aSlope*bSlope*(a[1] - c[1]) + bSlope*(a[0] + b[0]) - aSlope*(b[0] + c[0])) / (2 * (bSlope - aSlope));
	center[1] = -1 * (center[0] - (a[0] + b[0]) / 2) / aSlope + (a[1] + b[1]) / 2; 
	return center;
}	
// src: https://stackoverflow.com/questions/4103405/what-is-the-algorithm-for-finding-the-center-of-a-circle-from-three-points
// pt circleCenter(pt A, pt B, pt C) { 
// 	float yDelta_a = B.y - A.y; 
// 	float xDelta_a = B.x - A.x; 
// 	float yDelta_b = C.y - B.y; 
// 	float xDelta_b = C.x - B.x; 
// 	pt center = P(0,0); 
// 	float aSlope = yDelta_a/xDelta_a; 
// 	float bSlope = yDelta_b/xDelta_b; 
// 	center.x = (aSlopebSlope*(A.y - C.y) + bSlope*(A.x + B.x) - aSlope*(B.x+C.x) )/(2 (bSlope-aSlope) ); 
// 	center.y = -1*(center.x - (A.x+B.x)/2)/aSlope + (A.y+B.y)/2; 
// 	return center; 
// } 


function findShare(p, a, b) {
	console.log("FIND SHARE");
	console.log("p:", a);
	console.log("a:", a);
	console.log("b:", b);
	var shareTri;
	var share_idx;
	var d;
	for (var i=0; i < triangles.length; i++) {
		console.log("this triangle", i, triangles[i]);
		if (a == triangles[i][0] && b == triangles[i][1] ) {
			if ((triangles[i][2]) != p) {
				console.log("found point", i, triangles[i][2]);
				d = triangles[i][2];
				return d;
			}
			// opp.push(triangles[i][2]);
		} else if (a == triangles[i][0] && b == triangles[i][2]) {
			if ((triangles[i][1]) != p) {
				console.log("found point", i, triangles[i][1]);
				d = triangles[i][1];
				return d;
			}
			// opp.push(triangles[i][1]);
		} else if (a == triangles[i][1] && b == triangles[i][2]) {
			if ((triangles[i][0]) != p) {
				console.log("found point", i, triangles[i][0]);
				d = triangles[i][0];
				return d;
			}
			// opp.push(triangles[i][0]);
		} else if (b == triangles[i][0] && a == triangles[i][1] ) {
			if ((triangles[i][2]) != p) {
				console.log("found point", i, triangles[i][2]);
				d = triangles[i][2];
				return d;
			}
			// opp.push(triangles[i][2]);
		} else if (b == triangles[i][0] && a == triangles[i][2]) {
			if ((triangles[i][1]) != p) {
				console.log("found point", i, triangles[i][1]);
				d = triangles[i][1];
				return d;
			}
			// opp.push(triangles[i][1]);
		} else if (b == triangles[i][1] && a == triangles[i][2]) {
			if ((triangles[i][0]) != p) {
				console.log("found point", i, triangles[i][0]);
				d = triangles[i][0];
				return d;
			}
		}
			// opp.push(triangles[i][0]);
	}
	console.log("Can't find vertex opposite to edge ab");
	// if (triangles.length<3) {
	// 	console.log("Can't find 2 vertex to edge ab");
	// } else {
	// 	console.log("Find 2 vertex to edge ab");
	// }
	return d;
}

function onOutEdge(a, b) {
	if ((a == outA || a == outB || a == outC) && (b == outA || b == outB || b == outC)) {
		return true;
	} else {
		return false;
	}
}


function helpPoints() {
	p1 = [width/2, 0];
	checked.push(p1);
	// p2 = [0, height-margin];
	p2 = [width, height/2];
	checked.push(p2);
	// p3 = [width, height-margin];
	p3 = [0, height];
	checked.push(p3);
	outA = p1;
	outB = p2;
	outC = p3;
	edges.push([p1, p2]);
	edges.push([p2, p3]);
	edges.push([p3, p1]);
	triangles.push([p1, p2, p3]);
	helper.push(p1);
	helper.push(p2);
	helper.push(p3);
}


function start() {
	if (fps == 0) {
		console.log("start");
		button2.html("Pulse");
		fps = prev_fps;
		draw();
	} else {
		console.log("pulse");
		button2.html("Run");
		prev_fps = fps;
		fps = 0;
	}
	
}

function pulse() {
	console.log("pulse");
	if (fps > 0) {
		prev_fps = fps;
	}
	fps = 0;
}

function prev() {
	console.log("prev");
	if (prev_step_checked.length > 1) {
		for (var i=0; i < 2; i++) {
			steps++;
			step_checked.unshift(prev_step_checked.pop());	
			step_unchecked.unshift(prev_step_unchecked.pop());
			step_edges.unshift(prev_step_edges.pop());
			step_swap.unshift(prev_step_swap.pop());
			step_point.unshift(prev_step_point.pop());
			step_circle.unshift(prev_step_circle.pop());
			step_d.unshift(prev_step_d.pop());
			step_line.unshift(prev_step_line.pop());

			step_text_pt.unshift(prev_step_text_pt.pop());
			step_text_info.unshift(prev_step_text_info.pop());

		}
		redraw();
	}
}

function next() {
	console.log("next");
	redraw();
}

function speedDown() {
	if (fps>0){
		fps--;	
	}
}

function speedUp() {
	fps++;
}

function setColor(bkgd) { 
	if (bkgd == 'black') {
		unchecked_color = color(255, 255, 255, 100); 
		checked_color = 'yellow';
		word_color = color(100, 200, 255);
		init_pt_color = 'white';
		// circle_color, 
		// flip_edge_color, 
		// triangle_color;
	} else if (bkgd == 'white'){
		unchecked_color = color(0, 0, 0, 100); 
		checked_color = 'black'; 
		word_color = 'blue';
		init_pt_color = 'black';
		// circle_color, 
		// flip_edge_color, 
		// triangle_color;
	}

}


function initial() {
	clear();
	points = [];
	checked = [];
	unchecked = [];
	triangles = [];
	edges = [];
	steps=0;
	step_checked = [];
	step_unchecked = [];
	step_edges = [];
	step_swap = [];
	step_point = [];
	// prev_edge = [];
	step_circle = [];
	step_d = [];
	step_line = [];
	step_text_pt = [];
	step_text_info = [];

	prev_step_checked = [];
	prev_step_unchecked = [];
	prev_step_edges = [];
	prev_step_swap = [];
	prev_step_point = [];
	// prev_prev_edge = [];
	prev_step_circle = [];
	prev_helper = [];
	prev_step_d = [];
	prev_step_line = [];

	prev_step_text_pt = [];
	prev_step_text_info = [];

	bkgd = radio.value();
	setColor(bkgd);
	background(bkgd);
	strokeWeight(10);
	stroke(init_pt_color);
	for (var i=0; i < input.value(); i++) {
		var x = random(width/3, width/3 * 2);
		var y = random(height/3, height/3 * 2);
		// var x = random(width/8 * 3, width/8 * 5);
		// var y = random(height/8 * 3, height/8 * 5);
		point(x, y);
		points.push([x, y]);
		unchecked.push([x, y]);
	}
	stroke('black');
	strokeWeight(1);
	noFill();
	rect(0, 0, width-1, height-1);
	// // arbitray 3 points
	// for (var i=0; i < 3; i++) {
	// 	var x = random(width/3, width/3 * 2);
	// 	var y = random(height/3, height/6 * 5);
	// 	point(x, y);
	// 	points.push([x, y]);
	// 	unchecked.push([x, y]);
	// }

	helpPoints();	// create p1, p2, p3

	console.log(points);
}


function findTriangle(pr) {
	for (var i=0; i < triangles.length; i++) {
		var a = triangles[i][0], b = triangles[i][1], c = triangles[i][2];
		var b1, b2, b3;
		console.log("triangles", triangles[i]);
		b1 = sign(pr, a, b) < 0;
		b2 = sign(pr, b, c) < 0;
		b3 = sign(pr, c, a) < 0;

		if ((b1 == b2) && (b2 == b3)) {
			return [[a, b, c], i];
		}
	}
	console.log("Can't find a triangle contains pr");
	return null;
}

function sign (p1, p2, p3) {
	return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
}
