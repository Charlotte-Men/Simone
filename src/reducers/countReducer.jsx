const countReducer = (countState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return countState+1
    case 'RESET_COUNT':
      return action.payload
    default:
      return countState
  }
};

export default countReducer;
