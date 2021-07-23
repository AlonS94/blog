const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'getArticles':
      return action.articles;

    default:
      return state;
  }
};

export default articlesReducer;
