import axios from 'axios';

import { hashHistory } from 'react-router';
import { RESULTS } from './types';
import {
    
} from './types';
const API_URL = '/api';

export const submitIdea = idea => {

    return function (dispatch) {
        axios.post(`${API_URL}/idea`, { idea })
            .then(response => {
                console.log(response.data);
                dispatch({type: RESULTS, payload: response.data})
            }).catch( error => {
                console.log("woops error");
            })
    }

}
