import React from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditorArea.css';

interface JSON {
  [key: string]: any; 
}
interface JSONEditorAreaProps {
  json: JSON;
}

class JSONEditorArea extends React.Component<JSONEditorAreaProps> {
  private jsoneditor: any;
  private container: any;

  constructor(props: JSONEditorAreaProps) {
    super(props);
  }

  componentDidMount () {
    const options: JSONEditorOptions = {
      "mode": "code",
      "indentation": 2,
      "mainMenuBar": true,
    };

    this.jsoneditor = new JSONEditor(this.container, options) as JSONEditor;
    this.jsoneditor.set(this.props.json);
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
      <div className="jsoneditor-container" ref={elem => this.container = elem as HTMLDivElement} />
    );
  }
}

export default JSONEditorArea;
