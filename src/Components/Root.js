import React, { Component } from 'react';
import { connect } from 'react-redux';
import { App, Results} from './index.js';
import { } from '../actions'

class Root extends Component {
    constructor() {
        super();
        this.state = {
            results : false
        }
    }

    render() {

        const { results } = this.props.App;
        if(!results){
            return (
                <div className='parent'>
                    <div className='right-panel'>
                        <App/>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='parent'>
                    <div className='right-panel'>
                        <App/>
                    </div>
                    <div className='left-panel'>
                        <Results/>
                    </div>
                </div>
            )
        }
       
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Root);