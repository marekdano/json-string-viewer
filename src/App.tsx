import React from 'react';
import './App.css';
import JSONEditorArea from './components/JSONEditorArea';

const App: React.FC = () => {
  const defaultJSON = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 'four',
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  };

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <JSONEditorArea json={defaultJSON} />
        <section className="action-buttons">
          <button id="generalJSON">Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea json={defaultJSON} />
      </section>
    </main>
  );
}

export default App;
