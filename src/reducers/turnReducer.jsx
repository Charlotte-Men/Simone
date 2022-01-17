  const turnReducer = (turnState, action) => {
    switch (action.type) {
      case 'PLAYERS_TURN':
        return true
      case 'SIMONES_TURN':
        return false
      case 'END_GAME':
        return action.payload
      default:
        return turnState
    }
  };
  
  export default  turnReducer ;
