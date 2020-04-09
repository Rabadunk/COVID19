import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

let DateCases = ({locations}) => {

  let labels = locations.map(place => {return place.DHB})
  let data = locations.map(place => {return place.Total})

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
      text: 'Total cases per DHB'
    },
    legend: {
      display: false
    },
    responsive: true
  }


  return (
    <div className="Stats">
      <Card className="Card">
          <HorizontalBar data={chartData} options={options}/>
      </Card>
    </div>
  )
}

export default DateCases