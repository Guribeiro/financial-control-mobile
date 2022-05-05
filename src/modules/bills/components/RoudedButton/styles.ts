import styled from 'styled-components/native';
import { lighten } from 'polished';

import { TouchableOpacity } from 'react-native';

interface ContainerProps {
  color?: string;
}

export const Container = styled.View`
  align-items: center;
`;

interface LabelProps {
  selected?: boolean;
}

export const Label = styled.Text<LabelProps>`
  margin-top: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  font-size: ${({ theme }) => theme.screen.rem(0.6, true)}px;
  font-family: 'Roboto_500Medium';

  color: ${({ theme, selected }) =>
    selected ? theme.palett.colors.blue : theme.palett.colors.text_primary_100};
`;

export const Button = styled(TouchableOpacity)<ContainerProps>`
  background-color: ${({ theme, color }) =>
    lighten(0.1, color || theme.palett.colors.blue)};
  width: ${({ theme }) => theme.screen.rem(2.875)}px;
  height: ${({ theme }) => theme.screen.rem(2.875)}px;
  border-radius: ${({ theme }) => theme.screen.rem(2.875)}px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;
