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
      setValue();
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
