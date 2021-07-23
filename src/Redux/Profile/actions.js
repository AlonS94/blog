import DataAPI from '../../DataAPI';
import LocalStorage from '../../LocalStorage';

const API = new DataAPI();
const localStorage = new LocalStorage();

export const onLogOut = () => ({ type: 'onLogOut' });

export const onSign = (email, password) => (dispatch) => {
  API.onAuthentication(email, password).then((respons) => {
    localStorage.sessionСreation(JSON.stringify(respons.user));
    dispatch({ type: 'onSign', profile: respons.user });
  });
};

export const registration = (data, setError) => (dispatch) => {
  API.onRegister(data).then((respons) => {
    if (respons.errors) {
      setError(respons.errors);
    } else {
      setError(false);
      localStorage.sessionСreation(JSON.stringify(respons.user));
      dispatch({ type: 'registration', profile: respons.user });
    }
  });
};

export const onUpdateUSer = (token, body, setError) => (dispatch) => {
  API.onUpdateUSer(token, body).then((respons) => {
    if (respons.errors) setError(respons.errors);
    else {
      setError(false);
      localStorage.sessionСreation(JSON.stringify(respons.user));
      dispatch({ type: 'onSign', profile: respons.user });
    }
  });
};
