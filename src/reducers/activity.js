import {
  SHOW_DIALOG,
  HIDE_DIALOG,
  SET_LOGOUT_TIME
} from '../actions/activity';

const initialState = {
  showDialog : false,
  logoutTime: null
};

export default (state=initialState, action)=>{
  if(action.type === SHOW_DIALOG){
    return Object.assign({}, state,{
      showDialog: true
    });
  }
  if(action.type === HIDE_DIALOG){
    return Object.assign({}, state,{
      showDialog: false
    });
  }
  if(action.type === SET_LOGOUT_TIME){
    return Object.assign({}, state,{
      logoutTime : action.logoutTime
    });
  }
  return state;
};