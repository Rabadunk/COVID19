import React, {useState} from 'react';
import { Card, Collapse } from "react-bootstrap";

let InfoCard = ({location, data}) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
            <Card
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                {location}
            </Card>
            <Collapse in={open}>
                <div id="example-collapse-text">
                {
                    data.map(info => (
                        <div>

                            <p>case number: {info.case} gender: {info.gender} age: {info.age}</p>
                            <p>{info.details}</p>

                        </div>
                    ))
                }
                </div>
            </Collapse>
      </div>
    );
  }
  
  export default InfoCard;