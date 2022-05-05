import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { DateData } from 'react-native-calendars';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@shared/hooks/theme';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import DatePickerCalendar from '@shared/components/DatePickerCalendar';

interface CalendarTheme {
  backgroundColor: string;
  calendarBackground: string;
  textSectionTitleColor: string;
  dayTextColor: string;
  arrowColor: string;
  monthTextColor: string;
  todayTextColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
}

interface CalendarContextData {
  handleShowCalendar(): void;
  markedDateFormatted: string;
  markedDateAsDate: Date;
}

interface CalendarProviderProps {
  children: ReactNode;
}

const CalendarContext = createContext<CalendarContextData>(
  {} as CalendarContextData,
);

interface MarkedDate {
  [key: string]: {
    selected: boolean;
  };
}

const CalendarProvider = ({ children }: CalendarProviderProps): JSX.Element => {
  const INITIAL_VALUE = 1000;
  const FINAL_VALUE = 0;

  const [markedDate, setMarkedDate] = useState<MarkedDate>(() => {
    const todayDate = new Date();

    const todayDateFormated = format(todayDate, 'yyyy-MM-dd');

    return {
      [todayDateFormated]: {
        selected: true,
      },
    };
  });

  const { customTheme } = useTheme();

  const calendarTheme: CalendarTheme = {
    backgroundColor: customTheme.palett.colors.primary_60,
    calendarBackground: 'transparent',
    textSectionTitleColor: customTheme.palett.colors.blue,
    dayTextColor: customTheme.palett.colors.text_primary_90,
    arrowColor: customTheme.palett.colors.blue,
    monthTextColor: customTheme.palett.colors.blue,
    todayTextColor: customTheme.palett.colors.blue,
    selectedDayBackgroundColor: customTheme.palett.colors.blue,
    selectedDayTextColor: customTheme.palett.colors.primary_100,
  };

  const calendarOffset = useSharedValue(INITIAL_VALUE);

  const createCalendarStyle = useAnimatedStyle(() => {
    return {
      bottom: calendarOffset.value,
    };
  });

  const markedDateFormatted = useMemo(() => {
    const [dateString] = Object.keys(markedDate);

    const dateStringAsDate = new Date(dateString);

    return format(dateStringAsDate, 'MMMM/yyyy', {
      locale: ptBR,
    });
  }, [markedDate]);

  const markedDateAsDate = useMemo(() => {
    const [dateString] = Object.keys(markedDate);

    const dateStringAsDate = new Date(dateString);

    return dateStringAsDate;
  }, [markedDate]);

  const handleShowCalendar = useCallback(() => {
    calendarOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [calendarOffset]);

  const handleHideCalendar = useCallback(() => {
    calendarOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [calendarOffset, INITIAL_VALUE]);

  const handleSetSelectedDate = useCallback((date: DateData) => {
    const { dateString } = date;

    const marked: MarkedDate = {
      [dateString]: {
        selected: true,
      },
    };

    setMarkedDate(marked);
  }, []);

  return (
    <CalendarContext.Provider
      value={{ handleShowCalendar, markedDateFormatted, markedDateAsDate }}
    >
      {children}
      <Animated.View
        style={[
          createCalendarStyle,
          { height: '100%', width: '100%', position: 'absolute' },
        ]}
      >
        <DatePickerCalendar
          theme={calendarTheme}
          hideExtraDays
          onDayPress={handleSetSelectedDate}
          onRequestClose={handleHideCalendar}
          markedDates={markedDate}
        />
      </Animated.View>
    </CalendarContext.Provider>
  );
};

function useCalendar(): CalendarContextData {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendar should be used within an CalendarProvider');
  }
  return context;
}

export { CalendarProvider, useCalendar };
