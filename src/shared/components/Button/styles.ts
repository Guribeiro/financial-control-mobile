import styled, { css } from 'styled-components/native';

export type Type = 'common' | 'transparent';

interface ContainerProps {
  type: Type;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.screen.rem(1)}px;

  ${({ type, theme }) =>
    type === 'transparent' &&
    css`
      background-color: ${theme.palett.colors.primary_100};
    `}

  ${({ type, theme }) =>
    type === 'common' &&
    css`
      background-color: ${theme.palett.colors.blue};
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;
