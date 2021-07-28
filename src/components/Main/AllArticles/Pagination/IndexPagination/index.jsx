import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './IndexPagination.scss';
import actionsDispatch from '../../../../../redux/actions';

const IndexPagination = ({ index, pagination, onGetArticles }) => {
  const { articlesCount, activeButton } = pagination;

  let className = 'Index Index_margin';
  if (index === activeButton) {
    className += ' Index__active';
  }

  return index <= 5 || index > articlesCount - 5 || (activeButton > index - 3 && activeButton < index + 3) ? (
    <li>
      <button type="button" className={className} onClick={() => onGetArticles(index)}>
        {index}
      </button>
    </li>
  ) : (
    '..'
  );
};

IndexPagination.propTypes = {
  index: PropTypes.number,
  activeButton: PropTypes.number,
  pagination: PropTypes.shape({
    articlesCount: PropTypes.number,
    activeButton: PropTypes.number,
  }),
  onGetArticles: PropTypes.func,
};

IndexPagination.defaultProps = {
  index: 'кажется произошла ошибка',
  activeButton: 1,
  pagination: {},
  onGetArticles: () => {},
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
});

export default connect(mapStateToProps, actionsDispatch)(IndexPagination);
