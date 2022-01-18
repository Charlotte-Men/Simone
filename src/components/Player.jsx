import React, { useReducer, useEffect, useRef, useState } from "react";

import turnReducer from "../reducers/turnReducer";
import gameReducer from "../reducers/gameReducer";
import playerReducer from "../reducers/playerReducer";
import stepReducer from "../reducers/stepReducer";
import countReducer from "../reducers/countReducer";

import styles from './Player.module.css';

const turnInitialState = 0;
const gameInitialState = [];
const playerInitialState = [];
const stepInitialState = 0;
const countInitialState = 0;

const Player = () => {

  const [turnState, turnDispatch] = useReducer(turnReducer, turnInitialState);
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const [playerState, playerDispatch] = useReducer(playerReducer, playerInitialState);
  const [stepState, stepDispatch] = useReducer(stepReducer, stepInitialState);
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
            stepDispatch({type:'RESET_STEP', payload: stepInitialState});
            playerDispatch({type:'RESET_PLAYER'});
            turnDispatch({type:'END_GAME', payload: turnInitialState});
            countDispatch({type:'RESET_COUNT', payload: countInitialState});
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
            countDispatch({type:'RESET_COUNT', payload: countInitialState});
            setMainMessage('GAME RESET');
            setMessage(`Too bad, you were close !`);
            messageBox.className += ` ${styles['wrong']}`;
          }
          playerDispatch({type:'RESET_PLAYER'});
          stepDispatch({type:'RESET_STEP', payload: stepInitialState});
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
