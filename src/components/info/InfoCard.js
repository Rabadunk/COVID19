import React, {useState} from 'react';
import { Card, Collapse, Button } from "react-bootstrap";
import { FaTransgender } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import './InfoCard.css';

let InfoCard = ({cases, location}) => {
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
                    cases.map(info => {

                        if(info.DHB === location) {

                            return (
                                <div className="Piece-Of-Info">
                                    <p className="Details">{info.Details}</p>
                                    <div>
                                        <Button variant="warning" className="Button-Wrappers"># {info.Case}</Button>
                                        <Button variant="warning" className="Button-Wrappers"><FaTransgender/> {info.Gender}</Button>
                                        <Button variant="warning" className="Button-Wrappers"><GiAges /> {info.Age}</Button>
                                    </div>

                                </div>

                            )

                        }
                    })
                }
                </div>
            </Collapse>
      </div>
    );
  }
  
  export default InfoCard;