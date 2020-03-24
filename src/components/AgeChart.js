import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
import data from './data.json'

const labelsArray = ['Child', 'Teens', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s'];

let getData = () => {

    const newData = labelsArray.map( (label) => {

        let count = 0;

        data.forEach(element => {
            if(element['Age'] === label) {
                count += 1
            }
        });

        return count;

    })

    return newData;

}

class AgeChart extends Component {

    constructor(props) {
        super(props);

        this.state={
            chartData: {
                labels: labelsArray,
                datasets: [{
                    label: 'People',
                    data: getData(),
                      backgroundColor:[
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
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
                            text: 'No. Of infected by age group'
                        },
                        responsive:true, 
                        maintainAspectRatio:false
                    }
                }
                />
            </div>
        );
    }



}

export default AgeChart;