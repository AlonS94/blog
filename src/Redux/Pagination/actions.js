export const getArticlesCount = (articlesCount, offset) => ({ type: 'articlesCount', articlesCount, offset });
export const getNumbersForPagination = (numbersForPagination) => ({
  type: 'numbersForPagination',
  numbersForPagination,
});
export const changeActiveButton = (activeButton) => ({ type: 'changeActiveButton', activeButton });
