import { combineReducers } from "redux";
import auth_reducer from "./auth/reducers";
import blog_reducer from "./blog/reducers";
export default combineReducers({
  auth: auth_reducer,
  blog: blog_reducer,
});
