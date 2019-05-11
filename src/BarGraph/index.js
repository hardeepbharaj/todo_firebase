import React, { Component } from 'react';
import {
  BarChart, Bar, LabelList
} from 'recharts';

const renderCustomizedLabel = (props) => {
  const {
    x, y, width, value,
  } = props;
  const radius = 10;

  return (
    <g>
      <text x={x + width / 2} y={y - radius} fill="#007bff" textAnchor="middle" dominantBaseline="middle">
        {value}
      </text>
    </g>
  );
};

export default class Example extends Component {

  render() {
    const totalTasks = this.props.data.length;
    const doneTasks = this.props.data.reduce((acc, data) => {
      if(data.done) {
        acc += 1;
      }
      return acc;
    },0);

    const barData = [
      {name: `Total Tasks (${totalTasks})`, total: totalTasks },
      {name: `Done Tasks (${doneTasks})`, total: doneTasks },
    ]
    
    return (
      <BarChart width={250} height={200} data={barData} margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}>
        <Bar dataKey="total" fill="#007bff" >
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    );
  }
}
