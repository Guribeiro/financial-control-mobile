import styled from 'styled-components/native';
import { lighten } from 'polished';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '@shared/hooks/theme';

import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

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
`;

interface RoundedButtonProps extends TouchableOpacityProps {
  label?: string;
  name: keyof typeof Feather.glyphMap;
  color?: string;
  size?: number;
  iconColor?: string;
  selected?: boolean;
}

const RoundedButton = ({
  label,
  name,
  size,
  color,
  iconColor,
  selected,
  ...rest
}: RoundedButtonProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <Button color={color} {...rest}>
        <Feather
          name={name}
          size={size}
          color={iconColor || customTheme.palett.colors.primary_100}
        />
      </Button>
      {label && <Label selected={selected}>{label}</Label>}
    </Container>
  );
};

export default RoundedButton;
