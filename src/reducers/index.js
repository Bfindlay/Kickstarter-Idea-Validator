import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import appReducer from './AppReducer';
export default combineReducers({
    Auth: authReducer,
    User: userReducer,
    App: appReducer
})