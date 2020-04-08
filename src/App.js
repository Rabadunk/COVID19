import React from 'react';
import Rodal from 'rodal';
import Title from './components/title/Title'
import Map from './components/map/Map'
import Info from './components/info/Info'
import Summary from './components/summary/Summary'
import Graphs from './components/graphs/Graphs'
import Firebase from './Firebase'

import StaticCases from './data/cases'
import StaticLocations from './data/dhb'
import 'rodal/lib/rodal.css';
import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      Locations: StaticLocations,
      Cases: StaticCases,
      Totals: {Confirmed: 0, Recovered: 0, Total: 0, Probable: 0},
      visible: false
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

  show() {
    this.setState({ visible: true });
  }

  hide() {
      this.setState({ visible: false });
  }

  render(){

    return (
      <div className="App">
        <div className="Map">
          <Map locations={this.state.Locations} show={this.show.bind(this)}/>
        </div>
        <div className="Info">
          <div className="Info-Profile">
            <Title />
            <Summary totals={this.state.Totals}/>
          </div>
          <Info cases={this.state.Cases} locations={this.state.Locations}/>
        </div>

        <Rodal visible={this.state.visible} 
        onClose={this.hide.bind(this)} 
        animation="slideDown" duration={1000}
        customMaskStyles={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}
        width={70}
        height={90}
        measure="%">
          <Graphs />
        </Rodal>
      </div>
    );
  }

}

export default App;
