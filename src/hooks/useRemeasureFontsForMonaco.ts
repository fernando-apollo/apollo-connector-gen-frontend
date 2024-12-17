import EventEmitter from 'eventemitter3';
import * as monacoEditor from 'monaco-editor';
import React from 'react';

const emitter = new EventEmitter<'webfontsLoaded'>();

/**
 * Due to our use of custom fonts and font sizes in the monaco editor, Windows
 * users on Chrome may experience a race condition where the editor's cached font
 * info doesn't match the loaded custom fonts. This hook attempts to remeasure
 * the fonts in the editor to fix this issue.
 *
 * https://github.com/microsoft/monaco-editor/issues/1626
 */
export const useRemeasureFontsForMonaco = () => {
  // Remeasure the fonts on mount
  React.useEffect(() => {
    monacoEditor.editor.remeasureFonts();
  }, []);

  // In case the webfonts are load after the editor mounts, we should listen
  // for the event and remeasure when it is triggered
  React.useEffect(() => {
    const remeasureFonts = () => {
      monacoEditor.editor.remeasureFonts();
    };
    emitter.on('webfontsLoaded', remeasureFonts);

    return () => {
      emitter.off('webfontsLoaded', remeasureFonts);
    };
  }, []);
};
