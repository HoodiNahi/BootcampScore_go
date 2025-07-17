import React, { useEffect, useRef, useState } from 'react';
//import Chart from 'chart.js/auto';
//import 'chartjs-chart-polar-scatter';
import './index.css';
import PilotSelector from './component/PliotSelector';
import MissionTypeSelector from './component/MissionTypeSelector';
import Bullseye from './component/chart'
import { fetchPasses, fetchWeaponsForPilot, fetchMissionTypeForPilot} from './api';
//import PassesTable from "./component/passesTable";

function App() {
  const [weapons, setWeapons] = useState([]);
  const [passes, setPasses] = useState([]);
  const [missionType, setMissionType] = useState([]);
  const [selectedMissionType, setSelectedMissionType] = useState(null);
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  //const chartRef = useRef(null);
  //const chartInstance = useRef(null);
  const [sortAsc, setSortAsc] = useState(true);


//Sort distance in Pass table
const handleSortByDistance = () => {
  const sorted = [...passes].sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return sortAsc ? distA - distB : distB - distA;
  });
  setPasses(sorted);
  setSortAsc(!sortAsc);
};

//Handle pilot click
  const handlePilotSelect = async (pilot) => {
    setSelectedPilot(pilot);
    setSelectedMissionType(''); //  Reset the selected mission type
    setWeapons([]);             //  Reset weapons
     setPasses([]);              //  Reset passes
    const res = await fetchMissionTypeForPilot(pilot,selectedMissionType);
    console.log('Fetched mission types:', res);
    setMissionType(res || []);
    setPasses([]);
  };

  useEffect(() => {
  console.log('missionType updated:', missionType);
}, [missionType]);

// This effect triggers whenever weapons changes
  useEffect(() => {
    if (weapons.length > 0 && selectedPilot && selectedMissionType) {
      // Automatically select the first weapon
      handleWeaponClick(selectedPilot, selectedMissionType, weapons[0]);
    }
  }, [weapons, selectedPilot, selectedMissionType]);

//Handle missionType click
  const handleMissionTypeSelect = async (missionType) => {
      setSelectedMissionType(missionType);
      if (selectedPilot && missionType) {
        const res = await fetchWeaponsForPilot(selectedPilot,missionType);
        console.log('Fetched weapons-App.js:', res);
        setWeapons(res || []);
        setPasses([]);//clear previous passes
      }
};

  //Handle weapon click
  const handleWeaponClick = async (pilot, missionType, weapon) => {
  setSelectedWeapon(weapon)
  try {
    const res = await fetchPasses(pilot,missionType, weapon);

    const passesArray = Array.isArray(res) ? res : res.data;
    setPasses(passesArray || []);
  } catch (err) {
    console.error('fetchPasses error', err);
    setPasses([]);
  }
};


  return (
      <div className="app-container">

                <header className="header">
                  <h1>Bootcamp Score Tracker</h1>
                </header>
            <main className="main-container">
                <section className="section">
                  <h2 className="section-title">Select Pilot & Mission</h2>
                  <div className="selector-row">
                    <PilotSelector onSelect={handlePilotSelect} />
                    <MissionTypeSelector
                      pilot={selectedPilot}
                      onSelect={handleMissionTypeSelect}
                    />
                  </div>
                </section>
                <section className="section">
                  <h2 className="section-title">Weapons Used</h2>
                  <ul className="button-list">
                    {weapons.map(d => (
                      <li key={d}>
                        <div
                          className={`btn ${selectedWeapon === d ? 'btn-selected' : ''}`}
                          onClick={() => handleWeaponClick(selectedPilot,selectedMissionType, d)}
                        >
                          {d}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                 <section className="section">
                  <h2 className="section-title">
                    <span title="Each ring is 25m in diameter">Bullseye Chart</span>
                  </h2>
                  <div
                    className="chart-container"
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      height: '400px',
                      margin: '0 auto'
                    }}
                  >
                    <Bullseye passes={passes} />
                  </div>
                </section>


                <section className="section">
                  <h2 className="section-title">Passes</h2>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Target</th>
                          <th>Weapon</th>
                          <th onClick={handleSortByDistance} style={{ cursor: 'pointer' }}>
                            Distance (m) {sortAsc ? '▲' : '▼'}
                          </th>
                          <th>Radial (°)</th>
                          <th>Quality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passes.map((p, idx) => (
                          <tr key={idx}>

                            <td>{p.pass_attempt}</td>
                            <td>{p.target_name}</td>
                            <td>{p.weapon}</td>
                            <td>{p.distance}</td>
                            <td>{p.radial}</td>
                            <td>{p.quality}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

             </main>
      </div>
);
}

export default App;
