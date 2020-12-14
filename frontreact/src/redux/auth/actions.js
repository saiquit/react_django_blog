import {
  SET_CURRENT_USER,
  SET_USER_FAILED,
  START_FETCHING_USER,
  ADD_BLOG_TO_AUTH,
} from "./types";

import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";

export const getCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const fetchingStart = () => ({
  type: START_FETCHING_USER,
});
export const errorUser = (payload) => ({
  type: SET_USER_FAILED,
  payload: payload,
});

export const loginUser = (user, history) => (dispatch) => {
  axios
    .post("/api/token/", user)
    .then((res) => {
      dispatch(fetchingStart());
      const { access } = res.data;
      localStorage.setItem("jwtToken", access);
      setAuthToken(access);
      // const decoded = jwt_decode(access);
      // dispatch(getCurrentUser(decoded));
    })
    .then(() => {
      axios.get("/api/accounts/").then((data) => {
        dispatch(getCurrentUser(data.data[0]));
        history.push("/");
      });
    })
    .catch((err) => {
      dispatch(errorUser(err.response));
    });
};

export const getUserAsync = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwtToken");
    dispatch(fetchingStart());
    try {
      if (!token) {
        dispatch(errorUser({}));
      } else {
        const userReq = await axios.get("/api/accounts/", {
          headers: {
            authorization: `Berear ${token}`,
          },
        });
        setAuthToken(token);
        dispatch(getCurrentUser(userReq.data[0]));
      }
    } catch (error) {
      dispatch(errorUser(error.response));
    }
  };
};
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(errorUser("User Logged Out"));
  history.push("/");
};

export const addBlogToUser = (payload) => ({
  type: ADD_BLOG_TO_AUTH,
  payload,
});
