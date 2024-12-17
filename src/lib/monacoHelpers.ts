import { useThemeContext } from '@components/themeProvider/ThemeProvider';
import * as monacoEditor from 'monaco-editor';
import { useEffect } from 'react';
import type vscodeProtocol from 'vscode-languageserver-protocol/browser';
// import { Diagnostic } from 'wasm-bridge';

import { assertUnreachable } from './assertUnreachable';
import { MONACO_THEME_DARK, monacoThemeDark } from './monaco/monacoThemeDark';
import {
  MONACO_THEME_LIGHT,
  monacoThemeLight,
} from './monaco/monacoThemeLight';

// TODO: We should add the custom jsonselection language here
export type MonacoLanguage = 'text' | 'json';

export const useRegisterMonacoLanguageContribution = (
  language: MonacoLanguage
) => {
  useEffect(() => {
    switch (language) {
      case 'json':
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('monaco-editor/esm/vs/language/json/monaco.contribution');
        break;
      case 'text':
        // nothing to register for text
        break;
      default:
        assertUnreachable(language);
    }
  }, [language]);
};

export const defineMonacoThemes = () => {
  monacoEditor.editor.defineTheme(MONACO_THEME_DARK, monacoThemeDark);
  monacoEditor.editor.defineTheme(MONACO_THEME_LIGHT, monacoThemeLight);
};
export const useSetMonacoTheme = () => {
  // TODO: When we add theme selection we should use the state here to set monaco themes
  const theme = useThemeContext().themedValue({
    dark: MONACO_THEME_DARK,
    light: MONACO_THEME_LIGHT,
  });

  useEffect(() => {
    monacoEditor.editor.setTheme(theme);
  }, [theme]);
};

export interface MonacoFile {
  id: string;
  text: string;
  language: MonacoLanguage;
}
export function fileToUri(file: MonacoFile, editorId: string) {
  return monacoEditor.Uri.file(`${editorId}/${file.id}`);
}
export function createNewModel(file: MonacoFile, editorId: string) {
  const newModelUri = fileToUri(file, editorId);

  const oldModel = monacoEditor.editor
    .getModels()
    .find(
      (model) =>
        model.uri.toString(true) === newModelUri.toString(true) &&
        !model.isDisposed()
    );
  if (oldModel) {
    oldModel.setValue(file.text);
    return oldModel;
  }

  return monacoEditor.editor.createModel(file.text, file.language, newModelUri);
}

export interface Mapper<
  VscodeType,
  MonacoType,
  ReturnVscodeValue = VscodeType
> {
  vscodeToMonaco: (value: VscodeType) => MonacoType;
  monacoToVscode: (value: MonacoType) => ReturnVscodeValue;
}

export const positionMapping: Mapper<
  vscodeProtocol.Position,
  monacoEditor.IPosition
> = {
  vscodeToMonaco(position) {
    return { lineNumber: position.line + 1, column: position.character + 1 };
  },
  monacoToVscode(position) {
    return { line: position.lineNumber - 1, character: position.column - 1 };
  },
};

export const rangeMapping: Mapper<vscodeProtocol.Range, monacoEditor.IRange> = {
  vscodeToMonaco(range) {
    const start = positionMapping.vscodeToMonaco(range.start);
    const end = positionMapping.vscodeToMonaco(range.end);
    return {
      startColumn: start.column,
      startLineNumber: start.lineNumber,
      endColumn: end.column,
      endLineNumber: end.lineNumber,
    };
  },
  monacoToVscode(range) {
    return {
      start: positionMapping.monacoToVscode({
        lineNumber: range.startLineNumber,
        column: range.startColumn,
      }),
      end: positionMapping.monacoToVscode({
        lineNumber: range.endLineNumber,
        column: range.endColumn,
      }),
    };
  },
};

// const diagnosticSeverityToMonacoSeverity = (
//   severity: Diagnostic['severity']
// ): monacoEditor.MarkerSeverity => {
//   switch (severity) {
//     case 1:
//       return monacoEditor.MarkerSeverity.Error;
//     case 2:
//       return monacoEditor.MarkerSeverity.Warning;
//     case 3:
//       return monacoEditor.MarkerSeverity.Info;
//     case 4:
//       return monacoEditor.MarkerSeverity.Hint;
//     default:
//       assertUnreachable(severity as never);
//   }
// };

// export const diagnosticsToMonacoMarkersByEditor = (
//   diagnostics: Diagnostic[] | undefined
// ): Record<string, monacoEditor.editor.IMarkerData[]> => {
//   return (
//     diagnostics?.reduce(
//       (acc, diagnostic) => {
//         diagnostic.locations.forEach((location) => {
//           const range = location.range;
//           if (!range) {
//             return;
//           }

//           const marker = {
//             startLineNumber: range.start.line,
//             startColumn: range.start.column,
//             endLineNumber: range.end.line,
//             endColumn: range.end.column,
//             message: diagnostic.message,
//             severity: diagnosticSeverityToMonacoSeverity(diagnostic.severity),
//           } satisfies monacoEditor.editor.IMarkerData;

//           const editorId = location.document;

//           if (acc[editorId]) {
//             acc[editorId].push(marker);
//           } else {
//             acc[editorId] = [marker];
//           }
//         });
//         return acc;
//       },
//       {
//         Input: [],
//         Mapping: [],
//         Variables: [],
//         'desired result': [],
//       } as Record<string, monacoEditor.editor.IMarkerData[]>
//     ) ?? { Input: [], Mapping: [], Variables: [], 'desired result': [] }
//   );
// };
