import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GuageChart, ResultsBarChart } from './';


class Results extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='content-box'>
                <div className="top-panel">
                    <GuageChart value={100} />
                </div>
                <div className='bottom-panel'>
                    <ResultsBarChart similarAvg={100} categoryAvg={200} invert={false} />
                    <ResultsBarChart similarAvg={452} categoryAvg={208} invert={true} />
                </div>
            </div>
        )
    }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(mapStateToProp, {})(Results);