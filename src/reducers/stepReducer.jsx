const stepReducer = (stepState, action) => {
  switch (action.type) {
    case 'INCREASE_STEP':
      return stepState+1
    case 'RESET_STEP':
      return action.payload
    default:
      return stepState
  }
};

export default stepReducer;
