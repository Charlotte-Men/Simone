import React, { useReducer, useEffect, useRef, useState } from "react";
import styles from './Player.module.css';


const Player = () => {
  
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

  const launchGame = () => {
    if (turnState === 0) {
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
    };
  };

  useEffect(() => {
    console.log(gameState);
    // for (let i=0; i<gameState.length; i++) {
    //   lightOn(i);
    // }
  }, [gameState])
  
  // const lightOn = (button) => {
  //   return new Promise ((resolve, reject) =>{
  //     button.classeName += ':active';
  //     setTimeout(() => {
  //       button.className = button.className.replace(':active', '');
  //       resolve();
  //     }, 1000);
  //   });
  // }

  useEffect(() => {
    if (turnState === false) {
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
    }
  }, [turnState])

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (gameState.length > 0) {
      if (turnState === true) {
        console.log(playerState);
        if (playerState.length < gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            stepDispatch({type:'INCREASE_STEP'});
            console.log('Yes. and ?');
            setMessage('Yes. and ?');
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
            setMessage('Wrong answer - Game reset');
          }
        } else if (playerState.length === gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            countDispatch({type:'INCREASE_COUNT'});
            console.log('Good game - One more !');
            setMessage('Good game - One more !');
            turnDispatch({type:'SIMONES_TURN'});
          } else {
            if (bestRef.current < countState) {
              bestRef.current = countState;
            }
            gameDispatch({type:'RESET_GAME'});
            turnDispatch({type:'END_GAME'});
            countDispatch({type:'RESET_COUNT'});
            console.log(`Too bad : 1 foot from the sangria bowl - Game reset`);
            setMessage(`Too bad : 1 foot from the sangria bowl - Game reset`);
          }
          playerDispatch({type:'RESET_PLAYER'});
          stepDispatch({type:'RESET_STEP'});
        } 
      }
    }
  }, [playerState])

  const handleClick = (color) => {
    if (turnState === true) {
      playerDispatch(color)
    }
  }

  return(
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <div className={styles.simone}>
        <button className={styles.launchButton} onClick={() => launchGame()}>START A GAME</button>
        <button value={0} className={styles.redButton} onClick={() => handleClick({type:'RED_BUTTON'}) }></button>
        <button value={1} className={styles.blueButton} onClick={() => handleClick({type:'BLUE_BUTTON'})}></button>
        <button value={2} className={styles.yellowButton} onClick={() => handleClick({type:'YELLOW_BUTTON'})}></button>
        <button value={3} className={styles.greenButton} onClick={() => handleClick({type:'GREEN_BUTTON'})}></button>
      </div>
      <div className={styles.count}>Count : {countState}</div>
      <div className={styles.best}>Best shot : {bestRef.current}</div>
    </div>
  )
} 

export default Player;
