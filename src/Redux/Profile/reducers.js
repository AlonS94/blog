import LocalStorage from '../../LocalStorage';

const ls = new LocalStorage();

const profile = JSON.parse(ls.checkProfile('user'));

const ProfileReducer = (state = profile, action) => {
  switch (action.type) {
    case 'onSign':
      return action.profile;

    case 'registration':
      return action.profile;

    case 'onLogOut':
      return false;

    default:
      return state;
  }
};

export default ProfileReducer;
