import { bindActionCreators } from 'redux';
import { startLoading, endLoading } from '../Loading-indicator/actions';
import { getArticlesCount } from '../Pagination/actions';
import DataAPI from '../../dataAPI';
import { error, notError } from '../Error/actions';
import store from '..';

const API = new DataAPI();

const { dispatch } = store;
const { articlesCount } = store.getState().pagination;
const { start, end, articlesCounts, OnError, OffError } = bindActionCreators(
  {
    start: startLoading,
    end: endLoading,
    articlesCounts: getArticlesCount,
    OnError: error,
    OffError: notError,
  },
  dispatch
);

const getArticles =
  (numberPagiation = 0) =>
  () => {
    /* начало загрузки */
    start();
    API.getListArticles(numberPagiation)
      .then((respons) => {
        OffError();
        if (!articlesCount) {
          /* ощбщее количество страниц */
          articlesCounts(Math.ceil(respons.articlesCount / respons.articles.length), respons.articles.length);
        }
        /* вывод статей  */
        dispatch({ type: 'getArticles', articles: respons.articles });
        /* конец загрузки */
        end();
      })
      .catch(() => {
        end();
        OnError();
      });
  };

export const getArticlesAfterLike = (newArticles) => ({ type: 'getArticles', articles: newArticles });

export default getArticles;
