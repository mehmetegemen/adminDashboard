import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const reduxRouterMiddleware = routerMiddleware(createHashHistory());
const middleware = [thunk, reduxRouterMiddleware];

export default createStore(
  rootReducer,
  compose(applyMiddleware(...middleware)),
);
