import React, { useState, useEffect } from "react";

const Player = () => {
  // const [simoneTurn, setSimoneTurn] = useState(false);
  // const [playerTurn, setPlayerTurn] = useState(false);
  const [gameChain, setGameChain] = useState([Math.floor(Math.random() * 4)]);
  const [gameTry, setGameTry] = useState([]);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState();

  const simoneTurn = (gameStep) => {
    setGameChain([...gameChain, gameStep]);
    console.log(gameChain);
    setCount(count +1);
  };

  // const play = (number) => {
  //   setValue(number);
  //   console.log(value)
  // }

  useEffect(() => {
    setGameTry([...gameTry, value]);
    console.log(gameTry);
  }, [value])

  // useEffect(() => {
  //   // value &&
  //   // while (gameTry.length < gameChain.length) {
  //     setGameTry([...gameTry, value]);
  //     console.log(gameTry);
  //   // };
  // }, [value])

  return(
    <div>
      <button onClick={() => simoneTurn(Math.floor(Math.random() * 4))}>START A GAME</button>
      <div>
        <button onClick={() => setValue(0)}>0</button>
        <button onClick={() => setValue(1)}>1</button>
        <button onClick={() => setValue(2)}>2</button>
        <button onClick={() => setValue(3)}>3</button>
      </div>
      <p>Count : {count}</p>
      <button 
      // onClick={() => testChain()}
      >Is it correct ?</button>
    </div>
  )
} 

export default Player;
