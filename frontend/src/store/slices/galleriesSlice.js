import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    fetchLoading: false,
    galleries: null,
    loadingError: null,
    createError: null,
    createLoading: null

};

const name = 'galleries';

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchGalleryRequest(state, action) {
            state.fetchLoading = true;
        },
        fetchGallerySuccess(state, action) {
            state.fetchLoading = false;
            state.galleries = action.payload;
        },
        fetchGalleryFailure(state, action) {
            state.loginError = action.payload;
            state.fetchLoading = false;
        },
        fetchUserGalleryRequest(state, action) {
            state.fetchLoading = true;
        },
        fetchUserGallerySuccess(state, action) {
            state.fetchLoading = true;
            state.galleries = action.payload;
        },
        fetchUserGalleryFailure(state, action) {
            state.fetchLoading = true;
            state.loginError = action.payload;
        },
        clearErrorGallery (state, action) {
            state.createError = null;
        },
        createImage (state, action) {

        },
        createImageSuccess (state, action) {
            state.createLoading = true
        },
        createImageFailure (state, action) {
            state.createLoading = false

        },
        eraseUserImageRequest (state, action) {
            state.createLoading = false

        },
    }
});

export default usersSlice;