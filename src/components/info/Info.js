import React from 'react';
import InfoCard from './InfoCard'

function Info({cases, locations}) {

    return (
      <div className="Info-Cards">
          {
            locations.map(location => (
                <InfoCard cases={cases} location={location.DHB}/>
            ))
          }
      </div>
    );
  }
  
  export default Info;