import styled from 'styled-components/native';

const TextError = styled.Text`
  position: absolute;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  color: ${({ theme }) => theme.palett.colors.red};
  right: 0px;
  letter-spacing: 1px;
  font-family: 'Roboto_700Bold';
`;

export default TextError;
