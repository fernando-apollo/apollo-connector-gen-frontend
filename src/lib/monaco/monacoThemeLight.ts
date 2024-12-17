import { colors } from '@apollo/brand';
import * as monacoEditor from 'monaco-editor';

const { bg, code, text, border } = colors.tokens;

export const MONACO_THEME_LIGHT = 'monaco-light';
export const monacoThemeLight: monacoEditor.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.background': bg.primary.base,
    // full index available at https://code.visualstudio.com/api/references/theme-color
    'editorLineNumber.foreground': text.secondary.base,
    'editorLineNumber.activeForeground': text.primary.base,
    'editorIndentGuide.background': border.primary.base,
    'editorIndentGuide.activeBackground': border.hover.base,
    // suggestion popover
    'editorWidget.background': bg.primary.base,
    'editorWidget.foreground': text.primary.base,
    'editorWidget.border': border.primary.base,
    'editorWidget.resizeBorder': border.primary.base,
    'editorSuggestWidget.selectedBackground': bg.info.base,
    'editorSuggestWidget.selectedForeground': text.info.base,
    'editorSuggestWidget.border': border.primary.base,
    'editorSuggestWidget.highlightForeground': code.b.base,
    'editorSuggestWidget.focusHighlightForeground': code.b.base,
    // context menu
    'menu.background': bg.primary.base,
    'menu.foreground': text.primary.base,
    'menu.selectionBackground': bg.secondary.base,
    'menu.selectionForeground': text.primary.base,
    'menu.separatorBackground': border.primary.base,
  },
  // rules have specificity that's kind of similar to css
  // more matching segments results in higher specificity
  rules: [
    // JSON colors
    {
      token: 'string.key.json',
      foreground: code.d.base.replace(/^#/, ''),
    },
    {
      token: 'string.value.json',
      foreground: code.g.base.replace(/^#/, ''),
    },
    { token: 'keyword.json', foreground: code.g.base.replace(/^#/, '') },
    { token: 'number.json', foreground: code.g.base.replace(/^#/, '') },
    {
      token: 'delimiter.bracket.json',
      foreground: code.a.base.replace(/^#/, ''),
    },
    {
      token: 'delimiter.colon.json',
      foreground: code.a.base.replace(/^#/, ''),
    },
    {
      token: 'delimiter.comma.json',
      foreground: code.a.base.replace(/^#/, ''),
    },
  ],
};
