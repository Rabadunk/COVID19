import React from 'react'
import CountUp from 'react-countup';
import { FaGithub, FaFileDownload} from "react-icons/fa";
import { GoGraph } from "react-icons/go";


import './Summary.css'
import { Button } from 'react-bootstrap';

function Summary ({totals}) {
  return (
    <div className='Summary'>

        <div className="Totals">
            <h4>Confirmed: {totals.Confirmed}</h4>
            <h4>Recovered: {totals.Recovered}</h4>
            <h4>Total: <CountUp end={totals.Total} /></h4>
        </div>

        <div className="Profile">
            <p>This is not an official government website. Data for this website is sourced from <a href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases">here</a>. For more information view the official government website <a href="https://covid19.govt.nz/">here</a>.</p>
        </div>

        <div className="Actions">

          <Button variant="warning"><FaGithub/> github</Button>
          <Button variant="warning"><FaFileDownload /> json</Button>
          <Button variant="warning"><GoGraph /> graphs</Button>

        </div>

    </div>
  )
}

export default Summary
