import React from 'react';
import Title from './components/Title'
import AgeChart from './components/AgeChart';
import GenderChart from './components/GenderChart';
import NewMap from './components/NewMap'
import './App.css';

function App() {
  return (
    <div className="App">

      <Title />
      <NewMap />

      <div className="graph">
        <AgeChart/>
        <GenderChart/>
      </div>
    </div>
  );
}

export default App;
