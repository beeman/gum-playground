import {
  ColorScheme,
  ColorSchemeProvider,
  DEFAULT_THEME,
  DefaultMantineColor,
  MantineProvider,
  Tuple,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React, { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            brand: DEFAULT_THEME.colors.blue,
          },
          loader: 'dots',
          primaryColor: 'brand',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

// Used to make the 'brand' color scheme available on the theme.colors object
// https://mantine.dev/theming/colors/#add-custom-colors-types
type ExtendedCustomColors = 'brand' | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}
