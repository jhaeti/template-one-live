import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	product: productReducer,
	auth: userReducer,
});

export default rootReducer;
