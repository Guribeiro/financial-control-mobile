import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';

import { Container, GoBackButton, HeaderLabelText } from './styles';

interface HeaderProps extends NativeStackHeaderProps {
  label?: string;
}

const Header = ({ label, navigation }: HeaderProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <GoBackButton onPress={() => navigation.goBack()}>
        <Feather
          name="chevron-left"
          color={customTheme.palett.colors.text_primary_100}
          size={customTheme.screen.rem(1.25, true)}
        />
        <HeaderLabelText>{label || 'Voltar'}</HeaderLabelText>
      </GoBackButton>
    </Container>
  );
};

export default Header;
