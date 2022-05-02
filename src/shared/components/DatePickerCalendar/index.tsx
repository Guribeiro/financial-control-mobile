import { Calendar, CalendarProps } from 'react-native-calendars';
import '@shared/utils/calendar/calendarLocaleConfig';
import styled from 'styled-components/native';
import { calendarTheme } from '@shared/utils/calendar/calendarThemeColors';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { opacify } from 'polished';

const Container = styled.View`
  flex: 1;
  position: absolute;
  background: ${({ theme }) =>
    opacify(0.1, `${theme.palett.colors.primary_60}`)};
  justify-content: flex-end;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

const Content = styled.View`
  background-color: ${({ theme }) => theme.palett.colors.secondary_100};
`;

const CloseCalendarButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.palett.colors.red};
  padding: ${({ theme }) => theme.screen.rem(1, true)}px;
  justify-content: center;
  align-items: center;
`;

interface DatePickerCalendarProps extends CalendarProps {
  onRequestClose(): void;
}

const DatePickerCalendar = ({
  onRequestClose,
  ...rest
}: DatePickerCalendarProps): JSX.Element => {
  return (
    <Container>
      <Content>
        <Calendar theme={calendarTheme} {...rest} />
        <CloseCalendarButton onPress={onRequestClose}>
          <Feather name="chevron-up" color="#fff" size={24} />
        </CloseCalendarButton>
      </Content>
    </Container>
  );
};

export default DatePickerCalendar;
