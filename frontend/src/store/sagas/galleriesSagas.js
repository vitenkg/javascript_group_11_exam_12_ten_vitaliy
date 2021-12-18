import {takeEvery, put} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    createImage, eraseUserImageRequest,
    fetchGalleryFailure,
    fetchGalleryRequest,
    fetchGallerySuccess, fetchUserGalleryFailure,
    fetchUserGalleryRequest, fetchUserGallerySuccess
} from "../actions/galleriesActions";
import {historyPush} from "../actions/historyActions";

export function* allGalleriesSagas() {
    try {
        const response = yield axiosApi.get('/galleries');
        yield put(fetchGallerySuccess(response.data))
    } catch (e) {
        toast.error('Error loading');
        yield put(fetchGalleryFailure(e));
    }
}


export function* userGalleriesSagas({payload: id}) {
    try {
        const response = yield axiosApi.get('/galleries/user/' + id);
        yield put(fetchUserGallerySuccess(response.data))

    } catch (e) {
        toast.error('Error loading');
        yield put(fetchUserGalleryFailure(e));
    }
}

export function* createImageSagas({payload: data}) {
    try {
        const response = yield axiosApi.post('/galleries/', data);
        console.log(response.data);
        yield put(fetchUserGallerySuccess(response.data))
        toast.success("Image Saved Successfully");
        yield put(historyPush('/'));
    } catch (e) {
        toast.error('Error save');
        yield put(fetchUserGalleryFailure(e));
    }
}

export function* eraseImageSagas({payload: id}) {
    console.log(id);
    try {
        yield axiosApi.delete('/galleries/' + id);
        toast.success("Image Delete Successfully");
    } catch (e) {
        toast.error('Error Erase');
    }
}

const galleriesSagas = [
    takeEvery(fetchGalleryRequest, allGalleriesSagas),
    takeEvery(fetchUserGalleryRequest, userGalleriesSagas),
    takeEvery(createImage, createImageSagas),
    takeEvery(eraseUserImageRequest, eraseImageSagas),

]

export default galleriesSagas;