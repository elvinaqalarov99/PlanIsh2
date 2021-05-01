import { SIGN_IN, UPDATE } from '../actions/users';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE:
      return {
        ...state,
        user: { ...state.user, photoURL: action.image },
      };
    default:
      return state;
  }
};

export default userReducer;
