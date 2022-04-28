import styled from 'styled-components/native';

export const Label = styled.Text`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Roboto_700Bold';
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
`;
