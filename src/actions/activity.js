export const SHOW_DIALOG = 'SHOW_DIALOG';
export const showDialog = () => ({
  type: SHOW_DIALOG
});

export const HIDE_DIALOG = 'HIDE_DIALOG';
export const hideDialog = () => ({
  type: HIDE_DIALOG
});

export const SET_LOGOUT_TIME = 'SET_LOGOUT_TIME';
export const setLogoutTime = logoutTime => ({
  type: SET_LOGOUT_TIME,
  logoutTime
});