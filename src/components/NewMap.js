import React, {useState} from "react";
import ReactMapGL, { Marker } from "react-map-gl"
import data from '../data/data.json'
import locations from '../data/locations.json'


export default function NewMap() {
    const [viewport, setViewport] = useState({
        latitude: -41,
        longitude: 535,
        width: '100vw',
        height: '50vh',
        zoom: 5
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
        <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoiaGFsZmFkb3plbiIsImEiOiJjazg3NmxtNGkwbGJvM2drbHdibWdxazR3In0.itqz3lOGA231pJO1bRs0kQ"
        onViewportChange={ viewport => { setViewport(viewport)}}
        mapStyle="mapbox://styles/halfadozen/ck877xyb50tnk1imuwurua0ax">

            {
                mapData.map(place => (
                    <Marker key={place.data[0]} latitude={place.data[1].location.lat} longitude={place.data[1].location.lng}>
                        <button style={{backgroundColor:'white'}}>
                            {place.data[1].count}
                        </button>
                    </Marker>
                ))
            }

        </ReactMapGL>
    );
}
