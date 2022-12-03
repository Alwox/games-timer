import React from 'react';
import {Timer} from "./Timer";

function App() {
  return (
    <div className="App">
      <Timer defaultSeconds={10} players={[
          {name: 'Player 1', color: 'red'},
          {name: 'Player 2', color: 'blue'},
      ]}/>

    </div>
  );
}

export default App;
