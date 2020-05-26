let Gameboard = {
//boardState: ["0","1","2","3","4","5","6","7","8"]
boardState:["", "", "", "", "", "", "", "", ""]
}


//creates player objects
const PlayerFactory = (name, icon) => {
    return {name, icon, score: 0}
}

const displayController = (() => {

    //sets the text content of a target element
    const setTextContent = (targetElement, content) => {
        let newTarget = document.querySelector(targetElement)
        newTarget.textContent = content;
        console.log("setting Text Content")
    };
    //adds a class to target element
    const addClass = (targetElement, classToAdd )=>{            
        let newTarget = document.querySelector(targetElement)
        newTarget.classList.add(classToAdd)
        console.log("adding class to element")
    };
    //removes a class from a target element
    const removeClass = (targetElement, classToRemove)=>{
        let newTarget = document.querySelector(targetElement)
        newTarget.classList.remove(classToRemove)
        console.log("removing class from element")
    }
    //add an event listener to a target element with a specified function
    const addEventListenerToTarget= (targetElement, listenerType, functionToAdd ) =>{
        let newTarget = document.querySelector(targetElement)
        newTarget.addEventListener(listenerType, functionToAdd)
        console.log("adding event listener to target element")
    }
    //remove an event listener from a target element
    const removeEventListenerFromTarget= (targetElement, listenerType, functionToRemove ) =>{
        let newTarget = document.querySelector(targetElement)
        newTarget.removeEventListener(listenerType, functionToRemove)
        console.log("removing event listener from target element")
    }
    //updates the gameboard display to show the current values in the gameBoard.boardState array
    const updateGameboardDisplay = ()=>{
        let grids = document.querySelectorAll(".gameBoardGrid")
        console.log("updating gameboard display")
        grids.forEach(grid =>{
            grid.textContent = Gameboard.boardState[grid.dataset.index]
        })
    }
  
    return {
      setTextContent,
      addClass,
      removeClass,
      addEventListenerToTarget,
      removeEventListenerFromTarget,
      updateGameboardDisplay,
    };
  })();

function test(){
    console.log("this is a test")
}

const Game = (() => {
    let player1 = PlayerFactory("Bob", "X")
    let player2 = PlayerFactory("Joe", "O")
    let currentPlayer = player1
//a let called currentTurn that references the current player // 
        //a let called Players that holds the players

    const checkForWin = ()=>{
        //checks for matches in rows 
        if(Gameboard.boardState[0] === Gameboard.boardState[1] && Gameboard.boardState[0] === Gameboard.boardState[2] && Gameboard.boardState[0] !== "" ||
        Gameboard.boardState[3] === Gameboard.boardState[4] && Gameboard.boardState[3] === Gameboard.boardState[5] && Gameboard.boardState[3] !== "" ||
        Gameboard.boardState[6] === Gameboard.boardState[7] && Gameboard.boardState[6] === Gameboard.boardState[8] && Gameboard.boardState[6] !== "" )return true
        //checks for  matches in cols
        if(Gameboard.boardState[0] === Gameboard.boardState[3] && Gameboard.boardState[0] === Gameboard.boardState[6] && Gameboard.boardState[0] !== "" ||
        Gameboard.boardState[1] === Gameboard.boardState[4] && Gameboard.boardState[1] === Gameboard.boardState[7] && Gameboard.boardState[1] !== "" ||
        Gameboard.boardState[2] === Gameboard.boardState[5] && Gameboard.boardState[2] === Gameboard.boardState[8] && Gameboard.boardState[2] !== "" )return true
        //checks for  matches in diags
        if(Gameboard.boardState[0] === Gameboard.boardState[4] && Gameboard.boardState[0] === Gameboard.boardState[8] && Gameboard.boardState[0] !== "" ||
        Gameboard.boardState[2] === Gameboard.boardState[4] && Gameboard.boardState[2] === Gameboard.boardState[6] && Gameboard.boardState[2] !== "" )return true
        //if nothing matches
        return false
    }


    const checkForTie = ()=>{
        //checks if array doesnt contain any empty spaces
        if(!Gameboard.boardState.includes(""))return true
        return false
    }

        //controls who's turn it is, by storing it in a current player variable
            // toggles between 



        //function startNewRound
            //clears the GameBoard Array
            //updates the gameboard display
            //sets current player to player 1
                //removes activePlayer class from player 2 div
                //adds activePlayer class to the player 1 div
             //initializeGameboard() //reinitializes the gameboard so that users can play the game
                
    const playerWinsGame = ()=>{
        //sets the gameStatusDisplay text to "currentPlayer.name wins the game!"
        displayController.setTextContent(".gameStatusDisplay", `${currentPlayer.name} wins the game!`)
        //increases the current player's score
        currentPlayer.score ++
        //updates the current player's score display
        (currentPlayer === player1)?  displayController.setTextContent("#p1Score", currentPlayer.score) : displayController.setTextContent("#p2Score", currentPlayer.score)
        //removes the event listeners on the gameboard grids so that players cannot continue to input data
        displayController.removeEventListenerFromTarget(".gameBoardContainer", "click", makePlayerMove);
    }
            
    const playerTieGame = ()=>{
        alert("Tie!")
        displayController.removeEventListenerFromTarget(".gameBoardContainer", "click", makePlayerMove);
    }
        //function playerTieGame
            //sets the gameStatusDisplay text to "Tie Game ;("
            //removes the event listeners on the gameboard grids so that players cannot continue to click buttons

        //function startNewGame
            //resets the gameBoard array
            //updates the gameboard display
            //sets the round counter to 0
            //deletes player 1 and player 2
            //prompts user to create player 1
                //uses this input to create a new player from the PlayerFactory that is stored in the game object in a players array with an icon of "X"
                //sets text of player 1 div to be the name of player 1  
            //prompts user to create player 2
                //uses this input to create a new player from the PlayerFactory that is stored in the game object in a players arraywith an icon of "O"
                //sets the text of player 2 div to be the name of player 2
            //sets current player to player 1
                //removes active player class from player 2 div
                //adds active player class to player 1 div
            //initializeGameboard() //reinitializes the gameboard so that users can play the game
            


    const makePlayerMove = (e)=>{
        //if the clicked div is not empty
        if(e.target.textContent !== "")return alert("that is not a valid move!")
        console.log(e.target.dataset.index)
        //adds the current players icon into the right array spot
        Gameboard.boardState.splice(e.target.dataset.index, 1, currentPlayer.icon)
        //updates gameboard display
        displayController.updateGameboardDisplay()
        //checks for a win
        if(checkForWin())return playerWinsGame()
        //checks for a tie
        if(checkForTie())return playerTieGame()
            //else
                //set the current player to the other player 
    }


        //event listeners go here   
            //new round button on click startNewRound
            //new game button on click startNewGame
            //gameboard divs on click makePlayerMove
        
        displayController.addEventListenerToTarget(".gameBoardContainer", "click", makePlayerMove)
        return {
            //functions to return
        };
    })();

//Game
        




//displayController

    //prompt user for input
    //display an array in a set of divs








displayController.updateGameboardDisplay()




// dont know
    // when a user clicks a grid space, it should update the gameboard array with the player's icon , and update the div
        //stops a player from entering info if the grid/array relationship already contains a value 



// game flow. User clicks a square, the array is updated with the value of the player, the game checks if the player wins, if not, the game continues on.  When a player wins, the game either starts over, or starts a new round