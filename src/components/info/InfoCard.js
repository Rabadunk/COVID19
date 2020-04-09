import React, {useState} from 'react';
import { Card, Collapse, Button } from "react-bootstrap";
import { FaUserInjured } from "react-icons/fa";
import './InfoCard.css';

let InfoCard = ({cases, location, total}) => {
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

                <Button variant="warning" className="Case-Button">
                    <FaUserInjured/> {total}
                </Button>

            </Card>
            <Collapse in={open}>
                <div id="example-collapse-text" className="Location-Info">
                {
                    cases.map(info => {

                        if(info.DHB === location) {

                            return (
                                <div className="Piece-Of-Info">
                                    <p>{info.Sex} {info.Sex === "Unavailable" ? "" : "Aged " + info.Age } <Button variant="warning" className="Button-Wrappers"># {info.Case}</Button></p>
                                    <p className="Details">{info.Details}</p>
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