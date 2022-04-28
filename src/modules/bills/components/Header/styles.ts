import styled from 'styled-components/native';

import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.6) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(1)}px;
  background-color: ${({ theme }) => theme.palett.colors.blue};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const WelcomeText = styled.Text`
  font-family: 'Roboto_500Medium';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
`;

export const UserNameText = styled.Text`
  font-family: 'Roboto_500Medium';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  text-transform: capitalize;
`;
