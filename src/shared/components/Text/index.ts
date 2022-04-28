import styled from 'styled-components/native';

type Weight = 'light' | 'regular' | 'medium' | 'bold';

interface TextProps {
  weight?: Weight;
}

const fontWeight = {
  light: 'Roboto_300Light',
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
};

const Text = styled.Text<TextProps>`
  font-size: ${({ theme }) => theme.screen.rem(0.8)}px;
  font-family: ${({ weight = 'medium' }) => fontWeight[weight]};
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  line-height: ${({ theme }) => theme.screen.rem(2)}px;
`;

export default Text;
