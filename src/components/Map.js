import React, {useState, useRef} from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import userSupercluster from "use-supercluster";


import data from '../data/data.json'
import locations from '../data/locations.json'

import { MdZoomOutMap } from "react-icons/md";
import { Button } from "react-bootstrap";
import useSupercluster from "use-supercluster";


export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: -41.51128245580759,
        longitude: 172.72407079826075,
        width: '100%',
        height: '100%',
        zoom: 4.418
    });

    const mapRef = useRef()

    // Extracting local data for map
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

    // Clustering
    // Format for clusters
    const points = mapData.map( place => ({
        type: "Feater",
        properties: {
            cluser: false,
            placeId: place.data[0],
            count: place.data[1].count
        },
        geometry: {
            type: "Point",
            coordinates: [place.data[1].location.lng, place.data[1].location.lat]
        }
    }));

    // Get map bounds
    const bounds= mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    // Get clusters
    const {clusters, supercluster} = useSupercluster({
        points,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 40 , maxZoom: 12}
    })

    console.log(clusters);

    return (
    // Set a height on the map so it will display
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        onViewportChange={ viewport => { setViewport(viewport)}}
        maxZoom={10}
        ref={mapRef}>

            <Button className="Zoom-Out" onClick={ () => {
                setViewport({
                    latitude: -41.51128245580759,
                    longitude: 172.72407079826075,
                    width: '100%',
                    height: '100vh',
                    zoom: 4.418,
                    transitionInterpolator: new FlyToInterpolator({
                        speed: 1
                    }),
                    transitionDuration: "auto"     
                })}
            }>
                <MdZoomOutMap/>
            
            </Button>

            {
                clusters.map(cluster => {

                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {cluster: isCluster, point_count: pointCount} = cluster.properties;

                    if(isCluster) {

                        return(
                            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                                <Button variant="warning" className="Case-Marker" 
                                style={{width: `${50 + 20*(pointCount / points.length)}px`, height: `${50 + 20*(pointCount / points.length)}px`}}
                                onClick={ () => {
                                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 12);
                                    setViewport({
                                        ...viewport,
                                        latitude,
                                        longitude,
                                        zoom: expansionZoom,
                                        transitionInterpolator: new FlyToInterpolator({
                                            speed: 1
                                        }),
                                        transitionDuration: "auto"
                                    })
                                }}>{pointCount}</Button>
                            </Marker>
                        );
                    }

                    return(
                        <Marker key={cluster.properties.placeId} latitude={latitude} longitude={longitude}>
                            <Button variant="warning" className="Case-Marker"
                                    style={{width: `${50 + 20  * (cluster.properties.count / points.length)}px`, height: `${50 + 20* (cluster.properties.count / points.length)}px`}}
                                    onClick={ () => {
                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: 12,
                                            transitionInterpolator: new FlyToInterpolator({
                                                speed: 1
                                            }),
                                            transitionDuration: "auto"
                                        })
                                    }}>{cluster.properties.count}</Button>
                        </Marker>
                    )
                })
            }

            {
                console.log(viewport.zoom, viewport.latitude, viewport.longitude)
            }

        </ReactMapGL>
    );
}
