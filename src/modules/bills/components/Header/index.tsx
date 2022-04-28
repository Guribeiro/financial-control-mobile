import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { useTheme } from '@shared/hooks/theme';

import Spacer from '@shared/components/Spacer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBillsParamsList } from '@modules/bills/routes';
import RoundedButton from '../RoudedButton';

import { Container, Row, WelcomeText, UserNameText } from './styles';

type HomeScreenProps = NativeStackNavigationProp<RootBillsParamsList, 'Home'>;

const Header = (): JSX.Element => {
  const { customTheme } = useTheme();
  const { userName } = useAuthentication();
  const { navigate, dispatch } = useNavigation<HomeScreenProps>();

  return (
    <Container>
      <Row>
        <RoundedButton
          name="user"
          size={22}
          color={customTheme.palett.colors.blue}
          onPress={() => navigate('ProfileRoutes')}
        />

        <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
          <Feather
            name="settings"
            size={24}
            color={customTheme.palett.colors.secondary_100}
          />
        </TouchableOpacity>
      </Row>

      <Spacer size={32} />
      <WelcomeText>
        Olá, <UserNameText ellipsizeMode="tail">{userName}</UserNameText>
      </WelcomeText>
    </Container>
  );
};

export default Header;
