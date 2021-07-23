import { combineReducers } from 'redux';
import articlesReducer from './Articles/reducers';
import LoadingReducer from './Loading-indicator/reducers';
import paginationReducer from './Pagination/reducers';
import SeparateArticleReducer from './Separate-article/reducers';
import ProfileReducer from './Profile/reducers';

const rootReducer = combineReducers({
  articles: articlesReducer,
  loading: LoadingReducer,
  pagination: paginationReducer,
  article: SeparateArticleReducer,
  profile: ProfileReducer,
});

export default rootReducer;
