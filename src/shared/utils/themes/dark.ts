export const dark = {
  title: 'dark',
  colors: {
    primary_100: '#141517',
    primary_90: '#14151790',
    primary_60: '#14151760',
    secondary_100: '#1B1B1D',
    secondary_90: '#1B1B1D90',
    secondary_60: '#1B1B1D60',
    gray: '#D2D7DF',
    orange: '#ff8100',
    blue: '#407BFF',
    green: '#63CCCA',
    red: '#FF595E',
    white: '#ffffff',
    black: '#0C0C0C',
    white_60: '#ffffff60',
    text_primary_100: '#E9EDEE',
    text_primary_90: '#E9EDEE90',
    text_primary_60: '#E9EDEE60',
    text_secondary_100: '#DEE4E7',
    text_secondary_90: '#DEE4E790',
    text_secondary_60: '#DEE4E760',
  },
} as const;

export type DarkThemeType = typeof dark;
