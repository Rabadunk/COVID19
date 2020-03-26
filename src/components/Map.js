import React, {useState} from "react";
import ReactMapGL, { Marker } from "react-map-gl"
import data from '../data/data.json'
import locations from '../data/locations.json'
import { Button } from "react-bootstrap";


export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: -41.51128245580759,
        longitude: 172.72407079826075,
        width: '100%',
        height: '100vh',
        zoom: 4.418
    });

    let mapJuice = {
    }



    data.forEach(async (element) => {
    
        if(element['Location'] in mapJuice) {
            mapJuice[element['Location']].count += 1;
        } else {
            mapJuice[element['Location']] = {count: 1, location: locations[element['Location']]};
        }
    
    });

    let mapData = []

    for(let place in mapJuice) {
        mapData.push({
            data: [place, mapJuice[place]]
        })
    }

    return (
    // Set a height on the map so it will display
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        onViewportChange={ viewport => { setViewport(viewport)}}>

            {
                mapData.map(place => (
                    <Marker key={place.data[0]} latitude={place.data[1].location.lat} longitude={place.data[1].location.lng}>

                        <Button variant="warning" className="Case-Marker">{place.data[1].count}</Button>
                    </Marker>
                ))
            }

            {
                console.log(viewport.zoom, viewport.latitude, viewport.longitude)
            }

        </ReactMapGL>
    );
}
