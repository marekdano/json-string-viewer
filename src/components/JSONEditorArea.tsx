import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';

interface JSON {
  [key: string]: any; 
}
interface JSONEditorAreaProps {
  data: JSON | string | null;
  type: 'input' | 'output';
  isValidJSON?: boolean;
  onChangeJson?: (value: string | null, error: string | null) => void;
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
          this.props.onChangeJson && this.props.onChangeJson(editor.get(), null);
        } catch (err) {
          this.props.onChangeJson && this.props.onChangeJson(null, err.toString());
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

  componentWillUpdate(nextProps: JSONEditorAreaProps) {
    if (nextProps.data && nextProps.isValidJSON) { 
      (this.jsoneditor as JSONEditor).update(nextProps.data);
    }    
  }

  render() {
    return (
      <div className="jsoneditor-container" ref={elem => {this.container = elem as HTMLDivElement}} id={this.props.type}/>
    );
  }
}

export default JSONEditorArea;
