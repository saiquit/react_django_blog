import {
  START_FETCHING_BLOG,
  BLOG_FETCHING_SUCCESS,
  BLOG_FETCHING_ERROR,
} from "./types";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  count: 0,
  next_page: null,
  previous_page: null,
};

const blog_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_FETCHING_BLOG:
      return { ...state, loading: true };
    case BLOG_FETCHING_SUCCESS:
      return {
        ...state,
        blogs: payload.results,
        count: payload.count,
        next_page: payload.next,
        previous_page: payload.previous,
        loading: false,
      };
    case BLOG_FETCHING_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default blog_reducer;
