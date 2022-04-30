import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import Spacer from '../Spacer';
import Text from '../Text';

const Container = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const NavigateButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface NavigateButtonProps extends TouchableOpacityProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const NavigateButton = ({
  label,
  icon,
  ...rest
}: NavigateButtonProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container {...rest}>
      <Row>
        <Ionicons
          name={icon}
          color={customTheme.palett.colors.text_primary_100}
          size={customTheme.screen.rem(1.5, true)}
        />
        <Spacer size={16} horizontal />
        <NavigateButtonText weight="light">{label}</NavigateButtonText>
      </Row>
      <Feather
        name="chevron-right"
        color={customTheme.palett.colors.text_primary_100}
        size={customTheme.screen.rem(1.5, true)}
      />
    </Container>
  );
};

export default NavigateButton;
