import React from 'react';
import { Button, Tabs, Tab} from "react-bootstrap";
import CanvasJSReact from '../../canvasjs.react';

let Graph = ({locations}) => {
  let CanvasJS = CanvasJSReact.CanvasJS;
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    title: {
      text: "Total cases by area",
      fontFamily: "arial",
      fontSize: "20"
    },
    axisX: {
      interval: 1,
      labelAngle: 0 
    },
    data: [{				
              type: "bar",
              dataPoints:  locations.map(place => {
                  return {
                    label: place.DHB,
                    y: place.Total
                  }
              }).sort((a, b) => 
                (a.y > b.y) ? 1 : (a.y === b.y) ? ((a.label > b.label) ? 1 : -1) : -1 ),
              dataPointWidth: 10
     }]
 }

 console.log(options.data);

  return (
    <div className="Graphs">
      <Tabs defaultActiveKey="stats" id="uncontrolled-tab-example">
        <Tab eventKey="stats" title="Stats" className="Tab">
          <h1>Currently in the works</h1>
        </Tab>
        <Tab eventKey="custom" title="Custom" >
          <h1>Currently in the works</h1>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Graph