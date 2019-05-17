import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';

interface JSON {
  [key: string]: any; 
}
interface JSONEditorAreaProps {
  json: JSON | string | null;
  type: 'input' | 'output';
  isValidJSON?: boolean;
  onChangeJson: (value: string | null, error: string | null) => void;
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
        const editor = this.jsoneditor as JSONEditor;
        try {
          this.props.onChangeJson(editor.get(), null);
        } catch (err) {
          this.props.onChangeJson(null, err.toString())
          console.log(editor.getText())
          console.log(err.toString())
        }
      }
    };

    this.jsoneditor = new JSONEditor(this.container as HTMLDivElement, options) as JSONEditor;
    const emptyString = !this.props.json ? '' : this.props.json;
    this.jsoneditor.setText(emptyString as string);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentWillUpdate(nextProps: JSONEditorAreaProps) {
    if (nextProps.json && nextProps.isValidJSON) { 
      (this.jsoneditor as JSONEditor).update(nextProps.json);
    }    
  }

  render() {
    return (
      <div className="jsoneditor-container" ref={elem => {this.container = elem as HTMLDivElement}} id={this.props.type}/>
    );
  }
}

export default JSONEditorArea;
