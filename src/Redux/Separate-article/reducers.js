const SeparateArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'getArticle':
      return action.article;

    default:
      return state;
  }
};

export default SeparateArticleReducer;
