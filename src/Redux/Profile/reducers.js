import LocalStorage from '../../localStorage';

const ls = new LocalStorage();

const profile = JSON.parse(ls.getProfile('user'));

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
