import React, { useReducer, useEffect, useRef } from "react";

const Player = () => {
    
  const gameInitialState = [];
  const gameReducer = (gameState, action) => {
    switch (action.type) {
      case 'NEXT_LEVEL':
        return [...gameState, Math.floor(Math.random() * 4)]
      case 'RESET_GAME':
        return []
      default:
        return gameState
    }
  };
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);

  const playerInitialState = [];
  const playerReducer = (playerState, action) => {
    switch (action.type) {
      case 'RED_BUTTON':
        return [...playerState, 0]
      case 'BLUE_BUTTON':
        return [...playerState, 1]
      case 'YELLOW_BUTTON':
        return [...playerState, 2]
      case 'GREEN_BUTTON':
        return [...playerState, 3]
      case 'RESET_PLAYER':
        return []
      default:
        return playerState
    }
  };
  const [playerState, playerDispatch] = useReducer(playerReducer, playerInitialState);

  const countInitialState = 0;
  const countReducer = (countState, action) => {
    switch (action.type) {
      case 'INCREASE_COUNT':
        return countState+1
      case 'RESET_COUNT':
        return countInitialState
      default:
        return countState
    }
  };
  const [countState, countDispatch] = useReducer(countReducer, countInitialState);

  const bestRef = useRef(0);

  // const bestInitialState = 0;
  // const bestReducer = (bestState, action) => {
  //   switch (action.type) {
  //     case 'INCREASE_BEST':
  //       return bestState+1
  //     default:
  //       return bestState
  //   }
  // };
  // const [bestState, bestDispatch] = useReducer(bestReducer, bestInitialState);

  const turnInitialState = 0;
  const turnReducer = (turnState, action) => {
    switch (action.type) {
      case 'PLAYERS_TURN':
        return true
      case 'SIMONES_TURN':
        return false
      case 'END_GAME':
        return turnInitialState
      default:
        return turnState
    }
  };
  const [turnState, turnDispatch] = useReducer(turnReducer, turnInitialState);

  const stepInitialState = 0;
  const stepReducer = (stepState, action) => {
    switch (action.type) {
      case 'INCREASE_STEP':
        return stepState+1
      case 'RESET_STEP':
        return stepInitialState
      default:
        return stepState
    }
  };
  const [stepState, stepDispatch] = useReducer(stepReducer, stepInitialState);

  const testChain = () => {
    console.log(`Game : ${gameState}`);
    console.log(`player : ${playerState}`);
  }

  const launchGame = () => {
    if (turnState === 0) {
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
      // console.log(gameState);
    };
  };

  useEffect(() => {
    console.log(gameState);
  }, [gameState])

  
  useEffect(() => {
    if (turnState === false) {
      console.log(turnState);
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
    }
  }, [turnState])

  let bestGame = 0;

  useEffect(() => {
    if (gameState.length > 0) {
      if (turnState === true) {
        console.log(playerState);
        if (playerState.length < gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            stepDispatch({type:'INCREASE_STEP'});
            console.log('Yes. and ?');
          } else {
            if (bestRef.current < countState) {
              bestRef.current = countState;
            }
            gameDispatch({type:'RESET_GAME'});
            stepDispatch({type:'RESET_STEP'});
            playerDispatch({type:'RESET_PLAYER'});
            turnDispatch({type:'END_GAME'});
            countDispatch({type:'RESET_COUNT'});
            console.log('Wrong answer - Game reset');
          }
        } else if (playerState.length === gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            countDispatch({type:'INCREASE_COUNT'});
            console.log('Good game - One more !');
            turnDispatch({type:'SIMONES_TURN'});
          } else {
            if (bestRef.current < countState) {
              bestRef.current = countState;
            }
            gameDispatch({type:'RESET_GAME'});
            turnDispatch({type:'END_GAME'});
            countDispatch({type:'RESET_COUNT'});
            console.log(`Too bad : 1 foot from the sangria bowl - Game reset`);
          }
          playerDispatch({type:'RESET_PLAYER'});
          stepDispatch({type:'RESET_STEP'});
          console.log(turnState);
        } 
      }
    }
  }, [playerState])

  // const colorClick = (dispatchType) => {
  //   if (turnState === true) {
  //     playerDispatch(dispatchType);
  //     console.log(playerState);
  //     answer();
  //   }
  // }
  
  const answer = () => {
      if (playerState.length < gameState.length) {
        if (playerState[stepState] === gameState[stepState]) {
          stepDispatch({type:'INCREASE_STEP'});
          console.log('Yes. and ?');
        } else {
          gameDispatch({type:'RESET_GAME'});
          stepDispatch({type:'RESET_STEP'});
          playerDispatch({type:'RESET_PLAYER'});
          console.log('Wrong answer - Game reset');
        }
      } else if (playerState.length === gameState.length) {
        if (playerState[stepState] === gameState[stepState]) {
          countDispatch({type:'INCREASE_COUNT'});
          console.log('Good game - One more !');
        } else {
          gameDispatch({type:'RESET_GAME'});
          console.log(`Too bad : 1 foot from the sangria bowl - Game reset`);
        }
        turnDispatch({type:'SIMONES_TURN'});
        playerDispatch({type:'RESET_PLAYER'});
        stepDispatch({type:'RESET_STEP'});
      } 
      // else {
      //   turnDispatch({type:'SIMONES_TURN'});
      //   playerDispatch({type:'RESET_PLAYER'})
      //   countDispatch({type:'RESET_COUNT'});
      //   stepDispatch({type:'RESET_STEP'});
      // }
  };

  return(
    <div>
      <button onClick={() => launchGame()}>START A GAME</button>
      <div>
        <button onClick={() => playerDispatch({type:'RED_BUTTON'}) }>0</button>
        <button onClick={() => playerDispatch({type:'BLUE_BUTTON'})}>1</button>
        <button onClick={() => playerDispatch({type:'YELLOW_BUTTON'})}>2</button>
        <button onClick={() => playerDispatch({type:'GREEN_BUTTON'})}>3</button>
      </div>
      <p>Count : {countState}</p>
      <button 
      onClick={() => testChain()}
      >Is it correct ?</button>
      <button 
      onClick={() => answer()}
      >Test</button>
      <p>Best shot : {bestRef.current}</p>
    </div>
  )
} 

export default Player;
