import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newWrapper from '../../../assets/newWrapper';
import actionsDispatch from '../../../Redux/actions';
import Article from './Article';
import LoadIndicator from './LoadingIndicator';
import Pagination from './Pagination';

const AllArticles = ({ articles, loading }) => {
  const Articles = articles.map((article) => (
    <li key={article.slug}>
      <Article info={article} className="Article__listHeight" />
    </li>
  ));
  return loading ? (
    <LoadIndicator />
  ) : (
    <>
      <ul>{Articles}</ul>
      <Pagination />
    </>
  );
};

AllArticles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

AllArticles.defaultProps = {
  articles: [{}],
  loading: false,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  loading: state.loading,
});

export default connect(mapStateToProps, actionsDispatch)(newWrapper(AllArticles, ['Articles']));
