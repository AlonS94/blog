import { bindActionCreators } from 'redux';
import { startLoading, endLoading } from '../Loading-indicator/actions';
import { getArticlesCount } from '../Pagination/actions';
import DataAPI from '../../DataAPI';
import store from '..';

const API = new DataAPI();

const { dispatch } = store;
const { articlesCount } = store.getState().pagination;

const { start, end, articlesCounts } = bindActionCreators(
  {
    start: startLoading,
    end: endLoading,
    articlesCounts: getArticlesCount,
  },
  dispatch
);

const getArticles =
  (token = false, numberPagiation = 0) =>
  () => {
    /* начало загрузки */
    start();
    API.getListArticles(numberPagiation, token).then((respons) => {
      if (!articlesCount) {
        /* ощбщее количество страниц */
        articlesCounts(Math.ceil(respons.articlesCount / respons.articles.length));
      }
      /* вывод статей  */
      dispatch({ type: 'getArticles', articles: respons.articles });
      /* конец загрузки */
      end();
    });
  };
export default getArticles;
