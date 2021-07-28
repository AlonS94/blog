import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Profile.scss';
import profil from '../../../../assets/img/Main/AllArticles/Profile/profile.png';
import ModalWindow from '../../Forms/ModalWindow';
import DataAPI from '../../../../dataAPI';
import actionsDispatch from '../../../../redux/actions';

const Profile = ({ author, createdAt, profileUSer, history, article, getArticles }) => {
  const { username, image } = author;
  const { slug } = article;
  const [windowVisible, setWindowVisible] = useState(false);

  const API = new DataAPI();

  const data = new Date(createdAt);
  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = data.getDate();
  const month = allMonths[data.getMonth()];
  const year = data.getFullYear();

  const formatData = `${month} ${day}, ${year}`;

  /* зОчем библиотеки, если можно написать плохой код? */

  const goStartPAge = async () => {
    getArticles(0);
    history.push(`/articles`);
  };

  const onClicYes = async () => {
    await API.onDeleteArticle(slug);
    await goStartPAge();
  };

  const onClickNo = () => {
    setWindowVisible(false);
  };

  return (
    <>
      <div className="profile">
        <div>
          <p className="profile_name">{username}</p>
          <p className="profile_date">{formatData}</p>
        </div>
        <img src={image || profil} alt="profile" />
      </div>
      {profileUSer === username ? (
        <div className="profile__wrapperForBtn">
          <button className="profile__btn profile__btn_del" type="button" onClick={() => setWindowVisible(true)}>
            Delete
          </button>
          {windowVisible && (
            <ModalWindow
              message="Are you sure to delete this article?"
              onClickYes={() => onClicYes()}
              onClickNo={() => onClickNo()}
            />
          )}
          <button
            className="profile__btn profile__btn_edit"
            type="button"
            onClick={() => {
              history.push(`${history.location.pathname}/edit`);
            }}
          >
            Edit
          </button>
        </div>
      ) : null}
    </>
  );
};

Profile.propTypes = {
  author: PropTypes.shape({
    bio: PropTypes.string,
    following: PropTypes.bool,
    image: PropTypes.string,
    username: PropTypes.string,
  }),
  profileUSer: PropTypes.string,
  createdAt: PropTypes.string,
  getArticles: PropTypes.func,
  article: PropTypes.shape({
    slug: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  profileUSer: '',
  author: {},
  createdAt: '',
  getArticles: () => {},
  article: {},
  history: {},
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  pagination: state.pagination,
  article: state.article,
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(withRouter(Profile));
