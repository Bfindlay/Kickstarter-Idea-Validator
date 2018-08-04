import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend , BarChart, Bar, ResponsiveContainer} from 'recharts';

const ResultsBarChart = props => {

    const invert = (props.invert) ? true : false;
    const costColour = (invert) ? '#E7E247' : '#2A2D34';
    const valueColour = (invert) ? '#FE5D26' : '#13b1cd';
    const axisColour = (invert) ? '#fff' : '#222324';

    return(
        <div className='chart-container'>
            <ResponsiveContainer width="100%">
                <BarChart data={[{ SimilarAverage: props.similarAvg, CategoryAverage: props.categoryAvg}]} >
                    <XAxis  stroke={axisColour}/>
                    <YAxis  stroke={axisColour}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="SimilarAverage" fill={`${costColour}`} />
                    <Bar dataKey="CategoryAverage" fill={`${valueColour}`} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


export default ResultsBarChart;