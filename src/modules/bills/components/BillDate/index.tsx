import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
`;

export const LabelText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(0.8, true)}px;
  color: ${({ theme }) => theme.palett.colors.blue};
`;

export const DateText = styled(LabelText)`
  font-size: ${({ theme }) => theme.screen.rem(0.8, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  line-height: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

interface BillDateProps {
  label: string;
  dateFormatted: string;
}

const BillDate = ({ label, dateFormatted }: BillDateProps): JSX.Element => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <DateText>{dateFormatted}</DateText>
    </Container>
  );
};

export default BillDate;
