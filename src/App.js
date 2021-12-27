import React from 'react';
import './App.css';
// import Buttons from './components/Buttons';
import Player from './components/Player';

function App() {
  // const [ score, setScore ] = useState(0);
  // const [ gameChain, setGameChain ] = useState([]);
  // const [ gameTry, setGameTry ] = useState([]);

  return (
    <div className="App">
      {/* <Buttons setGameTry={setGameTry} gameTry={gameTry} /> */}
      <Player />
    </div>
  );
}

export default App;
