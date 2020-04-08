import React from 'react';
import { Button, Tabs, Tab} from "react-bootstrap";
import CanvasJSReact from '../../canvasjs.react';

function Graph() {
  let CanvasJS = CanvasJSReact.CanvasJS;
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    title: {
      text: "Basic Column Chart in React"
    },
    data: [{				
              type: "column",
              dataPoints: [
                  { label: "Apple",  y: 10  },
                  { label: "Orange", y: 15  },
                  { label: "Banana", y: 25  },
                  { label: "Mango",  y: 30  },
                  { label: "Grape",  y: 28  }
              ]
     }]
 }

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