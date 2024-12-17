import { colors } from '@apollo/brand';
import * as monacoEditor from 'monaco-editor';

const { bg, code, text, border } = colors.tokens;

export const MONACO_THEME_DARK = 'monaco-editable-dark';
export const monacoThemeDark: monacoEditor.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    // full index available at https://code.visualstudio.com/api/references/theme-color
    'editor.background': bg.primary.dark,
    'editorLineNumber.foreground': text.secondary.dark,
    'editorLineNumber.activeForeground': text.primary.dark,
    'editorIndentGuide.background': border.primary.dark,
    'editorIndentGuide.activeBackground': border.hover.dark,
    // suggestion popover
    'editorWidget.background': bg.primary.dark,
    'editorWidget.foreground': text.primary.dark,
    'editorWidget.border': border.primary.dark,
    'editorWidget.resizeBorder': border.primary.dark,
    'editorSuggestWidget.selectedBackground': bg.info.dark,
    'editorSuggestWidget.selectedForeground': text.info.dark,
    'editorSuggestWidget.border': border.primary.dark,
    'editorSuggestWidget.highlightForeground': code.b.dark,
    'editorSuggestWidget.focusHighlightForeground': code.b.dark,
    // context menu
    'menu.background': bg.primary.dark,
    'menu.foreground': text.primary.dark,
    'menu.selectionBackground': bg.secondary.dark,
    'menu.selectionForeground': text.primary.dark,
    'menu.separatorBackground': border.primary.dark,

    // sticky scroll bar
    'editorStickyScroll.shadow': '#00000030',
  },
  // rules have specificity that's kind of similar to css
  // more matching segments results in higher specificity
  rules: [
    // JSON colors
    {
      token: 'string.key.json',
      foreground: code.d.dark.replace(/^#/, ''),
    },
    {
      token: 'string.value.json',
      foreground: code.g.dark.replace(/^#/, ''),
    },
    { token: 'keyword.json', foreground: code.g.dark.replace(/^#/, '') },
    { token: 'number.json', foreground: code.g.dark.replace(/^#/, '') },
    {
      token: 'delimiter.bracket.json',
      foreground: code.a.dark.replace(/^#/, ''),
    },
    {
      token: 'delimiter.colon.json',
      foreground: code.a.dark.replace(/^#/, ''),
    },
    {
      token: 'delimiter.comma.json',
      foreground: code.a.dark.replace(/^#/, ''),
    },
  ],
};
