import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(1.6) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(3)}px;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
  justify-content: space-evenly;
`;

export const Text = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

export const LargeText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(1.4)}px;
  font-family: 'Roboto_400Regular';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  line-height: ${({ theme }) => theme.screen.rem(3, true)}px;
`;

export const TextEmphasized = styled(LargeText)`
  color: ${({ theme }) => theme.palett.colors.blue};
`;

export const WelcomeImage = styled.Image`
  justify-content: flex-end;
  width: 100%;
`;

export const Row = styled.View`
  align-items: flex-start;
  flex-direction: row;
`;
