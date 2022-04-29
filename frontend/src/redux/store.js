import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== "production") {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	}
	return rootReducer(state, action);
};

const makeStore = () => createStore(reducer, bindMiddleware([thunk]));

const wrapper = createWrapper(makeStore);

export default wrapper;
