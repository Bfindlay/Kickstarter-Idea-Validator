import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GuageChart, ResultsBarChart } from './';


class Summary extends Component {

    constructor() {
        super();
    }


    render() {
        const {
            category,
            successful,
            ratio,
            similarGoalAvg,
            similarBackersAvg,
            similarPledgeAvg,
            categoryGoalAvg,
            categoryBackersAvg,
            categoryPledgeAvg,
            similarDurationAvg,
            categoryDurationAvg,
        } = this.props.App.results;
        return (
            <div className='content-box'>
                <div className="top-panel">
                    <div className='big-num'> Predicted Category: <span style={{color: '#E0FF4F'}}>{ category }</span></div>
                    <div className='big-num'> <span style={{color: '#E0FF4F'}}>{ Math.floor(successful * ratio) }</span> Similar Succesful Projects </div>
                    <div className='big-num'> <span style={{color: '#E0FF4F'}}>{ similarDurationAvg }</span> Days Avg Campaign Length </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Summary);