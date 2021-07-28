import getArticles, { getArticlesAfterLike } from './Articles/actions';
import { startLoading, endLoading } from './Loading-indicator/actions';
import { getArticlesCount, getNumbersForPagination, changeActiveButton } from './Pagination/actions';
import getArticle, { getOnFavoriteArticle, onUnfavoriteArticle } from './Separate-article/actions';
import { onSign, registration, onLogOut, onUpdateUSer } from './Profile/actions';

const actionsDispatch = {
  getArticlesAfterLike,
  onUpdateUSer,
  getArticles,
  startLoading,
  endLoading,
  getArticlesCount,
  getNumbersForPagination,
  changeActiveButton,
  getArticle,
  onSign,
  onLogOut,
  registration,
  getOnFavoriteArticle,
  onUnfavoriteArticle,
};

export default actionsDispatch;
