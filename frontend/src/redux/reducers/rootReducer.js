import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import printReducer from "./printReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	item: itemReducer,
	auth: userReducer,
	print: printReducer,
});

export default rootReducer;
