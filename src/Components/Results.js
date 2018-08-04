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
        return (
            <div className='content-box'>
                    <div className='top-panel'>
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

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Results);