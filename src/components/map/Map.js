import React, {useState, useRef} from "react";
import ReactMapGL, { Marker, FlyToInterpolator, NavigationControl } from "react-map-gl";
import './Map.css';

import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";


import { Button } from "react-bootstrap";
import useSupercluster from "use-supercluster";


export default function Map({locations, show}) {

    const reducers = combineReducers({
        keplerGl: keplerGlReducer
    });

    const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

    return (
        <Provider store={store}>
            <KeplerMap />
        </Provider>
    );
}

function KeplerMap() {
    const dispatch = useDispatch();
    const {data} = useSwr("cases", async () => {
        const response = await fetch(
            "https://gist.githubusercontent.com/Rabadunk/a9bb8282c50856d1168a41d82345d8c6/raw/cases.json"
        );

        const data = await response.json();
        return data
    });
  

    React.useEffect(() => {
        if(data) {
            dispatch(addDataToMap({
                datasets: {
                    info: {
                        label: "Cases By DHB",
                        id: "cases"
                    },
                    data
                },
            option: {
                centerMap: true,
                readOnly: false
            },
            config: {}
            }))
        }
    }, [dispatch, data])

    return (
        <KeplerGl 
        mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        width={window.innerWidth}
        height={window.innerHeight}
        >

        </KeplerGl>
    )
}
