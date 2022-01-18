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

export default gameReducer;
