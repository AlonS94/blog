import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import newWrapper from '../../../../assets/newWrapper';
import actionsDispatch from '../../../../redux/actions';
import IndexPagination from './IndexPagination';
import './Pagination.scss';
import leftlight from '../../../../assets/img/Main/AllArticles/Pagination/left light.svg';
import leftDark from '../../../../assets/img/Main/AllArticles/Pagination/left dark.svg';
import rightDark from '../../../../assets/img/Main/AllArticles/Pagination/right  dark.svg';
import rightLight from '../../../../assets/img/Main/AllArticles/Pagination/right light.svg';

const Pagination = ({ pagination, getArticles, changeActiveButton }) => {
  const { articlesCount, numbersForPagination, activeButton, offset } = pagination;

  const onGetArticles = (event) => {
    getArticles(event * offset);
    changeActiveButton(event);
  };

  let AllPagination = null;
  if (numbersForPagination.length !== 0) {
    AllPagination = numbersForPagination.map((num) => (
      <IndexPagination key={num} index={num} onGetArticles={onGetArticles} />
    ));
  }
  return numbersForPagination.length !== 0 ? (
    <ul className="Pagination">
      <li className="Pagination__arrow Pagination__arrow_margin">
        <button
          disabled={activeButton === 1}
          onClick={() => {
            onGetArticles(activeButton - 1);
          }}
          type="button"
        >
          <img src={activeButton === 1 ? leftlight : leftDark} alt="предыдущая" />
        </button>
      </li>
      {AllPagination}
      <li className="Pagination__arrow Pagination__arrow_margin">
        <button
          disabled={activeButton === articlesCount}
          onClick={() => {
            onGetArticles(activeButton + 1);
          }}
          type="button"
        >
          <img src={activeButton === articlesCount ? rightLight : rightDark} alt="следующая" />
        </button>
      </li>
    </ul>
  ) : null;
};

Pagination.propTypes = {
  getArticles: PropTypes.func,
  changeActiveButton: PropTypes.func,
  pagination: PropTypes.shape({
    articlesCount: PropTypes.number,
    numbersForPagination: PropTypes.arrayOf(PropTypes.number),
    activeButton: PropTypes.number,
    offset: PropTypes.number,
  }),
};

Pagination.defaultProps = {
  getArticles: () => {},
  changeActiveButton: () => {},
  pagination: {},
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(newWrapper(Pagination, ['Pagination_margin']));
