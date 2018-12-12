import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './Auth';


export default combineReducers({
  firebase: firebaseReducer,
  auth: authReducer
});