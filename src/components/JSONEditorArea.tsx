import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';
import { JSONObject } from '../App';

export type ParseError = {message: string};

interface JSONEditorAreaProps {
  type: 'input' | 'output';
  isValidJSON?: boolean;
  data?: string | JSONObject | null;
  onChangeTextArea?: (value: string | null, error: string | ParseError | null, type: 'input' | 'output') => void;
}

class JSONEditorArea extends React.Component<JSONEditorAreaProps> {
  private jsoneditor: JSONEditor | undefined;
  private container: HTMLDivElement | undefined;

  componentDidMount () {
    const options: JSONEditorOptions = {
      "mode": "code",
      "indentation": 2,
      "mainMenuBar": true,
      onChange: () => {
        // get() can throw an exception in mode "code", when the editor contains invalid JSON
        let editorData = null;
        let errorFromEditor: ParseError | null = null;
        try {
          editorData = (this.jsoneditor as JSONEditor).get();
        } catch (err) {
          errorFromEditor = err;
        } finally {
          this.props.onChangeTextArea && this.props.onChangeTextArea(editorData, errorFromEditor, this.props.type);
        }
      }
    };

    this.jsoneditor = new JSONEditor(this.container as HTMLDivElement, options) as JSONEditor;
    const jsonString = !this.props.data ? '' : this.props.data;
    this.jsoneditor.setText(jsonString as string);
  }

  componentWillUnmount () {
    this.jsoneditor && this.jsoneditor.destroy();
  }

  componentDidUpdate() {
    if (this.props.data && this.props.isValidJSON) { 
      (this.jsoneditor as JSONEditor).update(this.props.data);
    }    
  }

  render() {
    return (
      <div className="jsoneditor-container" ref={elem => {this.container = elem as HTMLDivElement}} id={this.props.type}/>
    );
  }
}

export default JSONEditorArea;
