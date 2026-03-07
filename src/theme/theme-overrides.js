'use client';

import { createPaletteChannel } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export const themeOverrides = {
  colorSchemes: {
    light: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#E3F2FD',
          light: '#90CAF9',
          main: '#2196F3',
          dark: '#1565C0',
          darker: '#0D47A1',
          contrastText: '#FFFFFF',
        }),
      },
    },
    dark: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#1565C0',
          light: '#2196F3',
          main: '#90CAF9',
          dark: '#E3F2FD',
          darker: '#E3F2FD',
          contrastText: '#FFFFFF',
        }),
      },
    },
  },
};
