const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'endLoading':
      return false;

    case 'startLoading':
      return true;

    default:
      return state;
  }
};

export default LoadingReducer;
