import React, {Component} from "react";
import axios from 'axios';
import data from '../data/data.json'
import locations from './locations.json'


export class Map extends React.Component {
    mapRef = React.createRef();
  
    state = {
      // The map instance to use during cleanup
      map: null,
      mapJuice: null,
      addBubble: null
    };
  
    componentDidMount() {

        let mapJuice = {
        }

        data.forEach(async (element) => {
        
            if(element['Location'] in mapJuice) {
                mapJuice[element['Location']].count += 1;
            } else {
                mapJuice[element['Location']] = {count: 1, location: locations[element['Location']]};
            }
        
        });
        
        console.log(JSON.stringify(mapJuice));

        this.setState({mapJuice});
  
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "SegffNRDuesYvP2HvoFgxQrMYojyXfMh9Y0EPaJmULQ"
        });
  
        const defaultLayers = platform.createDefaultLayers();
        

        // Create an instance of the map
        let map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                // This map is centered over NZ
                center: { lat: -41, lng: 535 },
                zoom: 6,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        const ui = H.ui.UI.createDefault(map, defaultLayers);

        function addMarkerToGroup(group, coordinate, html) {
            var marker = new H.map.Marker(coordinate);
            // add custom data to the marker
            marker.setData(html);
            group.addObject(marker);
        }

        function addInfoBubble(map) {
            var group = new H.map.Group();
            
            map.addObject(group);
            
            // add 'tap' event listener, that opens info bubble, to the group
            group.addEventListener('tap', function (evt) {
                // event target is the marker itself, group is a parent event target
                // for all objects that it contains
                var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
                // read custom data
                content: evt.target.getData()
                });
                // show info bubble
                ui.addBubble(bubble);
            }, false);

            for(let place in mapJuice) {
                let message = "Location: " + place + "\nNumber of cases: " + mapJuice[place]['count'];
                addMarkerToGroup(group, {lat: mapJuice[place]['location']['lat'], lng: mapJuice[place]['location']['lng']},message)
            }
           
        }

        addInfoBubble(map);
  
        this.setState({ map });
    }
  
    componentWillUnmount() {
      // Cleanup after the map to avoid memory leaks when this component exits the page
      this.state.map.dispose();
    }
  
    render() {
      return (
        // Set a height on the map so it will display
        <div ref={this.mapRef} style={{ height: "400px"}} />
      );
    }
  }

export default Map;