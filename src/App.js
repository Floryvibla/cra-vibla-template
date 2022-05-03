import React from 'react';
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='/logo.png' className="App-logo" alt="logo" />
        <div class="mockup-code">
          <pre data-prefix="V"><code>Bem-vindo(a)!</code></pre> 
          <pre data-prefix=">" class="text-warning"><code>installing...</code></pre> 
          {/* <pre data-prefix=">" class="text-success"><code>Done!</code></pre> */}
        </div>
      </header>
    </div>
  );
}

export default App;
