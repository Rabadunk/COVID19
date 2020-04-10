import React from 'react';
import './Graphs.css';
import { Tabs, Tab} from "react-bootstrap";
import LocationCases from './LocationCases';
import DateCases from './DateCases';
import StatsSummary from './StatsSummary';
import Custom from './Custom';

let Stats = ({locations, totals, dates}) => {

  return (
    <div className="Stats">
      <Tabs defaultActiveKey="stats" id="uncontrolled-tab-example">
        <Tab eventKey="stats" title="Stats" className="Tab">
          <StatsSummary totals={totals} />
          <DateCases dates={dates} />
          <LocationCases locations={locations}/>
        </Tab>
        <Tab eventKey="custom" title="Custom" disabled>
          <Custom locations={locations} totals={totals} dates={dates}/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Stats