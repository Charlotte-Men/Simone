import React, { useState, useEffect } from "react";

const Buttons = () => {
  const [simoneTurn, setSimoneTurn] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [gameChain, setGameChain] = useState([Math.floor(Math.random() * 4)]);
  const [gameTry, setGameTry] = useState([]);
  const [count, setCount] = useState(0);
  // const [value, setValue] = useState([]);
  
  // let gameStep=0;
  // let count=0;

  useEffect(() => {
    if (simoneTurn === true) {
      let gameStep = Math.floor(Math.random() * 4);
      setGameChain([...gameChain, gameStep]);
      console.log(gameChain);
      setSimoneTurn(false);
      setPlayerTurn(true);
      setCount(count +1);
    } 
  }, [simoneTurn]);
  
  const setValue = (value) => {
    setGameTry([...gameTry, value]);
  }

  useEffect(() => {
    if (playerTurn === true && count <= gameChain.length) {
      setValue = (value) => {
        setGameTry([...gameTry, value]);
      }
      console.log(gameTry);
    }     
  }, [playerTurn]);


  // const launchGame = () => {
  //   if (youCanPlay === false) {
  //     gameStep = Math.floor(Math.random() * 4);
  //     setGameChain([...gameChain, gameStep]);
  //     console.log(gameChain);
  //     setyouCanPlay(true);
  //     count ++;
  //   };
  // };
  
  // const answer = (value) => {
  //   if (youCanPlay === true && count < gameChain.length) {
  //     setGameTry([...gameTry, value]);
  //     console.log(gameTry);
  // }};

  const testChain = () => {
      let success =0;
      for (let i=0; i<gameChain.length; i++){
        if (gameChain[i] === gameTry[i]) {
          success++;
          // console.log(success);
        }};
      if (success === gameChain.length) {
        console.log("Bravo");
      } else {
        console.log("Raté");
        setCount(0);
        setGameTry([]);
        setGameChain([]);
      }
      setPlayerTurn(false);
    };
  
  return(
    <div>
      <button onClick={() => setSimoneTurn(true)}>START A GAME</button>
      <div>
        <button onClick={() => setValue(0)}>0</button>
        <button onClick={() => setValue(1)}>1</button>
        <button onClick={() => setValue(2)}>2</button>
        <button onClick={() => setValue(3)}>3</button>
      </div>
      <p>Count : {count}</p>
      <button onClick={() => testChain()}>Is it correct ?</button>
    </div>
  )
} 

export default Buttons;


// import React, { useReducer } from "react";

// const Player = () => {
    
//   const initialStateGame = [];
//   const formReducerGame = (gameState, action) => {
//     switch (action.type) {
//       case 'NEXT_LEVEL':
//         return [...gameState, Math.floor(Math.random() * 4)]
//       case 'RESET_GAME':
//         return []
//       default:
//         return gameState
//     }
//   };
//   const [gameState, gameDispatch] = useReducer(formReducerGame, initialStateGame);

//   const initialStatePlayer = [];
//   const formReducerPlayer = (playerState, action) => {
//     switch (action.type) {
//       case 'RED_BUTTON':
//         return [...playerState, 0]
//       case 'BLUE_BUTTON':
//         return [...playerState, 1]
//       case 'YELLOW_BUTTON':
//         return [...playerState, 2]
//       case 'GREEN_BUTTON':
//         return [...playerState, 3]
//       case 'RESET_PLAYER':
//         return []
//       default:
//         return playerState
//     }
//   };
//   const [playerState, playerDispatch] = useReducer(formReducerPlayer, initialStatePlayer);

//   const initialStateCount = 0;
//   const formReducerCount = (countState, action) => {
//     switch (action.type) {
//       case 'INCREASE_COUNT':
//         return countState+1
//       case 'RESET_COUNT':
//         return initialStateCount
//       default:
//         return countState
//     }
//   };
//   const [countState, countDispatch] = useReducer(formReducerCount, initialStateCount);

//   const initialStateTurn = false;
//   const formReducerTurn = (turnState, action) => {
//     switch (action.type) {
//       case 'PLAYERS_TURN':
//         return true
//       case 'SIMONES_TURN':
//         return initialStateTurn
//       default:
//         return turnState
//     }
//   };
//   const [turnState, turnDispatch] = useReducer(formReducerTurn, initialStateTurn);

//   const initialStateStep = 0;
//   const formReducerStep = (stepState, action) => {
//     switch (action.type) {
//       case 'INCREASE_STEP':
//         return stepState+1
//       case 'RESET_STEP':
//         return initialStateStep
//       default:
//         return stepState
//     }
//   };
//   const [stepState, stepDispatch] = useReducer(formReducerStep, initialStateStep);

//   const testChain = () => {
//     console.log(`Game : ${gameState}`);
//     console.log(`player : ${playerState}`);
//   }

//   const launchGame = () => {
//     if (turnState === false) {
//       gameDispatch({type:'NEXT_LEVEL'});
//       turnDispatch({type:'PLAYERS_TURN'});
//       console.log(gameState);
//     };
//   };

//   const answer = (dispatchType) => {
//     if (turnState === true) {
//       playerDispatch(dispatchType);
//       if ((playerState.length +1) < gameState.length) {
//         if (playerState[stepState] === gameState[stepState]) {
//           stepDispatch({type:'INCREASE_STEP'});
//           console.log('Yes. and ?');
//         } else {
//           gameDispatch({type:'RESET_GAME'});
//           stepDispatch({type:'RESET_STEP'});
//           console.log('Wrong answer - Game reset');
//         }
//       } else if ((playerState.length +1) === gameState.length) {
//         if (playerState[stepState] === gameState[stepState]) {
//           countDispatch({type:'INCREASE_COUNT'});
//           turnDispatch({type:'SIMONES_TURN'});
//           console.log('Good game - One more !');
//         } else {
//           gameDispatch({type:'RESET_GAME'});
//           console.log('Too bad : 1 foot from the sangria bowl - Game reset');
//         }
//         playerDispatch({type:'RESET_PLAYER'});
//         stepDispatch({type:'RESET_STEP'});
//       } 
//       // else {
//       //   turnDispatch({type:'SIMONES_TURN'});
//       //   playerDispatch({type:'RESET_PLAYER'})
//       //   countDispatch({type:'RESET_COUNT'});
//       //   stepDispatch({type:'RESET_STEP'});
//       // }
//     }
//   };

//   return(
//     <div>
//       <button onClick={() => launchGame()}>START A GAME</button>
//       <div>
//         <button onClick={() => answer({type:'RED_BUTTON'}) }>0</button>
//         <button onClick={() => answer({type:'BLUE_BUTTON'})}>1</button>
//         <button onClick={() => answer({type:'YELLOW_BUTTON'})}>2</button>
//         <button onClick={() => answer({type:'GREEN_BUTTON'})}>3</button>
//       </div>
//       <p>Count : {countState}</p>
//       <button 
//       onClick={() => testChain()}
//       >Is it correct ?</button>
//     </div>
//   )
// } 

// export default Player;
