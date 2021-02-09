import { compose, applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerReducer from "./reducers";
import loginReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage
};

const reducer = combineReducers({
  registerReducer, 
  loginReducer
})

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
