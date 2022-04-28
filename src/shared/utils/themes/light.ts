export const light = {
  title: 'light',
  colors: {
    primary_100: '#E9EDEE',
    primary_90: '#E9EDEE90',
    primary_60: '#E9EDEE60',
    secondary_100: '#DEE4E7',
    secondary_90: '#DEE4E790',
    secondary_60: '#DEE4E760',
    gray: '#D2D7DF',
    orange: '#ff8100',
    blue: '#407BFF',
    green: '#63CCCA',
    red: '#FF595E',
    white: '#ffffff',
    black: '#0C0C0C',
    white_60: '#ffffff60',
    text_primary_100: '#151417',
    text_primary_90: '#15141790',
    text_primary_60: '#15141760',
    text_secondary_100: '#1B1B1D',
    text_secondary_90: '#1B1B1D90',
    text_secondary_60: '#1B1B1D60',
  },
} as const;

export type LightThemeType = typeof light;
