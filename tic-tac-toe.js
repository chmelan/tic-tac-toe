let Gameboard = {
//boardState: ["0","1","2","3","4","5","6","7","8"]
boardState:["", "", "", "", "", "", "", "", ""]
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
        grids.forEach(grid =>{
            grid.textContent = Gameboard.boardState[grid.dataset.index]
        })
    }
    const generateGameboard = ()=>{
        let gameBoard = document.querySelector(".gameBoardContainer")
        gameBoard.innerHTML =  `<div class="gameBoardGrid" data-index="0"></div>
        <div class="gameBoardGrid" data-index="1"></div>
        <div class="gameBoardGrid" data-index="2"></div>
        <div class="gameBoardGrid" data-index="3"></div>
        <div class="gameBoardGrid" data-index="4"></div>
        <div class="gameBoardGrid" data-index="5"></div>
        <div class="gameBoardGrid" data-index="6"></div>
        <div class="gameBoardGrid" data-index="7"></div>
        <div class="gameBoardGrid" data-index="8"></div>`
    }
    const generatePlayerForm = ()=>{
        let gameBoard = document.querySelector(".gameBoardContainer")
        gameBoard.innerHTML = `<div class="playerNameForm">
        <label for ="player1Form">Player 1 Name:</label>
        <input type="text" class="playerNameInput" id="player1Form" maxlength="4">
        <label for ="player2Form">Player 2 Name:</label>
        <input type="text" class="playerNameInput" id="player2Form" maxlength="4">
        <button class="createPlayerButton">Create new Players</button>
    </div>`
    }
    const generateNewGameAndRoundButtons = ()=>{
        let gameBoard = document.querySelector(".gameBoardContainer")
        gameBoard.innerHTML = `<div class="buttonContainer">
        <button class="newGameButton">New Game</button>
        <button class="newRoundButton">New Round</button>
    </div>`
        
    }
    const removeAllChildren = (parentNode)=>{
        const adult = document.querySelector(parentNode)
        while (adult.firstChild) {
            adult.removeChild(adult.lastChild);
        }
    }
    return {
      setTextContent,
      addClass,
      removeClass,
      addEventListenerToTarget,
      removeEventListenerFromTarget,
      updateGameboardDisplay,
      generateGameboard,
      removeAllChildren,
      generatePlayerForm,
      generateNewGameAndRoundButtons,
    };
  })();


  const PlayerFactory = (name, icon, score) => {
      console.log("creating new character")
    return {name, icon, score}
}

const Game = (() => {
    let player1 
    let player2 
    let currentPlayer 

    

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
        displayController.generateNewGameAndRoundButtons()
        displayController.addEventListenerToTarget(".newRoundButton", "click", startNewRound)   
        displayController.addEventListenerToTarget(".newGameButton", "click", startNewGame)

    }
            
    const playerTieGame = ()=>{
        //sets the gameStatusDisplay text to "Tie!"
        displayController.setTextContent(".gameStatusDisplay", `Tie!`)
        //removes the event listeners on the gameboard grids so that players cannot continue to input data
        displayController.removeEventListenerFromTarget(".gameBoardContainer", "click", makePlayerMove);
        displayController.generateNewGameAndRoundButtons()
        displayController.addEventListenerToTarget(".newRoundButton", "click", startNewRound)   
        displayController.addEventListenerToTarget(".newGameButton", "click", startNewGame)

    }

    const startNewGame = ()=>{
            displayController.removeAllChildren(".gameBoardContainer")
            //add in an input field to set player 1 and player 2
            displayController.generatePlayerForm()
            //add an event listener that will set the name values of player 1 and player 2 when the button is clicked and also runs the fuction StartNewRound
            displayController.addEventListenerToTarget(".createPlayerButton", "click", createNewPlayer)
           // startNewRound()
    }
    const createNewPlayer= ()=>{
            let player1Name = document.querySelector("#player1Form").value.toUpperCase()
            let player2Name = document.querySelector("#player2Form").value.toUpperCase()
            if(player1Name === "" || player2Name ==="")return alert("Please add a name for both player 1 and player 2")
            console.log(player1Name)
            console.log(player2Name)
            player1 = PlayerFactory(player1Name, "X", 0)
            displayController.setTextContent("#p1Name", player1.name)
            displayController.setTextContent("#p1Icon", player1.icon)
            displayController.setTextContent("#p1Score", player1.score)
            player2 = PlayerFactory(player2Name, "O", 0)
            displayController.setTextContent("#p2Name", player2.name)
            displayController.setTextContent("#p2Icon", player2.icon)
            displayController.setTextContent("#p2Score", player2.score)
            startNewRound()
    }
    const startNewRound = ()=>{
            //generates the game board
            displayController.generateGameboard()
            //resets the game board
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
        //exits if the user doesnt click on a square
        if(!e.target.classList.contains("gameBoardGrid"))return
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
        displayController.addEventListenerToTarget(".newGameButton", "click", startNewGame)
        return {
            //functions to return
        };
    })();
