import clsx from 'clsx';
import React from 'react';
import useLocalStorage from 'use-local-storage';

export enum ThemeName {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeState = ReturnType<typeof useThemeState> & {
  containerRef: React.RefObject<HTMLDivElement>;
};

const ThemeContext = React.createContext<ThemeState | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const themeState = useThemeState();

  return (
    <ThemeContext.Provider value={{ ...themeState, containerRef }}>
      <div
        ref={containerRef}
        className={clsx(
          'size-full bg-primary',
          themeState.themeName === ThemeName.LIGHT
            ? 'theme-container-light'
            : 'theme-container-dark',
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

const useThemeState = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeName.DARK
    : ThemeName.LIGHT;
  const [persistedThemeName] = useLocalStorage<ThemeName>(
    'persistedThemeName',
    systemTheme,
  );

  const themedValue = React.useCallback(
    // eslint will format this without the generic value so we need to disable the rule

    function fn<T>(dict: Record<ThemeName, T>) {
      return dict[persistedThemeName];
    },
    [persistedThemeName],
  );

  return React.useMemo(
    () => ({
      themeName: persistedThemeName,
      themedValue,
    }),
    [persistedThemeName, themedValue],
  );
};
