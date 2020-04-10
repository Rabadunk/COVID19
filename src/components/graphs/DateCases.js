import React from 'react';
import {Line} from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

let DateCases = ({dates}) => {

  let labels = dates.map(date => {return date.Date})
  let data = dates.map(date => {return date.Sum})

  console.log(labels, data);

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cases",
        data: data,
        backgroundColor: "rgba(253, 219, 83, 0.8)"
      }
    ]
  }

  let options = {
    title: {
      display: true,
      text: 'Total cases when recorded'
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: true
  }


  return (
    <div className="Stats">
      <Card className="Card ChartCard">
          <div className="Chart">
            <Line data={chartData} options={options}/>
          </div>
      </Card>
    </div>
  )
}

export default DateCases