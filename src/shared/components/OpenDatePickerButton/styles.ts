import styled from 'styled-components/native';

export const Container = styled.View``;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  background: ${({ theme }) => theme.palett.colors.secondary_100};
  height: ${({ theme }) => theme.screen.rem(3.6)}px;
  padding: 0 ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  font-family: 'Roboto_700Bold';
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
`;
