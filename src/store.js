import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
const middleware = applyMiddleware(logger);

const initialState = {
  groceries: [],
  view: "",
};

const viewsReducer = (view = "", action) => {
  if (action.type === "SET_VIEW") {
    return action.view;
  }
  return view;
};
const groceriesReducer = (groceries = [], action) => {
  if (action.type === "LOAD") {
    return action.groceries;
  }
  if (action.type === "UPDATE") {
    return groceries.map((grocery) =>
      grocery.id === action.grocery.id ? action.grocery : grocery
    );
  }
  if (action.type === "CREATE") {
    return [...groceries, action.grocery];
  }
  return groceries;
};

const rootReducer = combineReducers({
  groceries: groceriesReducer,
  view: viewsReducer,
});

export { viewsReducer, groceriesReducer };

const store = createStore(rootReducer, middleware);

export default store;
