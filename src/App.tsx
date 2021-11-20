import React from 'react';
import './App.css';
import {Card} from '@mui/material';
import Background from './components/backgrounds/background';


function App() {
  return (
    <div id="out" className="App red background">
      <Background className='out'/>
      <div className="card Signup">
        <Card
          style={{
            width: "270px",
            height: "160px",
          }}
        >
          <h2>
            Invalid invite
          </h2>
          <p>
            This invite may be expired, or you might not have permission to join.
          </p>
        </Card>
      </div>
    </div>
  );
}
export default App;
