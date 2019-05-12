import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';

interface JSON {
  [key: string]: any; 
}
interface JSONEditorAreaProps {
  json: JSON | string;
  type: 'input' | 'output';
  onChangeJson: (value: string) => void;
}

class JSONEditorArea extends React.Component<JSONEditorAreaProps> {
  private jsoneditor: any;
  private container: any;

  componentDidMount () {
    const options: JSONEditorOptions = {
      "mode": "code",
      "indentation": 2,
      "mainMenuBar": true,
      onChange: () => {
        // get() can throw an exception in mode "code", when the editor contains invalid JSON
        try {
          this.props.onChangeJson(this.jsoneditor.get());
        } 
        finally {}
      }
    };

    this.jsoneditor = new JSONEditor(this.container, options) as JSONEditor;
    if (this.props.json) {
      this.jsoneditor.set(this.props.json);
    }
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentWillUpdate(nextProps: JSONEditorAreaProps) {
    this.jsoneditor.update(nextProps.json);
  }

  render() {
    return (
      <div className="jsoneditor-container" ref={elem => {this.container = elem}} id={this.props.type}/>
    );
  }
}

export default JSONEditorArea;
