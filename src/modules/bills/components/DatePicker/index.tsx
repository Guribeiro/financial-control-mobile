import { useCalendar } from '@modules/bills/hooks/calendar';

import Text from '@shared/components/Text';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const Label = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.6, true)}px;
  line-height: ${({ theme }) => theme.screen.rem(2)}px;
`;

export const DateText = styled(Label)`
  font-size: ${({ theme }) => theme.screen.rem(0.8, true)}px;
  color: ${({ theme }) => theme.palett.colors.blue};
`;

const DatePicker = (): JSX.Element => {
  const { handleShowCalendar, markedDateFormatted } = useCalendar();

  return (
    <Container onPress={handleShowCalendar}>
      <Label>Selecione o mês e o ano</Label>
      <DateText>{markedDateFormatted}</DateText>
    </Container>
  );
};

export default DatePicker;
