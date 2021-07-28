import { bindActionCreators } from 'redux';
import DataAPI from '../../dataAPI';
import store from '..';
import { error, notError } from '../Error/actions';
import { startLoading, endLoading } from '../Loading-indicator/actions';

const API = new DataAPI();

const { dispatch } = store;

const { start, end, OnError, OffError } = bindActionCreators(
  {
    start: startLoading,
    end: endLoading,
    OnError: error,
    OffError: notError,
  },
  dispatch
);

const getArticle = (slug) => () => {
  start();
  API.getArticle(slug)
    .then((elem) => {
      OffError();
      dispatch({ type: 'getArticle', article: elem.article });
      end();
    })
    .catch(() => {
      end();
      OnError();
    });
};

export const getOnFavoriteArticle = (slug) => () => {
  API.onFavoriteArticle(slug)
    .then((respons) => {
      OffError();
      dispatch({ type: 'getArticle', article: respons.article });
    })
    .catch(() => OnError());
};

export const onUnfavoriteArticle = (slug) => () => {
  API.onUnfavoriteArticle(slug)
    .then((respons) => {
      OffError();
      dispatch({ type: 'getArticle', article: respons.article });
    })
    .catch(() => OnError());
};

export default getArticle;
