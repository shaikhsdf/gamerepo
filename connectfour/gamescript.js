//assgnig players with clors and retriving thier names
var player1=prompt("Player 1: Enter Your Name.  You will be Blue!");
var player1color="rgb(86,151,255)"; //rgb for red

var player2=prompt("Player 2: Enter Your Name. You will Be Red!");
var player2color="rgb(237,45,73)"; //rgb for blue

var game_on=true; // boolean value to know whether game is runing or not
var table=$('table tr');

function reportwin(rowNum,colNum){
    console.log("you won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReturn= returnColor(5,colIndex);
    for (var row=5; row>-1 ; row--){
        colorReturn=returnColor(row,colIndex);
        if (colorReturn==='rgb(128,128,128)'){ //rgb(128,128,128) implies color gray
            return row
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'rgb(128,128,128)' && one !== undefined )

}

//to check horizontal win
function horizontalWin(){
    for(var row=0; row<6 ; row++){
        for (var col=0; col<4; col++){
            if (colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                console.log('horiz');
                reportwin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}


//to check vertical win
function verticalWin(){
    for(var col=0; col<7; col++){
        for (var row=0; row<3; row++){
            if (colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                console.log('vertical');
                reportwin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

//to check horizontal win
function diagonalWin(){
    for(var col=0; col<5; col++){
        for (var row=0; row<7; row++){
            if (colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                console.log('diagonal');
                reportwin(row,col);
                return true;
            } else if (colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diagonal');
                reportwin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

//Game Logic

//player1
var currentPlayer=1;
var currentName=player1;
var currentColor=player1color;
$('h3').text(player1 + "its your turn, click a coloumn");

$('.gameboard button').on('click',function(){
    var col=$(this).closest('td').index();
var bottomAvailable = checkBottom(col);
changeColor(bottomAvailable,col,currentColor);
if (horizontalWin() || verticalWin() || diagonalWin()){
    $('h1').text(currentName + "You Have Won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
}
currentPlayer = currentPlayer * -1;

if (currentPlayer==1){
    currentName=player1;
    $('h3').text(currentName + " Its Your Turn.")
    currentColor=player1color;
}else{
    currentName=player2;
    $('h3').text(currentName + " Its Your Turn.")
    currentColor=player2color
}

})





