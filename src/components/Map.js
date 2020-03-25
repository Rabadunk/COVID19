import React, {useState} from "react";
import ReactMapGL, { Marker } from "react-map-gl"
import data from '../data/data.json'
import locations from '../data/locations.json'
import { Button } from "react-bootstrap";


export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: '100%',
        height: '100vh',
        zoom: 8
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

    console.log(mapData[0].data[1].location.lat);

    return (
    // Set a height on the map so it will display
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        onViewportChange={ viewport => { setViewport(viewport)}}
        mapStyle={process.env.REACT_APP_MAP_STYLE}>

            {
                mapData.map(place => (
                    <Marker key={place.data[0]} latitude={place.data[1].location.lat} longitude={place.data[1].location.lng}>

                        <Button variant="dark" className="Case-Marker">{place.data[1].count}</Button>
                    </Marker>
                ))
            }

        </ReactMapGL>
    );
}
