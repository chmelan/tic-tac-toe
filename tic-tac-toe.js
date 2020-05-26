let Gameboard = {
//boardState: ["0","1","2","3","4","5","6","7","8"]
boardState:["", "", "", "", "", "", "", "", ""]
}


//creates player objects
const PlayerFactory = (name, icon, score) => {
    return {name, icon, score}
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
    let player1 
    let player2 
    let currentPlayer 
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

    const toggleCurrentPlayer = ()=>{
        //removes the currentplayers class of active player
        (currentPlayer === player1)?  displayController.removeClass(".p1", "activePlayer") : displayController.removeClass(".p2", "activePlayer");
        //if the current player is player1, it sets it to player2, otherwise, it sets it to player1
        (currentPlayer === player1)?currentPlayer = player2 : currentPlayer = player1;
        //adds the class of active player to the current player's div
        (currentPlayer === player1)?  displayController.addClass(".p1", "activePlayer") : displayController.addClass(".p2", "activePlayer");
        //updates the game status display with the current player's turn
        displayController.setTextContent(".gameStatusDisplay", `${currentPlayer.name}'s Turn!`)

    }
            
    const playerWinsGame = ()=>{
        //sets the gameStatusDisplay text to "currentPlayer.name wins the game!"
        displayController.setTextContent(".gameStatusDisplay", `${currentPlayer.name} wins the game!`)
        currentPlayer.score ++
        //updates the current player's score display
        (currentPlayer === player1)?  displayController.setTextContent("#p1Score", currentPlayer.score) : displayController.setTextContent("#p2Score", currentPlayer.score)
        //removes the event listeners on the gameboard grids so that players cannot continue to input data
        displayController.removeEventListenerFromTarget(".gameBoardContainer", "click", makePlayerMove);
    }
            
    const playerTieGame = ()=>{
        //sets the gameStatusDisplay text to "Tie!"
        displayController.setTextContent(".gameStatusDisplay", `Tie!`)
        //removes the event listeners on the gameboard grids so that players cannot continue to input data
        displayController.removeEventListenerFromTarget(".gameBoardContainer", "click", makePlayerMove);
    }

    const startNewGame = ()=>{
            resetGameBoard()
            player1 = PlayerFactory(prompt("Player 1: Please enter your name")||"Player 1", "X", 0)
            displayController.setTextContent("#p1Name", player1.name)
            displayController.setTextContent("#p1Icon", player1.icon)
            displayController.setTextContent("#p1Score", player1.score)
            player2 = PlayerFactory(prompt("Player 2: Please enter your name")||"Player 2", "O", 0)
            displayController.setTextContent("#p2Name", player2.name)
            displayController.setTextContent("#p2Icon", player2.icon)
            displayController.setTextContent("#p2Score", player2.score)
                //removes active player class from player 1 and player 2 div
            displayController.removeClass(".p1", "activePlayer")
            displayController.removeClass(".p2", "activePlayer");    
            currentPlayer = player1
            displayController.setTextContent(".gameStatusDisplay", `${currentPlayer.name}'s Turn!`)
            //adds active player class to player 1 div
            displayController.addClass(".p1", "activePlayer")
            //reinitializes the gameboard so that users can play the game
            displayController.addEventListenerToTarget(".gameBoardContainer", "click", makePlayerMove)
    }
    
    const startNewRound = ()=>{
            resetGameBoard()
            displayController.removeClass(".p1", "activePlayer")
            displayController.removeClass(".p2", "activePlayer");    
            currentPlayer = player1
            displayController.setTextContent(".gameStatusDisplay", `${currentPlayer.name}'s Turn!`)
            //adds active player class to player 1 div
            displayController.addClass(".p1", "activePlayer")
        displayController.addEventListenerToTarget(".gameBoardContainer", "click", makePlayerMove);       

    } 

    const makePlayerMove = (e)=>{
        console.log("making player move")
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
        //otherwise, switch to player 2
        toggleCurrentPlayer()
    }
    const resetGameBoard =()=>{
        //resets the gameBoard array
        Gameboard.boardState = ["", "", "", "", "", "", "", "", ""]
        //updates the gameboard display
        displayController.updateGameboardDisplay()
    }

        //event listeners go here   
            //new round button on click startNewRound
            //new game button on click startNewGame
            //gameboard divs on click makePlayerMove
        displayController.addEventListenerToTarget(".newRoundButton", "click", startNewRound)   
        displayController.addEventListenerToTarget(".newGameButton", "click", startNewGame)
        startNewGame()
        return {
            //functions to return
        };
    })();