export default class LocalStorage {
  sessionСreation = (profile) => {
    localStorage.setItem('user', profile);
  };

  checkProfile = (profile) => localStorage.getItem(profile);
}
