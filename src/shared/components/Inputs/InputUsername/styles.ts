import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const InputText = styled(TextInput)`
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0px ${({ theme }) => theme.screen.rem(1)}px;
  flex: 1;
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  font-family: 'Roboto_700Bold';
  letter-spacing: 1px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  background: ${({ theme }) => theme.palett.colors.primary_100};
  border-radius: ${({ theme }) => theme.screen.rem(0.625)}px;
`;

export const AtSignContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  background: ${({ theme }) => theme.palett.colors.primary_60};

  border-top-left-radius: ${({ theme }) => theme.screen.rem(0.5)}px;
  border-bottom-left-radius: ${({ theme }) => theme.screen.rem(0.5)}px;
`;
