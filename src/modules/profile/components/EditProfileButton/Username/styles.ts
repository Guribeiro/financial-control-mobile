import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)``;

export const InputText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  line-height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0px ${({ theme }) => theme.screen.rem(1)}px;
`;

export const InputLabel = styled.Text`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Roboto_700Bold';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  background: ${({ theme }) => theme.palett.colors.primary_100};
`;

export const AtSignContainer = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  justify-content: center;
  background: ${({ theme }) => theme.palett.colors.primary_60};
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
`;
