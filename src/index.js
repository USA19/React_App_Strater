import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./Redux";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(reduxThunk));
const persistor = persistStore(store);

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
