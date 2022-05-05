import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding: 0 ${({ theme }) => theme.screen.rem(1.6)}px 0;
`;

export const Content = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palett.colors.secondary_100};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Text = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.palett.colors.text_secondary_100};
  text-align: center;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextEmphasized = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.orange};
`;

interface ButtonProps {
  type: 'confirm' | 'cancel';
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 45%;
  padding: ${({ theme }) => theme.screen.rem(0.6)}px;
  align-items: center;
  border-radius: ${({ theme }) => theme.screen.rem(0.4)}px;
  background-color: ${({ type, theme }) =>
    type === 'confirm'
      ? theme.palett.colors.secondary_90
      : theme.palett.colors.red};
`;

export const ButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme }) => theme.palett.colors.text_secondary_100};
`;
