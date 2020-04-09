import React from 'react';
import './Graphs.css';
import { Tabs, Tab} from "react-bootstrap";
import LocationCases from './LocationCases';
import StatsSummary from './StatsSummary';

let Stats = ({locations, totals, dates}) => {

  return (
    <div className="Graphs">
      <Tabs defaultActiveKey="stats" id="uncontrolled-tab-example">
        <Tab eventKey="stats" title="Stats" className="Tab">
          <StatsSummary totals={totals} />
          <LocationCases locations={locations}/>
        </Tab>
        <Tab eventKey="custom" title="Custom" disabled>
          <h1>Currently in the works</h1>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Stats