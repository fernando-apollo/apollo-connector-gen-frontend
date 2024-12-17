import * as monacoEditor from 'monaco-editor';
import React from 'react';

/**
 * Subscribes to changes of the editors model
 */
export function useEditorModel(
  editor: monacoEditor.editor.IStandaloneCodeEditor,
) {
  const [model, setModel] = React.useState(editor.getModel());

  // Set up a listener for model updates
  React.useEffect(() => {
    const disposable = editor.onDidChangeModel(() => {
      setModel(editor.getModel());
    });
    return () => disposable.dispose();
  }, [editor]);

  return model;
}
