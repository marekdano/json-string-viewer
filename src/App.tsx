import React, { useState } from 'react';
import './App.css';
import JSONEditorArea from './components/JSONEditorArea';
import parseJsonString from './utils/parseJsonString';

const defaultJSON = '';

const App: React.FC = () => {
  const [jsonString, setJsonString] = useState(defaultJSON);
  const [jsonOutput, setJsonOutput] = useState();

  const onChangeJsonString = (value: string) => {
    setJsonString(value);
  }

  const onJsonValidation = () => {
    const result = parseJsonString(jsonString);
    if ('error' in result && result.error) {
      setJsonOutput(result.errorMessage);
    } else {
      setJsonOutput(result);
    }
  }

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <JSONEditorArea json={jsonString} type='input' onChangeJson={onChangeJsonString} />
        <section className="action-buttons">
          <button id="generalJSON" onClick={onJsonValidation}>Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea json={!jsonOutput ? '' : jsonOutput} type='output' onChangeJson={() => {}} />
      </section>
    </main>
  );
}

export default App;
