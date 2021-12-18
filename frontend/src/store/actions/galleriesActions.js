import galleriesSlice from "../slices/galleriesSlice";

export const {
    fetchGalleryRequest,
    fetchGallerySuccess,
    fetchGalleryFailure,
    fetchUserGalleryRequest,
    fetchUserGallerySuccess,
    fetchUserGalleryFailure,
    clearErrorGallery,
    createImage,
    createImageSuccess,
    createImageFailure,
    eraseUserImageRequest,
    eraseUserImageSuccess,
    eraseUserImageFailure,
} = galleriesSlice.actions;