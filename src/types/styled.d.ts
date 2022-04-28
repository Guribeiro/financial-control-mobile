import 'styled-components';
import type { ResponsiveTheme } from '@shared/hooks/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ResponsiveTheme {
    palett: {
      title: 'light' | 'dark';
      colors: {
        primary_100: string;
        primary_90: string;
        primary_60: string;
        secondary_100: string;
        secondary_90: string;
        secondary_60: string;
        gray: string;
        orange: string;
        blue: string;
        green: string;
        red: string;
        white: string;
        white_60: string;
        text_primary_100: string;
        text_primary_90: string;
        text_primary_60: string;
        text_secondary_100: string;
        text_secondary_90: string;
        text_secondary_60: string;
      };
    };
  }
}
