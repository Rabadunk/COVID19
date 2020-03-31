import React from 'react';
import { Button } from "react-bootstrap";

function Graph() {
  return (
    <div className="Graphs">
      <Button variant="warning" onClick ={() => console.log("sup")}>graphs</Button>
    </div>
  )
}

export default Graph