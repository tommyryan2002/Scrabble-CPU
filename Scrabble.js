
var pxTemp = 0;
var pyTemp = 0;
var overBoard = false;
var boardX = 450;
var boardY = 400;
var piecesX = [];
var piecesY = [];
var piecesState = [];
var bagX = 100;
var bagY = 700;
var onCanvas = true;
var currentpieceNum = 0;


function setup(){
	createCanvas(900, 800);
}

function draw(){
	background(100);
	gameboard(boardX, boardY);
	piecesDraw();
	drawBag(100, 700);

}

function gameboard(x, y, scal, rot){
	push();
		translate(x, y);
		scale(scal);
		rotate(rot);
		square(-300, -300, 600);
		for (i = -260; i < 300; i += 40){
			strokeWeight(2);
			line(i, 300, i, -300);
			line(-300, i, 300, i);
		}
	pop();
}

function piecesDraw(){
	for (i = 0; i < piecesX.length; i++){
		push();
			translate(piecesX[i], piecesY[i]);
			fill(0);
			square(-20, -20, 40);
		pop();
	}
	
}
function mousePressed(){
	//checks if clicked anywhere within a preexisting tile
	if (mouseX < (bagX + 20) && mouseX > (bagX - 20) && mouseY < (bagY + 20) && mouseY > (bagY - 20)){
		console.log("clicked");
		pieceCreate();
	}
	for (i = 0; i < piecesX.length + 1; i++){
		if (mouseX < piecesX[i] + 20 && mouseX > piecesX[i] - 20 && mouseY < piecesY[i] + 20 && mouseY > piecesY[i] - 20){
			console.log("hit");
			currentpieceNum = i;
			piecesState[i] = true;
		}
	}
}		
function mouseDragged(){
	if (piecesState[currentpieceNum] == true){
		console.log("picked");
		if (mouseX > 880 || mouseX < 20 || mouseY > 780 || mouseY < 20){
			onCanvas = false;
		}
			piecesX[currentpieceNum] = mouseX;
			piecesY[currentpieceNum] = mouseY;
	}
}
function mouseReleased(){
	if (mouseX > boardX - 300 && mouseX < boardX + 300 && mouseY > boardY - 300 && mouseY < boardY + 300){
		overBoard = true;
	}
	else{
		overBoard = false
	}
	snap();
	for (i = 0; i < piecesState.length; i++){
		piecesState[i] = false;
	}
}

function snap(){
	if (overBoard && piecesState[currentpieceNum]){
		for (i = 150; i < boardX + 300; i += 40){
			if (mouseX >= i && mouseX < i + 40){
				pxTemp = i + 20;
			}
		}
		for (i = 50; i < boardY + 300 ; i += 40){
			if (mouseY >= i && mouseY < i + 40){
				pyTemp = i + 30;
			}
		}
	piecesX[currentpieceNum] = pxTemp;
	piecesY[currentpieceNum] = pyTemp;
	}
}

function drawBag(x, y){
	push();
		translate(x, y);
		rect(-25, -25, 50, 50);
	pop();
}

function pieceCreate(){
	piecesY.push(mouseY);
	piecesX.push(mouseX);
	piecesState.push(true);
	currentpieceNum = piecesX.length
}