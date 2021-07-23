import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import actionsDispatch from '../../Redux/actions';
import './App.scss';
import Header from '../Header';
import AllArticles from '../Main/AllArticles';
import Article from '../Main/AllArticles/Article';
import { RegistrationForm, SignIn, Profile, CreateArticle } from '../Main/Forms';

const App = ({ article, getArticles, pagination, getNumbersForPagination, getArticle, profile }) => {
  const username = profile ? profile.username : false;
  const token = profile ? profile.token : undefined;

  function numbersForPagination(num) {
    const numbers = [];
    for (let i = 1; i <= num; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  useEffect(() => {
    getArticles(token);
  }, [getArticles, token]);

  useEffect(() => {
    /* массив с нумерацией для пагинации */
    getNumbersForPagination(numbersForPagination(pagination.articlesCount));
  }, [getNumbersForPagination, pagination.articlesCount]);

  return (
    <>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" component={AllArticles} exact />
            <Route path="/articles" component={AllArticles} exact />
            <Route
              path="/articles/:slug/"
              render={({ match }) => {
                if (article.slug !== match.params.slug) {
                  getArticle(match.params.slug, token);
                }
                return <Article info={article} profileUSer={username} />;
              }}
              exact
            />
            <Route path="/sign-up" component={RegistrationForm} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <Route
              path="/new-article"
              render={() => {
                if (!profile) return <Redirect to="/sign-in" />;
                return <CreateArticle heading="Create new article" />;
              }}
            />
            <Route
              path="/articles/:slug/edit"
              render={({ match }) => {
                if (!profile) return <Redirect to="/sign-in" />;
                if (article.slug !== match.params.slug) {
                  getArticle(match.params.slug, profile.token);
                }
                return <CreateArticle heading="Edit article" edit />;
              }}
            />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </>
  );
};

App.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      username: PropTypes.string,
      token: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  article: PropTypes.shape({
    slug: PropTypes.string,
  }),
  getArticle: PropTypes.func,
  getArticles: PropTypes.func,
  getNumbersForPagination: PropTypes.func,
  pagination: PropTypes.shape({
    articlesCount: PropTypes.number,
    numbersForPagination: PropTypes.arrayOf(PropTypes.number),
  }),
};

App.defaultProps = {
  profile: {},
  article: {},
  getArticle: () => {},
  getArticles: () => {},
  getNumbersForPagination: () => {},
  pagination: {},
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
  article: state.article,
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(App);
