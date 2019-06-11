import React, { useState } from 'react';
import './App.css';
import JSONEditorArea, { ParseError } from './components/JSONEditorArea';
import { validateJSON } from './utils/json-utils';

const App: React.FC = () => {
  const [jsonValidString, setJsonValidString] = useState<string>();
  const [output, setOutput] = useState<string>();
  const [error, setError] = useState<ParseError | null | string>();

  const onChangeJsonString = (value: string | null, error: string | ParseError | null) => {
    if ((value || value === '') && !error) {
      setJsonValidString(value as string);
    }
    setError(error);
  }

  const onJsonValidation = () => {
    setOutput(error ? (error as ParseError).message : validateJSON(jsonValidString as string));
  }

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <JSONEditorArea isValidJSON={!error} type='input' onChangeJson={onChangeJsonString} />
        <section className="action-buttons">
          <button id="generalJSON" onClick={onJsonValidation}>Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea data={output} isValidJSON={true} type='output' />
      </section>
    </main>
  );
}

export default App;
