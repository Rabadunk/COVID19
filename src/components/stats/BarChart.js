import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Form} from 'react-bootstrap';

class BarChart extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            chartData: null,

        }

        this.labels = this.props.dates.map(date => {return date.Date})
        this.data = this.props.dates.map(date => {return date.Sum})
      
        this.chartData = {
          labels: this.labels,
          datasets: [
            {
              label: "Cases",
              data: this.data,
              backgroundColor: "rgba(253, 219, 83, 0.8)"
            }
          ]
        }
      
        this.options = {
          responsive: true,
          maintainAspectRatio: true,
        }
    }


  render() {
    return (
        <div>
            <div className="Chart">
                <Bar data={this.chartData} options={this.options}/>
                <Form>

                    <div key='default-checkbox' className="mb-3">
                        <Form.Check 
                            type='checkbox'
                            id='default-checkbox'
                            label='dates'
                        />

                        <Form.Check
                            type='checkbox' 
                            label='default-checkbox' 
                            id='default-checkbox' 
                        />
                    </div>

                </Form>
            </div>
        </div>
    )
  }
}

export default BarChart