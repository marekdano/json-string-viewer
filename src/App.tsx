import React, { useState } from 'react';
import './App.css';
import JSONEditorArea, { ParseError } from './components/JSONEditorArea';
import { validateJSON, isObject, isObjectEmpty } from './utils/json-utils';

interface JSONObject {
  [key: string]: any;
}

const getJsonString = (
  {jsonValidString, validJSON, pathToJsonString}: {jsonValidString: string, validJSON: JSONObject, pathToJsonString: string}
) => {
  let jsonString = jsonValidString;
  if (!isObjectEmpty(validJSON)) {
    const path = pathToJsonString.split('.');
    let jsonStringThroughPath: string | JSONObject = validJSON;
    for (const item of path) { 
      jsonStringThroughPath =  (jsonStringThroughPath as JSONObject)[item];
    }
    jsonString = jsonStringThroughPath as string;
  }
  return jsonString;
}

const App: React.FC = () => {
  const [jsonValidString, setJsonValidString] = useState<string>('');
  const [pathToJsonString, setPathToJsonString] = useState<string>('');
  const [validJSON, setValidJSON] = useState<JSONObject>({});
  const [output, setOutput] = useState<string>();
  const [error, setError] = useState<ParseError | null | string>();

  const onChangeJsonString = (value: string | JSONObject | null, error: string | ParseError | null) => {
    setError(error);

    const jsonValue = isObject(value as JSONObject) ? value : {};
    setValidJSON(jsonValue as JSONObject);

    if ((value || value === '') && typeof value === 'string' && !error) {
      setJsonValidString(value as string);
    }
  }

  const onJsonValidation = () => {
    const jsonString = getJsonString({jsonValidString, validJSON, pathToJsonString});
    setOutput(error ? (error as ParseError).message : validateJSON(jsonString));
  }

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see the result in the right one</span></h2>
      <section>
        <JSONEditorArea isValidJSON={!error} type='input' onChangeJson={onChangeJsonString} />
        <section className="action-buttons">
          <input id="pathToJsonString" type="text" placeholder="Path to JSON string (Report.Configuration)" onChange={(e) => setPathToJsonString(e.target.value)}/>
          <button id="generalJSON" onClick={onJsonValidation}>Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea data={output} isValidJSON={true} type='output' />
      </section>
    </main>
  );
}

export default App;
