import IconMoon from '@apollo/icons/default/IconMoon.svg?react';
import IconSun from '@apollo/icons/default/IconSun.svg?react';
import ApolloLogo from '@apollo/icons/logos/LogoSymbol.svg?react';
import { Button } from '@components/Button';
import {
  ThemeName,
  useThemeContext,
} from '@components/themeProvider/ThemeProvider';
import useLocalStorage from 'use-local-storage';

export const GlobalHeader = () => {
  const [theme, setTheme] = useLocalStorage<ThemeName>(
    'persistedThemeName',
    ThemeName.LIGHT
  );
  const { themeName } = useThemeContext();

  return (
    <header
      className='z-30 flex h-14 items-center border-b border-primary bg-primary px-4 py-3 text-secondary'
      aria-label='Global'
    >
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center'>
          <ApolloLogo className='size-8 text-heading mr-4' />
          <h1 className='text-xl truncate font-medium font-heading text-heading'>
            Apollo Connector Generator (05-Feb-2025)
          </h1>
        </div>
        <div className='flex items-center space-x-2'>
          {/* <Select
            value={selectedExample.id}
            items={EXAMPLES_AS_ITEMS}
            onValueChange={onExampleChange}
            container={containerRef.current ?? undefined}
          /> */}
          <Button
            size='sm'
            variant='secondary'
            aria-label='Toggle theme'
            onClick={() =>
              setTheme(theme === 'dark' ? ThemeName.LIGHT : ThemeName.DARK)
            }
            icon={
              themeName === 'dark' ? (
                <IconSun className='size-4' />
              ) : (
                <IconMoon className='size-4' />
              )
            }
          />
        </div>
      </div>
    </header>
  );
};
