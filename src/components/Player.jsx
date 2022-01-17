import React, { useReducer, useEffect, useRef, useState } from "react";

import turnReducer from "../reducers/turnReducer";

import styles from './Player.module.css';

const turnInitialState = 0;

const Player = () => {

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

  const [message, setMessage] = useState();
  const [mainMessage, setMainMessage] = useState('');
 
  const messageBox = document.getElementById('messages');
  const bestShot = document.getElementById('best');
  
  const launchGame = () => {
    if (turnState === 0) {
      if (bestRef.current > 0) {
        messageBox.className = messageBox.className.replace(` ${styles['wrong']}`, '');
        bestShot.className = bestShot.className.replace(` ${styles['better']}`, '');
      }
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
      setMainMessage("YOUR TURN");
      setMessage('');
    };
  };
 
  const lightOn = (number) => {
    let button = '';
    switch (number) {
      case 0:
        button = document.getElementById('redButton');
        break;
      case 1:
        button = document.getElementById('blueButton');
        break;
      case 2:
        button = document.getElementById('yellowButton');
        break;
      case 3:
        button = document.getElementById('greenButton');
        break;
      default:
        break;
    }
    return new Promise ((resolve) =>{
      setTimeout(() => {
        button.className += ` ${styles['active']}`;
      }, 250);
      setTimeout(() => {
        button.className = button.className.replace(` ${styles['active']}`, '');
        resolve();
      }, 750);
    });
  }
  
  useEffect(() => {
    const flash = async () => {
      for (let i=0; i<gameState.length; i++) {
          await lightOn(gameState[i]);
        }
      if (countState !== 0) {
        setMainMessage("YOUR TURN");
      }
    };
      flash();
  }, [gameState])

  useEffect(() => {
    if (turnState === false) {
      gameDispatch({type:'NEXT_LEVEL'});
      turnDispatch({type:'PLAYERS_TURN'});
    }
  }, [turnState])

  useEffect(() => {
    if (gameState.length > 0) {
      if (turnState === true) {
        if (playerState.length < gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            stepDispatch({type:'INCREASE_STEP'});
            setMessage(`Yay ! ${gameState.length - stepState - 1} left`);
          } else {
            if (bestRef.current < countState) {
              bestRef.current = countState;
              bestShot.className += ` ${styles['better']}`;
            }
            gameDispatch({type:'RESET_GAME'});
            stepDispatch({type:'RESET_STEP'});
            playerDispatch({type:'RESET_PLAYER'});
            turnDispatch({type:'END_GAME', payload: turnInitialState});
            countDispatch({type:'RESET_COUNT'});
            setMainMessage('GAME RESET');
            setMessage('Wrong answer');
            messageBox.className += ` ${styles['wrong']}`;
          }
        } else if (playerState.length === gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            countDispatch({type:'INCREASE_COUNT'});
            setMainMessage("SIMONE'S TURN");
            setMessage("Good game !");
            turnDispatch({type:'SIMONES_TURN'});
          } else {
            if (bestRef.current < countState) {
              bestRef.current = countState;
              bestShot.className += ` ${styles['better']}`;
            }
            gameDispatch({type:'RESET_GAME'});
            turnDispatch({type:'END_GAME', payload: turnInitialState});
            countDispatch({type:'RESET_COUNT'});
            setMainMessage('GAME RESET');
            setMessage(`Too bad, you were close !`);
            messageBox.className += ` ${styles['wrong']}`;
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
      <div className={styles.messages} id='messages'>
      <p className={styles.mainessage}>{mainMessage}</p>
      {message && <p className={styles.secondaryMessage}>{message}</p>}
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.simone}>
          <button className={styles.launchButton} onClick={() => launchGame()}>START A GAME</button>
          <button value={0} className={styles.redButton} id='redButton' onClick={() => handleClick({type:'RED_BUTTON'}) }></button>
          <button value={1} className={styles.blueButton} id='blueButton' onClick={() => handleClick({type:'BLUE_BUTTON'})}></button>
          <button value={2} className={styles.yellowButton} id='yellowButton' onClick={() => handleClick({type:'YELLOW_BUTTON'})}></button>
          <button value={3} className={styles.greenButton} id='greenButton' onClick={() => handleClick({type:'GREEN_BUTTON'})}></button>
        </div>
        <div className={styles.counters}>
          <div className={styles.count}>Count : {countState}</div>
          <div className={styles.best} id='best'>Best shot : {bestRef.current}</div>
        </div>
      </div>
    </div>
  )
} 

export default Player;
