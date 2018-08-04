import axios from 'axios';

import { hashHistory } from 'react-router';

import {
    
} from './types';
const API_URL = '/api';

export const submitIdea = idea => {

    return function (dispatch) {
        axios.post(`${API_URL}/idea`, { idea })
            .then(response => {
                console.log(response);
            }).catch( error => {
                console.log("woops error");
            })
    }

}
