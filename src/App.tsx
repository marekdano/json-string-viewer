import React, { useState, ChangeEvent } from 'react';
import JSONEditorArea, { ParseError } from './components/JSONEditorArea';
import { validateJSON, isObject, isObjectEmpty, getJSONStringThroughPath } from './utils/json-utils';
import { downloadFile } from './utils/core-utils';
import './App.css';

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
  {originalString, originalJSON, modifiedJSON, path, filename}: 
  {originalString: string; originalJSON: JSONObject; modifiedJSON: JSONObject | string | undefined; path: string, filename: string}
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
    downloadFile(originalJSON, filename ? filename : undefined);
  }
}

const App: React.FC = () => {
  const [pathToJsonString, setPathToJsonString] = useState<string>('');
  const [validJSONString, setValidJSONString] = useState<string>('');
  const [validJSON, setValidJSON] = useState<JSONObject>({});
  const [output, setOutput] = useState<JSONObject | string>();
  const [error, setError] = useState<ParseError | null | string>();
  const [input, setInput] = useState<JSONObject | string>();
  const [fileName, setFileName] = useState<string>('');

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
      fileReader.onloadend = () => {
        const content = fileReader.result as string;

        try {
          const jsonContent = JSON.parse(content);
          setInput(jsonContent);
          handleJSONChange(jsonContent, null, 'input');
        } catch (err) {
          alert('The uploaded JSON file is invalid.')
        }
      }

      setFileName(file.name);
      fileReader.readAsText(file);
    }
  }

  const onJsonValidation = () => {
    const jsonString = getJsonString({validJSONString, validJSON, pathToJsonString});
    setOutput(error ? (error as ParseError).message : validateJSON(jsonString as string));
  }

  return (
    <main>
      <a href="https://github.com/marekdano/json-string-viewer" className="github-corner" aria-label="View source on GitHub">
        <svg width="80" height="80" viewBox="0 0 250 250" className="svg-container" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
        </svg>
      </a>
     
      <h2>JSON string Viewer<span className="subtitle"> - paste JSON string to the left panel to see and modify it in the right panel</span></h2>
      
      <section  className="menu-btns">
        <input type="file" id="file_upload" name="file_upload" accept=".json" onChange={handleUploadFile} />
        <label htmlFor="file_upload" className="btn-action" data-test-id="btn-upload">Upload</label>
        <label className="btn-action" data-test-id="btn-download"
          onClick={() => !error 
            ? handleDownloadJSONFile({originalString: validJSONString, originalJSON: validJSON, modifiedJSON: output, path: pathToJsonString, filename: fileName})
            : alert('The input JSON is invalid and cannot be downloaded.')
          }
        >
          Download
        </label>
      </section>
      
      <section className="editor">
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
