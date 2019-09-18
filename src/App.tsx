import React, { useState, ChangeEvent } from 'react';
import './App.css';
import JSONEditorArea, { ParseError } from './components/JSONEditorArea';
import { validateJSON, isObject, isObjectEmpty, getJSONStringThroughPath } from './utils/json-utils';
import { downloadFile } from './utils/core-utils';

export interface JSONObject {
  [key: string]: any;
}

const getJsonString = (
  {validJSONString, validJSON, pathToJsonString}: {validJSONString: string, validJSON: JSONObject, pathToJsonString: string}
): string | undefined => {
  let jsonString: string | undefined = validJSONString;
  if (!isObjectEmpty(validJSON)) {
    const path = pathToJsonString.split('.');
    jsonString = getJSONStringThroughPath(validJSON, path);
  }
  return jsonString;
}

const handleDownloadJSONFile = (
  {originalString, originalJSON, modifiedJSON, path}: 
  {originalString: string; originalJSON: JSONObject; modifiedJSON: JSONObject | string | undefined; path: string}
): void => {
  if (originalString) {
    downloadFile(JSON.stringify(modifiedJSON), 'json_string.txt');
  } else {
    const arrOfPath = path.split('.');
    arrOfPath.reduce((obj, pathName, index, originalArray) => {
      if (index === originalArray.length-1) {
        obj[pathName] = JSON.stringify(modifiedJSON);
        return obj[pathName];
      }
      return obj[pathName]
    }, originalJSON);
    downloadFile(originalJSON);
  }
}

const App: React.FC = () => {
  const [pathToJsonString, setPathToJsonString] = useState<string>('');
  const [validJSONString, setValidJSONString] = useState<string>('');
  const [validJSON, setValidJSON] = useState<JSONObject>({});
  const [output, setOutput] = useState<JSONObject | string>();
  const [error, setError] = useState<ParseError | null | string>();
  const [input, setInput] = useState<JSONObject | string>();

  const handleJSONChange = (value: string | JSONObject | null, error: string | ParseError | null, type: 'input' | 'output') => {
    if (type === 'input') {
      setError(error);
      const jsonValue = isObject(value as JSONObject) ? value : {};
      setValidJSON(jsonValue as JSONObject);

      if ((value || value === '') && typeof value === 'string' && !error ) {
        setValidJSONString(value as string);
      } else {
        setValidJSONString('');
      }

      if (!value) setInput('')
    }

    if (!error && type === 'output') {
      setOutput(value as JSONObject);
    }
  }

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e && ((e.target as HTMLInputElement).files as FileList)[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        const content = fileReader.result as string;

        setInput(JSON.parse(content));
        handleJSONChange(JSON.parse(content), null, 'input');
      }
      fileReader.readAsText(file);
    }
  }

  const onJsonValidation = () => {
    const jsonString = getJsonString({validJSONString, validJSON, pathToJsonString});
    setOutput(error ? (error as ParseError).message : validateJSON(jsonString as string));
  }

  return (
    <main>
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see and modify it in the right panel</span></h2>
      <button>
      <input type="file" name="file" accept=".json" onChange={handleUploadFile}/>
      </button>
      <button id="btn__download"
        onClick={() => !error 
          ? handleDownloadJSONFile({originalString: validJSONString, originalJSON: validJSON, modifiedJSON: output, path: pathToJsonString})
          : alert('The input JSON is invalid and cannot be downloaded.')
        }
      >
        Download
      </button>
      <section>
        <JSONEditorArea data={input} isValidJSON={!error} type='input' onChangeTextArea={handleJSONChange} />
        <section className="action-buttons">
          <input id="pathToJsonString" type="text" placeholder="Path to JSON string (Report.Configuration)" onChange={(e) => setPathToJsonString(e.target.value)}/>
          <button id="generalJSON" onClick={onJsonValidation}>Validate & Prettify JSON string</button>
        </section>
        <JSONEditorArea data={output} isValidJSON={true} type='output' onChangeTextArea={handleJSONChange} />
      </section>
    </main>
  );
}

export default App;
