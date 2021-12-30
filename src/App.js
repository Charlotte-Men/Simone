import React from 'react';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';

function App() {
  // const [ score, setScore ] = useState(0);
  // const [ gameChain, setGameChain ] = useState([]);
  // const [ gameTry, setGameTry ] = useState([]);

  return (
    <div className="App">
      <Header />
      <Player />
    </div>
  );
}

export default App;
