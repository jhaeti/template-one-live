import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	item: itemReducer,
	auth: userReducer,
});

export default rootReducer;
