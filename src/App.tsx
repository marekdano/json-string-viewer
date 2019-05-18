import React, { useState } from 'react';
import './App.css';
import JSONEditorArea from './components/JSONEditorArea';
import parseJsonString from './utils/parseJsonString';

const App: React.FC = () => {
  const [jsonValidString, setJsonValidString] = useState();
  const [output, setOutput] = useState();
  const [error, setError] = useState();

  const onChangeJsonString = (value: string | null, error: string | null) => {
    if (value && !error) {
      setJsonValidString(value);
    }
    setError(error);
  }

  const onJsonValidation = () => {
    const result = parseJsonString(jsonValidString);
    if ('error' in result && result.error) {
      setOutput(result.errorMessage);
    } else if (error) { 
      setOutput(error);
    } else {
      setOutput(result);
    }
  }

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <JSONEditorArea json={jsonValidString} isValidJSON={!error} type='input' onChangeJson={onChangeJsonString} />
        <section className="action-buttons">
          <button id="generalJSON" onClick={onJsonValidation}>Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea json={output} isValidJSON={true} type='output' onChangeJson={() => {}} />
      </section>
    </main>
  );
}

export default App;
