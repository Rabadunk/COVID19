import React from 'react';
import AgeChart from './components/AgeChart';
import GenderChart from './components/GenderChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>COVID-19 Cases In New Zealand</h1>
      <h2>A better visualisation of the table provided by the government </h2>
      <a>https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases</a>
      <div className="graph">
        <AgeChart/>
        <GenderChart/>
      </div>
    </div>
  );
}

export default App;
