import React from 'react';
import Title from './components/Title'
import Map from './components/Map'
import Info from './components/info/Info'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Map">
        <Map />
      </div>
      <div className="Info">
        <Title />
        <Info />
      </div>
    </div>
  );
}

export default App;
