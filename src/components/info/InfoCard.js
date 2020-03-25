import React, {useState} from 'react';
import { Card, Collapse, Button } from "react-bootstrap";
import { TiChartBarOutline } from "react-icons/ti";
import { FaTransgender } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import './InfoCard.css';

let InfoCard = ({location, data}) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
            <Card
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}

                className="Location-Card"
            >
                {location}
                
            </Card>
            <Collapse in={open}>
                <div id="example-collapse-text" className="Location-Info">
                {
                    data.map(info => (
                        <div className="Piece-Of-Info">
                            <p className="Details">{info.details}</p>
                            <div>
                                <Button variant="warning" className="Button-Wrappers"><TiChartBarOutline /> {info.case}</Button>
                                <Button variant="warning" className="Button-Wrappers"><FaTransgender/> {info.gender}</Button>
                                <Button variant="warning" className="Button-Wrappers"><GiAges /> {info.age}</Button>
                            </div>

                        </div>
                    ))
                }
                </div>
            </Collapse>
      </div>
    );
  }
  
  export default InfoCard;