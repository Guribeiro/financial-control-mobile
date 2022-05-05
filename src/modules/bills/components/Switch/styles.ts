import styled, { css } from 'styled-components/native';

interface ButtonProps {
  selected: boolean;
}

export const Container = styled.View``;

export const Label = styled.Text`
  text-transform: uppercase;
  font-family: 'Roboto_700Bold';
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  padding: 8px 0;
  flex: 1;
  align-items: center;

  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.palett.colors.blue};
      border: 1px solid ${theme.palett.colors.blue};
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;
