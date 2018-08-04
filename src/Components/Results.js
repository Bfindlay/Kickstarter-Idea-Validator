import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../';


class Results extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
       
    }

    render() {
        return (
            <div className='content-box'>
                <p> Results Here! </p>
            </div>
        )
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Results);