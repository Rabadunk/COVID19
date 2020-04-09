import React from 'react';
import InfoCard from './InfoCard'

function Info({cases, locations}) {

    return (
      <div className="Info-Cards">
          {
            locations.map(location => (
                <InfoCard cases={cases} location={location.DHB} total={location.Total}/>
            ))
          }
      </div>
    );
  }
  
  export default Info;