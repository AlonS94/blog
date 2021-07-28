import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import actionsDispatch from '../../../redux/actions';

const PrivateRoute = ({ children, profile, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      profile ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  profile: state.profile,
});

PrivateRoute.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      username: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

PrivateRoute.defaultProps = {
  profile: {},
};

export default connect(mapStateToProps, actionsDispatch)(PrivateRoute);
