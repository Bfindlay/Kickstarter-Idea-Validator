
import { } from '../actions/types';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { hashHistory } from 'react-router';
const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
       
        default:
            return {... state }
    }
    
}
