import { colors } from '@apollo/brand';
import mapValues from 'lodash/mapValues';
import type { PluginAPI } from 'tailwindcss/types/config';

import { customColorsRaw } from '../src/theme/customColors';

export function toRGB(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

type GetValues<Obj extends object> = Obj[keyof Obj];
type ThemeVariables = Record<
  | GetValues<{
      [Key1 in keyof typeof customColorsRaw]: GetValues<{
        [Key2 in keyof (typeof customColorsRaw)[Key1]]: (typeof customColorsRaw)[Key1][Key2] extends `var(${infer Variable})`
          ? Variable
          : never;
      }>;
    }>
  | '--font-heading'
  | '--font-body'
  | '--font-code',
  string
>;

const lightTheme: ThemeVariables = {
  // BORDER
  '--color-border-primary': colors.tokens.border.primary.base,
  '--color-border-hover': colors.tokens.border.hover.base,
  '--color-border-success': colors.tokens.border.success.base,
  '--color-border-error': colors.tokens.border.error.base,
  '--color-border-warning': colors.tokens.border.warning.base,
  '--color-border-neutral': colors.tokens.border.neutral.base,
  '--color-border-info': colors.tokens.border.info.base,
  '--color-border-beta': colors.tokens.border.beta.base,
  '--color-border-highlight': colors.tokens.border.highlight.base,
  '--color-border-focused': colors.tokens.border.focused.base,
  '--color-border-disabled': colors.tokens.border.disabled.base,
  '--color-border-selected': colors.tokens.border.selected.base,
  '--color-border-splitbutton': colors.tokens.border.splitbutton.base,
  '--color-border-deselected': colors.tokens.border.deselected.base,
  '--color-border-white': colors.tokens.border.black.dark,
  '--color-border-black': colors.tokens.border.black.base,
  '--color-border-tab': colors.tokens.border.tab.base,
  // TEXT
  '--color-text-primary': colors.tokens.text.primary.base,
  '--color-text-secondary': colors.tokens.text.secondary.base,
  '--color-text-placeholder': colors.tokens.text.placeholder.base,
  '--color-text-heading': colors.tokens.text.heading.base,
  '--color-text-link': colors.tokens.text.link.base,
  '--color-text-success': colors.tokens.text.success.base,
  '--color-text-error': colors.tokens.text.error.base,
  '--color-text-warning': colors.tokens.text.warning.base,
  '--color-text-neutral': colors.tokens.text.neutral.base,
  '--color-text-info': colors.tokens.text.info.base,
  '--color-text-beta': colors.tokens.text.beta.base,
  '--color-text-disabled': colors.tokens.text.disabled.base,
  '--color-text-inverted': colors.tokens.text.inverted.base,
  '--color-text-white': colors.tokens.text.white.base,
  '--color-text-black': colors.tokens.text.black.base,
  // BACKGROUND
  '--color-bg-primary': colors.tokens.bg.primary.base,
  '--color-bg-secondary': colors.tokens.bg.secondary.base,
  '--color-bg-success': colors.tokens.bg.success.base,
  '--color-bg-success-selected': colors.tokens.bg.successSelected.base,
  '--color-bg-error': colors.tokens.bg.error.base,
  '--color-bg-error-selected': colors.tokens.bg.errorSelected.base,
  '--color-bg-error-hover': colors.tokens.bg.errorHover.base,
  '--color-bg-warning': colors.tokens.bg.warning.base,
  '--color-bg-warning-selected': colors.tokens.bg.warningSelected.base,
  '--color-bg-warning-hover': colors.tokens.bg.warningHover.base,
  '--color-bg-neutral': colors.tokens.bg.neutral.base,
  '--color-bg-info': colors.tokens.bg.info.base,
  '--color-bg-info-hover': colors.tokens.bg.infoHover.base,
  '--color-bg-beta': colors.tokens.bg.beta.base,
  '--color-bg-beta-hover': colors.tokens.bg.betaHover.base,
  '--color-bg-highlight': colors.tokens.bg.highlight.base,
  '--color-bg-searchhighlight': colors.tokens.bg.searchHighlight.base,
  '--color-bg-tableheader': colors.tokens.bg.tableHeader.base,
  '--color-bg-table-hover': colors.tokens.bg.tableHover.base,
  '--color-bg-input': colors.tokens.bg.input.base,
  '--color-bg-white': colors.tokens.bg.white.base,
  '--color-bg-selected': colors.tokens.bg.selected.base,
  '--color-bg-deselected': colors.tokens.bg.deselected.base,
  '--color-bg-disabled': colors.tokens.bg.disabled.base,
  '--color-bg-black': colors.tokens.bg.black.base,
  '--color-bg-overlay': colors.tokens.bg.overlay.base,
  '--color-bg-notice': colors.tokens.bg.notice.base,
  '--color-bg-blue-tag-hover': colors.tokens.bg.blueTagHover.base,
  '--color-bg-gray-tag-hover': colors.tokens.bg.grayTagHover.base,
  // BUTTON
  '--color-btn-primary': colors.tokens.button.primary.base,
  '--color-btn-primary-hover': colors.tokens.button.primaryHover.base,
  '--color-btn-primary-selected': colors.tokens.button.primarySelected.base,
  '--color-btn-destructive': colors.tokens.button.destructive.base,
  '--color-btn-destructive-hover': colors.tokens.button.destructiveHover.base,
  '--color-btn-secondary': colors.tokens.button.secondary.base,
  '--color-btn-secondary-hover': colors.tokens.button.secondaryHover.base,
  '--color-btn-secondary-selected': colors.tokens.button.secondarySelected.base,
  // ICON
  '--color-icon-primary': colors.tokens.icon.primary.base,
  '--color-icon-secondary': colors.tokens.icon.secondary.base,
  '--color-icon-success': colors.tokens.icon.success.base,
  '--color-icon-error': colors.tokens.icon.error.base,
  '--color-icon-warning': colors.tokens.icon.warning.base,
  '--color-icon-change': colors.tokens.icon.change.base,
  '--color-icon-info': colors.tokens.icon.info.base,
  '--color-icon-beta': colors.tokens.icon.beta.base,
  '--color-icon-disabled': colors.tokens.icon.disabled.base,
  '--color-icon-inverted': colors.tokens.icon.inverted.base,
  '--color-icon-white': colors.tokens.icon.white.base,
  // BRAND
  '--color-brand-primary': colors.tokens.brand.primary.base,
  '--color-brand-secondary': colors.tokens.brand.secondary.base,
  '--color-brand-tertiary': colors.tokens.brand.tertiary.base,
  '--color-brand-accent': colors.tokens.brand.accent.base,
  // CODE
  '--color-code-a': colors.tokens.code.a.base,
  '--color-code-b': colors.tokens.code.b.base,
  '--color-code-c': colors.tokens.code.c.base,
  '--color-code-d': colors.tokens.code.d.base,
  '--color-code-e': colors.tokens.code.e.base,
  '--color-code-f': colors.tokens.code.f.base,
  '--color-code-g': colors.tokens.code.g.base,
  // FLOWCHART
  '--color-flowchart-text': colors.tokens.flowchart.text.base,
  '--color-flowchart-a': colors.tokens.flowchart.a.base,
  '--color-flowchart-b': colors.tokens.flowchart.b.base,
  '--color-flowchart-c': colors.tokens.flowchart.c.base,
  '--color-flowchart-d': colors.tokens.flowchart.e.base,
  // FONT
  '--font-heading': 'Aeonik, sans-serif',
  '--font-body': 'Inter, sans-serif',
  '--font-code': 'Fira Code, monospace',
};
const darkTheme: ThemeVariables = {
  // BORDER
  '--color-border-primary': colors.tokens.border.primary.dark,
  '--color-border-hover': colors.tokens.border.hover.dark,
  '--color-border-success': colors.tokens.border.success.dark,
  '--color-border-error': colors.tokens.border.error.dark,
  '--color-border-warning': colors.tokens.border.warning.dark,
  '--color-border-neutral': colors.tokens.border.neutral.dark,
  '--color-border-info': colors.tokens.border.info.dark,
  '--color-border-beta': colors.tokens.border.beta.dark,
  '--color-border-highlight': colors.tokens.border.highlight.dark,
  '--color-border-focused': colors.tokens.border.focused.dark,
  '--color-border-disabled': colors.tokens.border.disabled.dark,
  '--color-border-selected': colors.tokens.border.selected.dark,
  '--color-border-splitbutton': colors.tokens.border.splitbutton.dark,
  '--color-border-deselected': colors.tokens.border.deselected.dark,
  '--color-border-white': colors.tokens.border.black.dark,
  '--color-border-black': colors.tokens.border.black.dark,
  '--color-border-tab': colors.tokens.border.tab.dark,
  // TEXT
  '--color-text-primary': colors.tokens.text.primary.dark,
  '--color-text-secondary': colors.tokens.text.secondary.dark,
  '--color-text-placeholder': colors.tokens.text.placeholder.dark,
  '--color-text-heading': colors.tokens.text.heading.dark,
  '--color-text-link': colors.tokens.text.link.dark,
  '--color-text-success': colors.tokens.text.success.dark,
  '--color-text-error': colors.tokens.text.error.dark,
  '--color-text-warning': colors.tokens.text.warning.dark,
  '--color-text-neutral': colors.tokens.text.neutral.dark,
  '--color-text-info': colors.tokens.text.info.dark,
  '--color-text-beta': colors.tokens.text.beta.dark,
  '--color-text-disabled': colors.tokens.text.disabled.dark,
  '--color-text-inverted': colors.tokens.text.inverted.dark,
  '--color-text-white': colors.tokens.text.white.dark,
  '--color-text-black': colors.tokens.text.black.dark,
  // BACKGROUND
  '--color-bg-primary': colors.tokens.bg.primary.dark,
  '--color-bg-secondary': colors.tokens.bg.secondary.dark,
  '--color-bg-success': colors.tokens.bg.success.dark,
  '--color-bg-success-selected': colors.tokens.bg.successSelected.dark,
  '--color-bg-error': colors.tokens.bg.error.dark,
  '--color-bg-error-selected': colors.tokens.bg.errorSelected.dark,
  '--color-bg-error-hover': colors.tokens.bg.errorHover.dark,
  '--color-bg-warning': colors.tokens.bg.warning.dark,
  '--color-bg-warning-selected': colors.tokens.bg.warningSelected.dark,
  '--color-bg-warning-hover': colors.tokens.bg.warningHover.dark,
  '--color-bg-neutral': colors.tokens.bg.neutral.dark,
  '--color-bg-info': colors.tokens.bg.info.dark,
  '--color-bg-info-hover': colors.tokens.bg.infoHover.dark,
  '--color-bg-beta': colors.tokens.bg.beta.dark,
  '--color-bg-beta-hover': colors.tokens.bg.betaHover.dark,
  '--color-bg-highlight': colors.tokens.bg.highlight.dark,
  '--color-bg-searchhighlight': colors.tokens.bg.searchHighlight.dark,
  '--color-bg-tableheader': colors.tokens.bg.tableHeader.dark,
  '--color-bg-table-hover': colors.tokens.bg.tableHover.dark,
  '--color-bg-input': colors.tokens.bg.input.dark,
  '--color-bg-white': colors.tokens.bg.white.dark,
  '--color-bg-selected': colors.tokens.bg.selected.dark,
  '--color-bg-deselected': colors.tokens.bg.deselected.dark,
  '--color-bg-disabled': colors.tokens.bg.disabled.dark,
  '--color-bg-black': colors.tokens.bg.black.dark,
  '--color-bg-overlay': colors.tokens.bg.overlay.dark,
  '--color-bg-notice': colors.tokens.bg.notice.dark,
  '--color-bg-blue-tag-hover': colors.tokens.bg.blueTagHover.dark,
  '--color-bg-gray-tag-hover': colors.tokens.bg.grayTagHover.dark,
  // BUTTON
  '--color-btn-primary': colors.tokens.button.primary.dark,
  '--color-btn-primary-hover': colors.tokens.button.primaryHover.dark,
  '--color-btn-primary-selected': colors.tokens.button.primarySelected.dark,
  '--color-btn-destructive': colors.tokens.button.destructive.dark,
  '--color-btn-destructive-hover': colors.tokens.button.destructiveHover.dark,
  '--color-btn-secondary': colors.tokens.button.secondary.dark,
  '--color-btn-secondary-hover': colors.tokens.button.secondaryHover.dark,
  '--color-btn-secondary-selected': colors.tokens.button.secondarySelected.dark,
  // ICON
  '--color-icon-primary': colors.tokens.icon.primary.dark,
  '--color-icon-secondary': colors.tokens.icon.secondary.dark,
  '--color-icon-success': colors.tokens.icon.success.dark,
  '--color-icon-error': colors.tokens.icon.error.dark,
  '--color-icon-warning': colors.tokens.icon.warning.dark,
  '--color-icon-change': colors.tokens.icon.change.dark,
  '--color-icon-info': colors.tokens.icon.info.dark,
  '--color-icon-beta': colors.tokens.icon.beta.dark,
  '--color-icon-disabled': colors.tokens.icon.disabled.dark,
  '--color-icon-inverted': colors.tokens.icon.inverted.dark,
  '--color-icon-white': colors.tokens.icon.white.dark,
  // BRAND
  '--color-brand-primary': colors.tokens.brand.primary.dark,
  '--color-brand-secondary': colors.tokens.brand.secondary.dark,
  '--color-brand-tertiary': colors.tokens.brand.tertiary.dark,
  '--color-brand-accent': colors.tokens.brand.accent.dark,
  // CODE
  '--color-code-a': colors.tokens.code.a.dark,
  '--color-code-b': colors.tokens.code.b.dark,
  '--color-code-c': colors.tokens.code.c.dark,
  '--color-code-d': colors.tokens.code.d.dark,
  '--color-code-e': colors.tokens.code.e.dark,
  '--color-code-f': colors.tokens.code.f.dark,
  '--color-code-g': colors.tokens.code.g.dark,
  // FLOWCHART
  '--color-flowchart-text': colors.tokens.flowchart.text.dark,
  '--color-flowchart-a': colors.tokens.flowchart.a.dark,
  '--color-flowchart-b': colors.tokens.flowchart.b.dark,
  '--color-flowchart-c': colors.tokens.flowchart.c.dark,
  '--color-flowchart-d': colors.tokens.flowchart.e.dark,
  // FONTS
  '--font-heading': 'Aeonik, sans-serif',
  '--font-body': 'Inter, sans-serif',
  '--font-code': 'Fira Code, monospace',
};

function convertToRgb(variables: ThemeVariables) {
  return mapValues(variables, (value, key) =>
    key.startsWith('--font') ? value : toRGB(value),
  );
}

export function themeDefinitionsPlugin({ addUtilities, e }: PluginAPI) {
  addUtilities([
    {
      [`.${e('theme-container-light')}`]: convertToRgb(lightTheme),
      [`.${e('theme-container-dark')}`]: convertToRgb(darkTheme),
    },
  ]);
}
