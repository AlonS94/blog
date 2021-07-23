/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import actionsDispatch from '../../../../Redux/actions';
import heart from '../../../../assets/img/Main/AllArticles/Article/heart.png';
import activHeart from '../../../../assets/img/Main/AllArticles/Article/activHeart.png';
import Profile from '../Profile';
import Tag from '../Tag';
import './Article.scss';

const Article = ({ info, profileUSer, history, className, profile, getOnFavoriteArticle, onUnfavoriteArticle }) => {
  const { title, slug, body, createdAt, tagList, author, favorited, favoritesCount } = info;

  const token = profile ? profile.token : null;

  const onLike = async () => {
    getOnFavoriteArticle(token, slug);
  };

  const unLike = async () => {
    onUnfavoriteArticle(token, slug);
  };

  const changeLike = () => {
    if (favorited) unLike();
    else onLike();
  };

  return (
    <article className={`Article Article_margin + ${className}`}>
      <header className="Article__header">
        <div>
          <h2>
            <button
              type="button"
              className="Article__heading"
              onClick={() => {
                history.push(`/articles/${slug}`);
              }}
            >
              {title}
            </button>
            <button type="button" className="Article__heart" onClick={changeLike} disabled={!profile}>
              <img src={!favorited ? heart : activHeart} alt="heart" /> <span>{favoritesCount}</span>
            </button>
          </h2>
          <Tag tagList={tagList} />
        </div>
        <Profile author={author} createdAt={createdAt} profileUSer={profileUSer} />
      </header>
      <div className="Article__txt">
        <ReactMarkdown children={body} />
      </div>
    </article>
  );
};

Article.propTypes = {
  info: PropTypes.shape({
    author: PropTypes.shape({
      bio: PropTypes.string,
      following: PropTypes.bool,
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    slug: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      token: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  className: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  profileUSer: PropTypes.string,
  getOnFavoriteArticle: PropTypes.func,
  onUnfavoriteArticle: PropTypes.func,
};

Article.defaultProps = {
  info: {},
  profile: {},
  className: '',
  history: {},
  profileUSer: '',
  getOnFavoriteArticle: () => {},
  onUnfavoriteArticle: () => {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(withRouter(Article));
