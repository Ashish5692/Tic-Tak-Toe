const boxes = document.querySelectorAll(".box"); //all 9box div returned into boxes variable 
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currrentPlayer; //X or O
let gameGrid; //to find out current status of game --finding how far game has reached ..all data will be within it

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialize the game
function initGame() {
    currrentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; //emptying game grid
    //make it empty on UI --ALL boxes should be empty
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing,, initialize box with css properties again after wining game
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");   //hiding newGameBtn
    gameInfo.innerText = `Current Player - ${currrentPlayer}`; //initially render current player to UI when game starts..also first call this function
}

initGame(); //initilizing game

function swapTurn(){
    if(currrentPlayer ==="X") {
        currrentPlayer = "O";
    }
    else{
        currrentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currrentPlayer}`;
}

function checkGameOver(){
    //store answer
    let answer = "";
    //iterate over winning positions
    //jo UI mai visible hai wo boxes hai unse farak nhi padta
    //we will only check Grid values

    winningPositions.forEach((position)=>{
        //checking if positions index are not empty and all positions index are same
        //All 3 BOXES should be non-empty and exactly same in value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){

                //check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "O";

                //disable pointer events after we got our winner -i.e unclickable on all positions after win
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                //now we know either X or O is a winner
                //background color set to green
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                
            }
    });

    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner that is TIE -when all boxes are filled and no winner
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !==""){
            fillCount++;
        }
    });

    //board is filled ,game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }


}

function handleClick(index){
    //if clicked box is empty
    //if not empty then click will not happen 
    if(gameGrid[index] === ""){
        boxes[index].innerText = currrentPlayer; //update in box means update on UI
        gameGrid[index] = currrentPlayer; //it make changes in our gameGrid(it represent our inner logic) only
        boxes[index].style.pointerEvents = "none"; //NOw after i put O or X then cursor pointer nhi bnega
        //SWAP karo Turn ko
        swapTurn();
        //check ki jeet toh nhi gya h
        checkGameOver();
    }
}

//for each box run below code of handling click on each 9 box using loop in eventListener
boxes.forEach((box,index) =>{
    box.addEventListener("click", ()=>{ //apply eventListener of onClick on each box
        handleClick(index); //index passed to know on what box click happened
        //handleClick on based of current User puts X or O if cell was empty 
        //after current player puts its input then handleClick will make that box unclickable --turn changes
        //before turn changes first check if the player has win the game
    })
});

newGameBtn.addEventListener("click", initGame);