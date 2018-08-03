import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorBoundry } from './index.js';
import { App } from './';

class Root extends Component {
    constructor() {
        super();
    }


    render() {
        console.log('current props', this.props.User);

        return (
            <div>

                {this.props.children}

            </div>
        )
    }
}

const mapStateToProp = ({ User, App }) => ({ User, App });
export default connect(mapStateToProp, {})(Root);