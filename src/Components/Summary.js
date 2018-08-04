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
        if (Object.keys(this.props.App.results).length === 0 && this.props.App.results.constructor === Object) {
            return (
                <div className='content-box'>
                    <div className='top-panel'>
                        <div className='big-num'>Looks Like <span style={{color: '#E0FF4F'}}>this</span> has never been done before.</div>
                        <div className='lil-num'>"Do. Or do not. There is no try." <span style={{color: '#E0FF4F'}}>- Yoda</span></div>
                        <div className="bottom-panel">
                        <GuageChart value={1} />
                        <div style={{textAlign: 'center'}}className='big-num'>Predicted <span style={{ color: '#E0FF4F' }}>{100}%</span> Chance of 
                            <span style={{ color: '#E20000' }}> failure </span>if you don't try</div>
                    </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='content-box'>
                    <div className="top-panel">
                        <div className='big-num'> Predicted Category: <span style={{ color: '#E0FF4F' }}>{category}</span></div>
                        <div className='big-num'> <span style={{ color: '#E0FF4F' }}>{Math.floor(successful * ratio)}</span> Similar Succesful Projects </div>
                        <div className='big-num'> <span style={{ color: '#E0FF4F' }}>{Math.floor(similarDurationAvg)}</span> Days Avg Campaign Length </div>
                    </div>
                    <div className="bottom-panel">
                        <GuageChart value={ratio} />
                        <div className='big-num'>Predicted <span style={{ color: '#E0FF4F' }}>{ratio * 100}%</span> Chance of success </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Summary);