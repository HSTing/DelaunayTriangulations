var input, button, button2, button3, button4, button5;
var margin = 10;
var points;
var highest;
var p0, p1, p2, pr;
var fps = 3;
var checked = [], unchecked = [], edges = [];
var width = 600, height = 600;
var triangles = [];

function setup(){
	

  	createCanvas(600, 600);
  	background(0);
	input = createInput();
	input.position(width + margin, margin);

	button = createButton('Submit');
	button.position(width + margin, input.height + margin);
	button.mousePressed(initial);

	button2 = createButton('Pulse');
	button2.position(width + margin , input.height + margin + button.height + margin);
	button2.mousePressed(pulse);

	button3 = createButton('Resume');
	button3.position(width + margin , input.height + margin + button.height + margin + button.height + margin);
	button3.mousePressed(start);

	button4 = createButton('Prev<<');
	button4.position(width + margin , 
		input.height + margin + button.height + margin + button.height + margin + button.height + margin);
	button4.mousePressed(prev);
	
	button5 = createButton('Next>>');
	button5.position(width + margin , 
		input.height + margin + button.height + margin + button.height + margin + button.height + margin + button.height + margin);
	button5.mousePressed(next);

}


function draw() {
	frameRate(fps);
	background(0);

	// draw checked points
	stroke(255, 255, 0);
	strokeWeight(10);
	for (var i=0; i < checked.length; i++) {
		point(checked[i][0], checked[i][1]);
	}
	// draw line
	strokeWeight(1);
	for (var i=0; i < edges.length; i++) {
		line(edges[i][0][0], edges[i][0][1], edges[i][1][0], edges[i][1][1]);
	}
	// draw unchecked points
	stroke(255);
	strokeWeight(10);
	for (var i=0; i < unchecked.length; i++) {
		point(unchecked[i][0], unchecked[i][1]);
	}

	// find the pr point
	if (unchecked.length > 0) {
		pr = unchecked.shift();
		checked.push(pr);
		stroke(255, 0, 0);
		point(pr[0], pr[1]);
	}

	// console.log("checked", checked);
	// console.log("edges", edges);
	console.log("unchecked", unchecked);
	// console.log("triangles", triangles);

}



function helpPoints() {
	p1 = [width/2, 0];
	checked.push(p1);
	p2 = [0, height-margin];
	checked.push(p2);
	p3 = [width, height-margin];
	checked.push(p3);
	edges.push([p1, p2]);
	edges.push([p2, p3]);
	edges.push([p3, p1]);
	triangles.push([p1, p2, p3]);
}


function start() {
	console.log("start");
	fps = 3;
	draw();
}

function pulse() {
	console.log("pulse");
	fps = 0;
}

function prev() {
	console.log("prev");
}

function next() {
	console.log("next");
	redraw();
}


function initial() {
	clear();
	points = [];
	checked = [];
	unchecked = [];
	edges = [];
	background(0);
	strokeWeight(10);
	stroke(255);
	for (var i=0; i < input.value(); i++) {
		var x = random(width/3, width/3 * 2);
		var y = random(height/3, height/6 * 5);
		point(x, y);
		points.push([x, y]);
		unchecked.push([x, y]);
	}
	helpPoints();	// create p1, p2, p3
	console.log(points);
}
