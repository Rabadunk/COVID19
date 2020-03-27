import React, {useState, useRef} from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";


import { MdZoomOutMap } from "react-icons/md";
import { Button } from "react-bootstrap";
import useSupercluster from "use-supercluster";


export default function Map({locations}) {
    const defaultView = {
        latitude: -41.51128245580759,
        longitude: 172.72407079826075,
        width: '100%',
        height: '100%',
        zoom: 4.418,
        transitionInterpolator: new FlyToInterpolator({
            speed: 1
        }),
        transitionDuration: "auto"     
    }

    const [viewport, setViewport] = useState(defaultView);

    const mapRef = useRef()


    // Clustering
    // Format for clusters
    const points = locations.map( place => ({
        type: "Feature",
        properties: {
            cluser: false,
            placeId: place.DHB,
            count: place['Total cases']
        },
        geometry: {
            type: "Point",
            coordinates: [place.Longitude, place.Latitude]
        }
    }));

    // Get map bounds
    const bounds= mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    // Get clusters
    const {clusters, supercluster} = useSupercluster({
        points,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 50, maxZoom: 12}
    })

    // Method to get sum of clusters
    const getClusterSum = (cluster) => {

        let sum = 0;
        
        supercluster.getLeaves(cluster.id).forEach(point => {

            sum += point.properties.count;
        })

        return sum;

    }

    return (
    // Set a height on the map so it will display
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        onViewportChange={ viewport => { setViewport(viewport)}}
        maxZoom={12}
        minZoom={4}
        ref={mapRef}>

            <Button className="Zoom-Out" onClick={ () => {
                setViewport(defaultView)}
            }>
                <MdZoomOutMap/>
            
            </Button>

            {
                clusters.map(cluster => {
                    
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {cluster: isCluster, point_count: pointCount} = cluster.properties;

                    if(isCluster) {

                        let sum = getClusterSum(cluster);
                        let dimension = 50 + 5 * (sum / points.length)

                        return(
                            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                                <Button variant="warning" className="Case-Marker" 
                                style={{width: `${dimension}px`, height: `${dimension}px`}}
                                onClick={ () => {
                                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 9);
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
                                }}>{sum}</Button>
                            </Marker>
                        );
                    }

                    let dimension = 50 + 5 * (cluster.properties.count / points.length)

                    return(
                        <Marker key={cluster.properties.placeId} latitude={latitude} longitude={longitude}>
                            <Button variant="warning" className="Case-Marker"
                                    style={{width: `${dimension}px`, height: `${dimension}px`}}
                                    onClick={ () => {
                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: 9,
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

        </ReactMapGL>
    );
}
