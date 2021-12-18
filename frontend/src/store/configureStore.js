import {combineReducers} from "redux";
import {initialState} from "./slices/usersSlice";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {rootSagas} from "./rootSagas";
import usersSlice from "./slices/usersSlice";
import galleriesSlice from "./slices/galleriesSlice";

const rootReducer = combineReducers({
  'users': usersSlice.reducer,
  'galleries': galleriesSlice.reducer,
});

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware(),
    sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
  preloadedState: persistedState,
});


sagaMiddleware.run(rootSagas);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      ...initialState,
      user: store.getState().users.user
    },
  });
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token
  } catch (e) {

  }

  return config;
});

axiosApi.interceptors.response.use(res => res, e => {
  if (!e.response) {
    e.response = {data: {global: 'No internet'}};
  }

  throw e;
});

export default store;