import * as monacoEditor from 'monaco-editor';
import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import {
  createNewModel,
  defineMonacoThemes,
  MonacoLanguage,
  useRegisterMonacoLanguageContribution,
  useSetMonacoTheme,
} from '../lib/monacoHelpers';

import { useRemeasureFontsForMonaco } from './useRemeasureFontsForMonaco';

defineMonacoThemes();

export const MONACO_READONLY_OPTIONS: monacoEditor.editor.IEditorConstructionOptions & {
  lineNumbers: 'off';
} = {
  contextmenu: false,
  lineNumbers: 'off',
  readOnly: true,
  glyphMargin: false,
};

const DEFAULT_MONACO_OPTIONS: monacoEditor.editor.IStandaloneEditorConstructionOptions & {
  'bracketPairColorization.enabled': boolean;
} = {
  tabSize: 2,
  wordBasedSuggestions: 'off',
  selectOnLineNumbers: true,
  scrollBeyondLastLine: false,
  tabCompletion: 'on',
  minimap: { enabled: false },
  overviewRulerLanes: 0,
  fontFamily: 'Fira Code, monospace',
  fontSize: 14,
  renderLineHighlight: 'none',
  wordWrap: 'on',
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
  fixedOverflowWidgets: true,
  'bracketPairColorization.enabled': false,
};

export const useMonacoEditor = ({
  language,
  defaultValue,
  readOnly = false,
  lineNumbers = 'on',
  cursorBlinking,
  showFoldingControls,
}: Pick<
  monacoEditor.editor.IStandaloneEditorConstructionOptions,
  'readOnly' | 'cursorBlinking' | 'showFoldingControls'
> & {
  language: MonacoLanguage;
  lineNumbers?: 'on' | 'off';
  defaultValue?: string;
}): monacoEditor.editor.IStandaloneCodeEditor => {
  useRegisterMonacoLanguageContribution(language);
  useSetMonacoTheme();
  useRemeasureFontsForMonaco();

  const options = useMemo(
    () => ({
      readOnly,
      cursorBlinking,
      lineNumbers,
      showFoldingControls,
    }),
    [cursorBlinking, lineNumbers, readOnly, showFoldingControls]
  );
  const optionsRef = useRef(options);

  const editorId = useId();

  // These options should not cause the editor to remount, so we store them in a
  // ref to avoid needing them in the dependency array.
  const monacoInitOptions = {
    language,
    defaultValue,
    editorId,
  };
  const monacoInitOptionsRef = useRef(monacoInitOptions);
  monacoInitOptionsRef.current = monacoInitOptions;

  const editor = useMemo<monacoEditor.editor.IStandaloneCodeEditor>(() => {
    const node = document.createElement('div');
    node.className = 'w-full h-full';
    return monacoEditor.editor.create(node, {
      ...DEFAULT_MONACO_OPTIONS,
      ...optionsRef.current,
      language: monacoInitOptionsRef.current.language,
      value: monacoInitOptionsRef.current.defaultValue,
      model: createNewModel(
        {
          id: 'initial',
          text: monacoInitOptionsRef.current.defaultValue ?? '',
          language: monacoInitOptionsRef.current.language,
        },
        monacoInitOptionsRef.current.editorId
      ),
    });
  }, []);

  useEffect(() => {
    if (readOnly) {
      // When contents change in a read only editor, reset selection
      const disposable = editor.onDidChangeModelContent(() =>
        editor.setSelection(new monacoEditor.Range(1, 1, 1, 1))
      );
      return () => disposable.dispose();
    }
  }, [editor, readOnly]);

  return editor;
};

export const MonacoEditorContainer = ({
  editor,
  className,
}: {
  editor: monacoEditor.editor.IStandaloneCodeEditor;
  className?: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editorContainer = targetRef.current;
    const domNode = editor.getContainerDomNode();
    if (domNode) {
      editorContainer?.appendChild(domNode);
      editor.layout();
      return () => {
        editorContainer?.removeChild(domNode);
      };
    }
  }, [editor]);

  const onResize = useCallback(() => {
    editor.layout();
  }, [editor]);

  useResizeDetector({
    onResize,
    targetRef,
  });

  return <div ref={targetRef} className={className} />;
};
