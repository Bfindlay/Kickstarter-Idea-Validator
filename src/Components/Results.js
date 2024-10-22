import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GuageChart, ResultsBarChart } from './';


class Results extends Component {

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

        if(Object.keys(this.props.App.results).length === 0 && this.props.App.results.constructor === Object){
            return (
                <div className='content-box'>
                        <div className='top-panel'>
                            <div className='big-num'> <span style={{color: '#E0FF4F'}}>We</span> Believe In You!</div>
                        </div>
                </div>
            )
        }else{
            return (
                <div style={{paddingTop : '10em'}}className='content-box'>
                        <div style={{marginTop: '40em'}}className='top-panel'>
                            <div className='big-num'> Average Goal </div>
                            <ResultsBarChart similarAvg={similarGoalAvg} categoryAvg={categoryGoalAvg} invert={false} />
                        </div>
                        <div className='top-panel'>
                            <div className='big-num'> Average Backers </div>
                            <ResultsBarChart similarAvg={similarBackersAvg} categoryAvg={categoryBackersAvg} invert={true} />
                        </div>
                        <div className='top-panel'>
                            <div className='big-num'> Average Pledge </div>
                            <ResultsBarChart similarAvg={similarPledgeAvg} categoryAvg={categoryPledgeAvg} invert={false} />
                        </div>
                </div>
            )
        }
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Results);