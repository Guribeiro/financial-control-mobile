import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(1.5)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  max-width: ${({ theme }) => theme.screen.rem(18)}px;
`;

export const TextEmphasized = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.primary_100};
`;
export const CloseDrawerButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.screen.rem(1)}px 0;
`;
