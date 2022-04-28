import styled from 'styled-components/native';

export const Container = styled.View`
  height: 90%;
  width: 100%;
  padding: ${({ theme }) => theme.screen.rem(1)}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(5)}px;
  background: ${({ theme }) => theme.palett.colors.blue};
  justify-content: space-between;
  position: absolute;
  bottom: ${({ theme }) => theme.screen.rem(2.5)}px;
`;

export const DrawerHeader = styled.View`
  padding-bottom: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const DrawerText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.125, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;
export const SignOutButtonText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.primary_100};
  line-height: ${({ theme }) => theme.screen.rem(2.5)}px;
  font-family: 'Roboto_500Medium';
`;

export const SignOutButton = styled.TouchableOpacity`
  padding: 4px;
  align-items: center;
`;
