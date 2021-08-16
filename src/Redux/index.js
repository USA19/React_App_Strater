import { combineReducers } from "redux";
import LoaderReducer from "./Loader/Reducer";
import alertReducer from "./Alert/reducer";
import authReducer from "./Auth/reducer";
// import postReducer from "./Post/reducer";
// import userReducer from "./User/reducer";
// import Follows from "./Follows/reducer";
export default combineReducers({
  loading: LoaderReducer,
  alert: alertReducer,
  auth: authReducer,
  // posts: postReducer,
  // publicUser: userReducer,
  // follows: Follows,
  // message: MessageReducer,
  // categories: CategoriesReducer,
  // subscribers: SubscriberReducer,
});
