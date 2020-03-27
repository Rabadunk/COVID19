import React from 'react';
import Title from './components/title/Title'
import Map from './components/map/Map'
import Info from './components/info/Info'
import Summary from './components/summary/Summary'
import Firebase from './Firebase'

import StaticCases from './data/cases'
import StaticLocations from './data/dhb'
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      Locations: StaticLocations,
      Cases: StaticCases,
      Totals: {Confirmed: 0, Recovered: 0, Total: 0}
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

    const totalsRef = Firebase.database().ref("Totals");
    totalsRef.once('value').then(value => {
      this.setState({Totals: value.val()[0]})
    })


  }

  render(){

    return (
      <div className="App">
        <div className="Map">
          <Map locations={this.state.Locations}/>
        </div>
        <div className="Info">
          <div className="Info-Profile">
            <Title />
            <Summary totals={this.state.Totals}/>
          </div>
          <Info cases={this.state.Cases} locations={this.state.Locations}/>
        </div>
      </div>
    );
  }

}

export default App;
