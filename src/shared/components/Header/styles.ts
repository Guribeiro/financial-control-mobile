import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(1)}px;
  background-color: ${({ theme }) => theme.palett.colors.blue};
`;

export const GoBackButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.screen.rem(0.75)}px
    ${({ theme }) => theme.screen.rem(0.75)}px
    ${({ theme }) => theme.screen.rem(0.75)}px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderLabelText = styled.Text`
  margin-left: ${({ theme }) => theme.screen.rem(1)}px;
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;
  font-family: 'Roboto_500Medium';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;
