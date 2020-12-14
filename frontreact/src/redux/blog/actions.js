import Axios from "axios";
import {
  START_FETCHING_BLOG,
  BLOG_FETCHING_SUCCESS,
  BLOG_FETCHING_ERROR,
} from "./types";

export const startFetching = () => ({
  type: START_FETCHING_BLOG,
});

export const fetchingSuccess = (payload) => ({
  type: BLOG_FETCHING_SUCCESS,
  payload,
});
export const fetchingError = (payload) => ({
  type: BLOG_FETCHING_ERROR,
  payload,
});

export const fetchingBlogAsync = (url) => async (dispatch) => {
  dispatch(startFetching());
  try {
    if (!url) {
      const { data } = await Axios.get("/api/blogs/");
      dispatch(fetchingSuccess(data));
    } else {
      const { data } = await Axios.get(url.substr(22));
      dispatch(fetchingSuccess(data));
    }
  } catch (error) {
    dispatch(fetchingError(error));
  }
};
