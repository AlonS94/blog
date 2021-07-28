import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import actionsDispatch from '../../redux/actions';
import './App.scss';
import Header from '../Header';
import RouterControl from './RouterControl';
import ErrorWindow from '../ErrorWindow';

const App = ({ getErrorWindow, getArticles, pagination, getNumbersForPagination }) => {
  function numbersForPagination(num) {
    const numbers = [];
    for (let i = 1; i <= num; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  useEffect(() => {
    /* массив с нумерацией для пагинации */
    getNumbersForPagination(numbersForPagination(pagination.articlesCount));
  }, [getNumbersForPagination, pagination.articlesCount]);

  return (
    <>
      <Router>
        <Header />
        <main>{getErrorWindow ? <ErrorWindow /> : <RouterControl />}</main>
      </Router>
    </>
  );
};

App.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
  }),
  getArticles: PropTypes.func,
  getNumbersForPagination: PropTypes.func,
  pagination: PropTypes.shape({
    articlesCount: PropTypes.number,
    numbersForPagination: PropTypes.arrayOf(PropTypes.number),
  }),
  getErrorWindow: PropTypes.bool.isRequired,
};

App.defaultProps = {
  article: {},
  getArticles: () => {},
  getNumbersForPagination: () => {},
  pagination: {},
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
  article: state.article,
  profile: state.profile,
  getErrorWindow: state.getErrorWindow,
});

export default connect(mapStateToProps, actionsDispatch)(App);
