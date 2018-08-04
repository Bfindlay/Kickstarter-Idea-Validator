
import {  RESULTS } from '../actions/types';
const INITIAL_STATE = { RESULTS : null }

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case RESULTS: {
            console.log("REDUCER GOT RESULTS", action.payload);
            return {...state, results: action.payload }
        }
        default:
            return {... state }
    }
    
}
