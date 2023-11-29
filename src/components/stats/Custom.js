import React from 'react';
import './Graphs.css';
import { Row, Col, Nav, Tab, Card} from "react-bootstrap";
import BarChart from "./BarChart";

let Custom = ({locations, totals, dates}) => {

  return (
    <div className="Custom">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>

            <Col className="CustomColumn" sm={3}>
              <Card className="CardNav">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Bar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Line</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Pie</Nav.Link>
                </Nav.Item>
              </Nav>
              </Card>
            </Col>

            <Col className="CustomColumn" sm={9}>
            <Card className="Card">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <BarChart dates={dates}/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  hello
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  hello
                </Tab.Pane>
              </Tab.Content>
              </Card>
            </Col>

          </Row>
        </Tab.Container>
    </div>
  )
}

export default Custom