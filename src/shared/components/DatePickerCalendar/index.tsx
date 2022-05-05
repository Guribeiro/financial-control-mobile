import { Calendar, CalendarProps } from 'react-native-calendars';
import '@shared/utils/calendar/calendarLocaleConfig';
import { calendarTheme } from '@shared/utils/calendar/calendarThemeColors';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import { Container, Content, CloseCalendarButton } from './styles';

interface DatePickerCalendarProps extends CalendarProps {
  onRequestClose(): void;
}

const DatePickerCalendar = ({
  onRequestClose,
  ...rest
}: DatePickerCalendarProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <Content>
        <Calendar theme={calendarTheme} {...rest} />
        <CloseCalendarButton onPress={onRequestClose}>
          <Feather
            name="chevron-up"
            color={customTheme.palett.colors.text_primary_100}
            size={24}
          />
        </CloseCalendarButton>
      </Content>
    </Container>
  );
};

export default DatePickerCalendar;
