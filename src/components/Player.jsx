import React, { useReducer, useEffect, useRef, useState } from "react";

import turnReducer from "../reducers/turnReducer";
import gameReducer from "../reducers/gameReducer";
import playerReducer from "../reducers/playerReducer";
import stepReducer from "../reducers/stepReducer";
import countReducer from "../reducers/countReducer";

import beep1 from '../assets/beep-02.mp3';
import beep2 from '../assets/drop-1.mp3';
import beep3 from '../assets/button-3.mp3';
import beep4 from '../assets/honk-2.mp3';
import badBeep from '../assets/beep-03.mp3';
import styles from './Player.module.css';

const turnInitialState = 0;
const gameInitialState = [];
const playerInitialState = [];
const stepInitialState = 0;
const countInitialState = 0;

const Player = () => {
  const audio1 = new Audio(beep1);
  const audio2 = new Audio(beep2);
  const audio3 = new Audio(beep3);
  const audio4 = new Audio(beep4);
  const badAudio = new Audio (badBeep);

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
    let gameBeep = '';
    switch (number) {
      case 0:
        button = document.getElementById('redButton');
        gameBeep = audio1;
        break;
      case 1:
        button = document.getElementById('blueButton');
        gameBeep = audio2;
        break;
      case 2:
        button = document.getElementById('yellowButton');
        gameBeep = audio3;
        break;
      case 3:
        button = document.getElementById('greenButton');
        gameBeep = audio4;
        break;
      default:
        break;
    }
    return new Promise ((resolve) =>{
      setTimeout(() => {
        gameBeep.play();
        button.className += ` ${styles['active']}`;
        setTimeout(() => {
          button.className = button.className.replace(` ${styles['active']}`, '');
          resolve();
        }, 1000);
      }, 150);
    });
  }
  
  const flash = async () => {
    for (let i=0; i<gameState.length; i++) {
      await lightOn(gameState[i]);
    }
    if (countState !== 0) {
      setMainMessage("YOUR TURN");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flash();
    }, 750)
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
            gameDispatch({type:'RESET_GAME'});
            stepDispatch({type:'RESET_STEP', payload: stepInitialState});
            playerDispatch({type:'RESET_PLAYER'});
            turnDispatch({type:'END_GAME', payload: turnInitialState});
            countDispatch({type:'RESET_COUNT', payload: countInitialState});
            setTimeout(() => {
              if (bestRef.current < countState) {
                bestRef.current = countState;
                bestShot.className += ` ${styles['better']}`;
              }
              setMainMessage('GAME RESET');
              setMessage('Wrong answer');
              badAudio.play();
              messageBox.className += ` ${styles['wrong']}`;
            }, 300)
          }
        } else if (playerState.length === gameState.length) {
          if (playerState[stepState] === gameState[stepState]) {
            countDispatch({type:'INCREASE_COUNT'});
            setMainMessage("SIMONE'S TURN");
            setMessage("Good game !");
            turnDispatch({type:'SIMONES_TURN'});
          } else {
            gameDispatch({type:'RESET_GAME'});
            turnDispatch({type:'END_GAME', payload: turnInitialState});
            countDispatch({type:'RESET_COUNT', payload: countInitialState});
            setTimeout(() => {
              if (bestRef.current < countState) {
                bestRef.current = countState;
                bestShot.className += ` ${styles['better']}`;
              }
              setMainMessage('GAME RESET');
              setMessage(`Too bad, you were close !`);
              badAudio.play();
              messageBox.className += ` ${styles['wrong']}`;
            }, 750)
          }
          playerDispatch({type:'RESET_PLAYER'});
          stepDispatch({type:'RESET_STEP', payload: stepInitialState});
        } 
      }
    }
  }, [playerState])

  const handleClick = (color, sound) => {
    if (turnState === true) {
      playerDispatch(color);
      sound.play();
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
          <button value={0} className={styles.redButton} id='redButton' onClick={() => handleClick({type:'RED_BUTTON'}, audio1) }></button>
          <button value={1} className={styles.blueButton} id='blueButton' onClick={() => handleClick({type:'BLUE_BUTTON'}, audio2)}></button>
          <button value={2} className={styles.yellowButton} id='yellowButton' onClick={() => handleClick({type:'YELLOW_BUTTON'}, audio3)}></button>
          <button value={3} className={styles.greenButton} id='greenButton' onClick={() => handleClick({type:'GREEN_BUTTON'}, audio4)}></button>
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
