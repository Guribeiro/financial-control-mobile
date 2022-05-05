import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
  border-radius: 10px;
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  justify-content: center;
  align-items: center;
`;

export const LabelText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.blue};
`;

export const DateText = styled(LabelText)`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  line-height: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`;

interface PaidAtProps {
  label: string;
  dateFormatted: string;
}

const PaidAt = ({ label, dateFormatted }: PaidAtProps): JSX.Element => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <DateText>{dateFormatted}</DateText>
    </Container>
  );
};

export default PaidAt;
