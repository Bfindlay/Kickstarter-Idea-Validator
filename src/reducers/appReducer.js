
import {  UNAUTH_USER } from '../actions/types';
import { REHYDRATE } from 'redux-persist/lib/constants'
const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        
        default:
            return {... state }
    }
    
}
