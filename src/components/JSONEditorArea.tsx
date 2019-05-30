import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';

export type ParseError = {message: string};

interface JSON {
  [key: string]: any; 
}
interface JSONEditorAreaProps {
  type: 'input' | 'output';
  isValidJSON?: boolean;
  data?: string | null;
  onChangeJson?: (value: string | null, error: string | ParseError | null) => void;
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
          this.props.onChangeJson && this.props.onChangeJson(editorData, errorFromEditor);
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
