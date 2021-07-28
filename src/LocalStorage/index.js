export default class LocalStorage {
  sessionСreation = (profile) => {
    localStorage.setItem('user', profile);
  };

  getProfile = (profile) => localStorage.getItem(profile);
}
