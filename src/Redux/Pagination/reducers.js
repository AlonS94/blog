const defaultstate = {
  articlesCount: 0,
  numbersForPagination: [],
  activeButton: 1,
};

const paginationReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case 'articlesCount':
      return { ...state, articlesCount: action.articlesCount };

    case 'numbersForPagination':
      return { ...state, numbersForPagination: action.numbersForPagination };

    case 'changeActiveButton':
      return { ...state, activeButton: action.activeButton };

    default:
      return state;
  }
};

export default paginationReducer;
