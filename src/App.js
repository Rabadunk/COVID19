import React from 'react';
import Title from './components/Title'
import Map from './components/Map'
import Info from './components/info/Info'
import Firebase from './Firebase'

import StaticCases from './data/cases'
import StaticLocations from './data/dhb'
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      Locations: StaticLocations,
      Cases: StaticCases
    }

  }

  componentDidMount() {
    const locationsRef = Firebase.database().ref("Locations");
    locationsRef.once('value').then(value => {
      this.setState({Locations: value.val()})
    })

    const casesRef = Firebase.database().ref("Cases");
    casesRef.once('value').then(value => {
      this.setState({Cases: value.val()})
    })

  }

  render(){

    return (
      <div className="App">
        <div className="Map">
          <Map locations={this.state.Locations}/>
        </div>
        <div className="Info">
          <Title />
          <Info cases={this.state.Cases} locations={this.state.Locations}/>
        </div>
      </div>
    );
  }

}

export default App;
