import {
  SET_CURRENT_USER,
  SET_USER_FAILED,
  START_FETCHING_USER,
  ADD_BLOG_TO_AUTH,
} from "./types";
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null,
};

const auth_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_FETCHING_USER:
      return { ...state, loading: true, isAuthenticated: false };
    case SET_CURRENT_USER:
      return { ...state, isAuthenticated: true, user: payload, loading: false };
    case SET_USER_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
        error: payload,
      };
    case ADD_BLOG_TO_AUTH:
      return {
        ...state,
        user: {
          ...state.user,
          blogs: [...state.user.blogs, payload],
        },
      };
    default:
      return state;
  }
};
export default auth_reducer;
