export const getIsLogged = state => !!state.auth;
export const getIsLoading = state => state.ui.loading;
export const getError = state => state.ui.error;
export const getSuccessMessage = state => state.ui.successMessage;
export const getAdverts = state => state.adverts.result;
export const getTotalAdverts = state => state.adverts.totalFilteredAdverts;
export const getFavoritesAdverts = state => state.favoriteAdverts;
export const getMyAdverts = state => state.myAdverts;
export const getMyProfileDetails = state => state.myProfileDetails;
export const getMyFavoriteAdverts = state => state.myFavoriteAdverts;
export const getUserId = state => state.userId;