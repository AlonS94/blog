const ErrorReducer = (state = false, action) => {
  switch (action.type) {
    case 'error':
      return true;

    case 'notError':
      return false;

    default:
      return state;
  }
};

export default ErrorReducer;
