import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AllArticles from '../../Main/AllArticles';
import Article from '../../Main/AllArticles/Article';
import { RegistrationForm, SignIn, Profile, CreateArticle } from '../../Main/Forms';
import actionsDispatch from '../../../redux/actions';
import PrivateRoute from '../PrivateRoute';

const RouterControl = ({ getArticle, article, profile }) => {
  const username = profile ? profile.username : null;

  return (
    <Switch>
      <Route path="/" component={AllArticles} exact />
      <Route path="/articles" component={AllArticles} exact />
      <Route
        path="/articles/:slug/"
        render={({ match }) => {
          if (article.slug !== match.params.slug) {
            getArticle(match.params.slug);
          }
          return <Article info={article} profileUSer={username} />;
        }}
        exact
      />
      <Route path="/sign-up" component={RegistrationForm} />
      <Route path="/sign-in" component={SignIn} />
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <PrivateRoute path="/new-article">
        <CreateArticle heading="Create new article" />;
      </PrivateRoute>

      <Route
        path="/articles/:slug/edit"
        render={({ match }) => {
          if (!profile) return <Redirect to="/sign-in" />;
          if (article.slug !== match.params.slug) {
            getArticle(match.params.slug);
          }
          return <CreateArticle heading="Edit article" edit />;
        }}
      />
      <Redirect to="/" />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
  profile: state.profile,
});

RouterControl.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      username: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  article: PropTypes.shape({
    slug: PropTypes.string,
  }),
  getArticle: PropTypes.func,
};

RouterControl.defaultProps = {
  profile: {},
  article: {},
  getArticle: () => {},
};

export default connect(mapStateToProps, actionsDispatch)(RouterControl);
