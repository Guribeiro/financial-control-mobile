import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from '@shared/hooks/theme';
import { Container, Button, Label } from './styles';

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
