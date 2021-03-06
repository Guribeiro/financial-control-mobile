import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.screen.rem(0.625)}px 0px;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-family: 'Roboto_500Medium';
  padding: ${({ theme }) => theme.screen.rem(0.75)}px;
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  flex: 1;
`;
