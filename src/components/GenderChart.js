import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
import data from './data.json'

const labelsArray = ['F', 'M', 'Male', 'Female'];

let getData = () => {

    const tempData = labelsArray.map( (label) => {

        let count = 0;

        data.forEach(element => {
            console.log(element['Gender'])
            if(element['Gender'] === label) {
                count += 1
            }
        });

        return count;

    })

    let newData = [tempData[0] + tempData[3], tempData[1] + tempData[2]]

    return newData;

}

class GenderChart extends Component {

    constructor(props) {
        super(props);

        this.state={
            chartData: {
                labels: ['Female', 'Male'],
                datasets: [{
                    label: 'People',
                    data: getData(),
                      backgroundColor:[
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                      ] 
                }]
            }
        }
    }

    render() {
        return(
            <div>
                <Bar
                data={this.state.chartData}
                width={100}
                height={400}
                options={
                    {
                        title: {
                            display: true,
                            text: 'No. Of infected by gender'
                        },
                        responsive:true, 
                        maintainAspectRatio:false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                }
                />
            </div>
        );
    }



}

export default GenderChart;