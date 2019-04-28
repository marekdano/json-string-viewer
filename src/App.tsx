import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <main>
      <h2>JSON string validator and viewer <span>- paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <textarea id="jsonInput" placeholder="Enter JSON string"></textarea>
        <section className="action-buttons">
          <button id="generalJSON">Validate & Prettify JSON string</button>
        </section>
        <textarea id="convertedJSON"></textarea>
      </section>
    </main>
  );
}

export default App;
