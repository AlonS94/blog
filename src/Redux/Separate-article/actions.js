import DataAPI from '../../DataAPI';
import store from '..';

const API = new DataAPI();

const { dispatch } = store;
const { article } = store.getState();

const getArticle =
  (slug, token = false) =>
  () => {
    if (article.slug !== slug) {
      API.getArticle(slug, token).then((elem) => {
        dispatch({ type: 'getArticle', article: elem.article });
      });
    }
  };

export const getOnFavoriteArticle = (token, slug) => () => {
  API.onFavoriteArticle(token, slug).then((respons) => {
    dispatch({ type: 'getArticle', article: respons.article });
  });
};

export const onUnfavoriteArticle = (token, slug) => () => {
  API.onUnfavoriteArticle(token, slug).then((respons) => {
    dispatch({ type: 'getArticle', article: respons.article });
  });
};

export default getArticle;
