import { useTheme } from '@shared/hooks/theme';
import { Feather } from '@expo/vector-icons';

import { Container, GoBackButton, HeaderLabelText } from './styles';

interface HeaderProps {
  label: string;
  onRequestClose(): void;
}

const Header = ({ label, onRequestClose }: HeaderProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <GoBackButton onPress={onRequestClose}>
        <Feather
          name="chevron-left"
          color={customTheme.palett.colors.text_primary_100}
          size={20}
        />
        <HeaderLabelText>{label}</HeaderLabelText>
      </GoBackButton>
    </Container>
  );
};

export default Header;
