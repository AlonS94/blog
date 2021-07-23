export const getArticlesCount = (articlesCount) => ({ type: 'articlesCount', articlesCount });
export const getNumbersForPagination = (numbersForPagination) => ({
  type: 'numbersForPagination',
  numbersForPagination,
});
export const changeActiveButton = (activeButton) => ({ type: 'changeActiveButton', activeButton });
