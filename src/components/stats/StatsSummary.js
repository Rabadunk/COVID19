import React from 'react';
import { Card} from 'react-bootstrap';
import { IoIosNuclear } from "react-icons/io";
import { FaUserInjured, FaSearch, FaHeartbeat, FaHospital, FaSkullCrossbones, FaCalendarDay} from "react-icons/fa";


let StatsSummary = ({totals}) => {

  return (
    <div className="StatSummary">
        
        <h1>New Zealand is currently at <span>Alert Level 4</span></h1>
        <Card className="Card">
            <table>
                <tr>
                    <td><span><IoIosNuclear/>{totals.Confirmed}</span> confirmed cases</td>
                    <td><span><FaHeartbeat/>{totals.Recovered}</span> people have recovered</td>
                    <td><span><FaCalendarDay/>{totals.AlertDays}</span> days at alert level 4</td>
                </tr>
                <tr>
                    <td><span><FaSearch/>{totals.Probable}</span> probable cases</td>
                    <td><span><FaHospital/>{totals.Hospitalised}</span> people are hospitalised</td>
                    <td><span><FaCalendarDay/>{totals.FirstCase}</span> days since first NZ case</td>
                </tr>
                <tr>
                    <td><span><FaUserInjured/>{totals.Total}</span> cases in total</td>
                    <td><span><FaSkullCrossbones/>{totals.Dead}</span> person has passed away</td>
                    <td><span><FaCalendarDay/>{totals.FirstCaseChina}</span> days since first ever case</td>
                </tr>
            </table>
        </Card>
    </div>
  )
}

export default StatsSummary