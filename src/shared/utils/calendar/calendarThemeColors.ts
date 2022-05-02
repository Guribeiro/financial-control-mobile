export const calendarTheme = {
  backgroundColor: '#141517',
  calendarBackground: 'transparent',
  textSectionTitleColor: '#407BFF',
  dayTextColor: '#E9EDEE',
  arrowColor: '#407BFF',
  monthTextColor: '#407BFF',
  todayTextColor: '#407BFF',
  selectedDayBackgroundColor: '#407BFF',
  selectedDayTextColor: '#E9EDEE',
} as const;

export type themeType = typeof calendarTheme;
