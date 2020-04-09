import React from 'react';
import Rodal from 'rodal';
import Title from './components/title/Title'
import Map from './components/map/Map'
import Info from './components/info/Info'
import Summary from './components/summary/Summary'
import Stats from './components/graphs/Stats'
import Firebase from './Firebase'

import 'rodal/lib/rodal.css';
import './App.css';
import { Spinner } from 'react-bootstrap';
import FadeIn from 'react-fade-in';

class App extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      Locations: null,
      Cases: null,
      Totals: null,
      Dates: null,
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

    const datesRef = Firebase.database().ref("Dates");
    datesRef.once('value').then(value => {
      this.setState({Dates: value.val()})
    })

  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
      this.setState({ visible: false });
  }

  render(){
    let oath = this.state.Locations != null ? this.state.Cases != null ? this.state.Totals != null ? this.state.Dates != null ? true : false : false : false : false;
    let display = oath ?
    <FadeIn delay={300}>
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
        <Stats locations={this.state.Locations} totals={this.state.Totals} dates={this.state.Dates}/>
      </Rodal> 
    </FadeIn> : <Spinner animation="border" variant="warning" className="Loading" size="bg"/>

    return (
      <div className="App">
        {display}
      </div>
    );
  }

}

export default App;
