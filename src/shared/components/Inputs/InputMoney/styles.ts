import styled from 'styled-components/native';
import { MaskedTextInput } from 'react-native-mask-text';

export const Container = styled.View``;

interface TextInputRowProps {
  error: boolean;
}

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palett.colors.red : theme.palett.colors.secondary_100};
  background: ${({ theme }) => theme.palett.colors.secondary_100};
  height: ${({ theme }) => theme.screen.rem(3.6)}px;
`;

export const InputLabel = styled.Text`
  text-transform: uppercase;
  font-family: 'Roboto_700Bold';
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputMasked = styled(MaskedTextInput)`
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0 ${({ theme }) => theme.screen.rem(1)}px 0 0;
  flex: 1;
`;

export const Prefix = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  margin: 0 ${({ theme }) => theme.screen.rem(0.3)}px 0
    ${({ theme }) => theme.screen.rem(1)}px;
`;
