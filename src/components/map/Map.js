import React, {useState, useRef} from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import './Map.css';


import { MdZoomOutMap } from "react-icons/md";
import { FaGithub, FaFileDownload} from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { Button } from "react-bootstrap";
import useSupercluster from "use-supercluster";


export default function Map({locations, show}) {
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
            count: place.Total
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
        options: { radius: 30, maxZoom: 12}
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


            <div className="Actions">

                <a href="https://github.com/Rabadunk/COVID19"><Button variant="warning" ><FaGithub/> github</Button></a>
                <a href="./data/cases.json" download><Button variant="warning"><FaFileDownload /> json</Button></a>
                <Button variant="warning" onClick ={() => show()}><GoGraph /> graphs</Button>
                <Button variant="warning" onClick={ () => { setViewport(defaultView)} }> <MdZoomOutMap/> center</Button>

            </div>

            {
                clusters.map(cluster => {
                    
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {cluster: isCluster} = cluster.properties;

                    if(isCluster) {

                        let sum = getClusterSum(cluster);
                        let dimension = 30 + (sum / points.length)

                        return(
                            <Marker key={cluster.id} latitude={latitude} longitude={longitude} offsetLeft={-1*dimension/2} offsetTop={-1*dimension/2}>
                                <Button variant="warning" className="Case-Marker" 
                                style={{width: `${dimension}px`, height: `${dimension}px`}}
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
                                }}>{sum}</Button>
                            </Marker>
                        );
                    }

                    let dimension = 30 + 2 *  (cluster.properties.count / points.length)

                    return(
                        <Marker key={cluster.properties.placeId} latitude={latitude} longitude={longitude} offsetLeft={-1*dimension/2} offsetTop={-1*dimension/2}>
                            <Button variant="warning" className="Case-Marker"
                                    style={{width: `${dimension}px`, height: `${dimension}px`}}
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

        </ReactMapGL>
    );
}
