import { bindActionCreators } from 'redux';
import DataAPI from '../../dataAPI';
import LocalStorage from '../../localStorage';
import store from '..';
import { error, notError } from '../Error/actions';

const API = new DataAPI();
const localStorage = new LocalStorage();

const { dispatch } = store;

const { OnError, OffError } = bindActionCreators(
  {
    OnError: error,
    OffError: notError,
  },
  dispatch
);

export const onLogOut = () => ({ type: 'onLogOut' });

export const onSign = (email, password, setError, setDisabled) => () => {
  setDisabled(true);
  API.onAuthentication(email, password)
    .then((respons) => {
      OffError();
      if (respons.errors) {
        setError(respons.errors);
        setDisabled(false);
      } else {
        setError(false);
        localStorage.sessionСreation(JSON.stringify(respons.user));
        dispatch({ type: 'onSign', profile: respons.user });
        setDisabled(false);
      }
    })
    .catch(() => OnError());
};

export const registration = (data, setError, setDisabled) => () => {
  setDisabled(true);
  API.onRegister(data)
    .then((respons) => {
      OffError();
      if (respons.errors) {
        setError(respons.errors);
        setDisabled(false);
      } else {
        setError(false);
        localStorage.sessionСreation(JSON.stringify(respons.user));
        dispatch({ type: 'registration', profile: respons.user });
        setDisabled(false);
      }
    })
    .catch(() => OnError());
};

export const onUpdateUSer = (body, setError, setDisabled) => () => {
  setDisabled(true);
  API.onUpdateUSer(body)
    .then((respons) => {
      OffError();
      if (respons.errors) {
        setError(respons.errors);
        setDisabled(false);
      } else {
        setError(false);
        localStorage.sessionСreation(JSON.stringify(respons.user));
        dispatch({ type: 'onSign', profile: respons.user });
        setDisabled(false);
      }
    })
    .catch(() => OnError());
};
