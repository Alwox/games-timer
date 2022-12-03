import React from 'react';
import {Timer} from "./Timer";

function App() {
  return (
    <div className="app">
      <Timer defaultSeconds={10} players={[
          {name: 'Janusz', color: 'red'},
          {name: 'Andżej', color: 'blue'},
          {name: 'Bożenka', color: 'green'},
          {name: 'Długie imi 1', color: 'yellow'},
          {name: 'Długie imi 2', color: 'pink'},
          {name: 'Długie imi 3', color: 'white'},
      ]}/>

    </div>
  );
}

export default App;
