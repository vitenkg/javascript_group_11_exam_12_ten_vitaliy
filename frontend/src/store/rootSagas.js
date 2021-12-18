import {all} from "redux-saga/effects";
import registerUserSaga from "./sagas/usersSagas";
import facebookUserSaga from "./sagas/usersSagas";
import loginUserSaga from "./sagas/usersSagas";
import allGalleriesSagas from "./sagas/galleriesSagas";
import userGalleriesSagas from "./sagas/galleriesSagas";
import createImageSagas from "./sagas/galleriesSagas";
import eraseImageSagas from "./sagas/galleriesSagas";


export function* rootSagas() {
    yield all([
        ...eraseImageSagas,
        ...createImageSagas,
        ...userGalleriesSagas,
        ...allGalleriesSagas,
        ...registerUserSaga,
        ...loginUserSaga,
        ...facebookUserSaga,
    ])
}