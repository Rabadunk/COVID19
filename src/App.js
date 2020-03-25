import React from 'react';
import Title from './components/Title'
import AgeChart from './components/AgeChart';
import GenderChart from './components/GenderChart';
import Map from './components/Map'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Map">
        <Map />
      </div>
      <div className="Info">
        <Title />
      </div>
    </div>
  );
}

export default App;
