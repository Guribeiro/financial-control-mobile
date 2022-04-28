import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View``;

export const InputText = styled(TextInput)`
  flex: 1;
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0px ${({ theme }) => theme.screen.rem(1)}px;
`;

export const InputLabel = styled.Text`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Roboto_700Bold';
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
`;

export const TextInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  border-radius: ${({ theme }) => theme.screen.rem(0.625)}px;
  background: ${({ theme }) => theme.palett.colors.secondary_100};
`;

export const TogglePasswordVisibilityButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palett.colors.primary_60};
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  border-top-right-radius: ${({ theme }) => theme.screen.rem(0.5)}px;
  border-bottom-right-radius: ${({ theme }) => theme.screen.rem(0.5)}px;
`;
