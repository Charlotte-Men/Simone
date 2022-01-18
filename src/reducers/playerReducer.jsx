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
export default playerReducer;
