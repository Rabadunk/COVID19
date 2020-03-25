import React from 'react';
import InfoCard from './InfoCard'
import data from '../data/data.json'


let locations = []
let tempDict = {}

data.forEach(element => {

    if(element['Location'] in tempDict) {
        tempDict[element['Location']].push({
            case: element['Case'],
            age: element['Age'],
            gender: element['Gender'],
            details: element['Travel details']
        })
    } else {
        tempDict[element['Location']]=[{
            case: element['Case'],
            age: element['Age'],
            gender: element['Gender'],
            details: element['Travel details']
        }]
    }
});

for(let place in tempDict) {
    locations.push(
        {
           location: place,
           data: tempDict[place]
        }
    )
}

console.log(locations);

function Info() {

    return (
      <div className="Info-Cards">
          {
            locations.map(location => (
                <InfoCard {...location} />
            ))
          }
      </div>
    );
  }
  
  export default Info;