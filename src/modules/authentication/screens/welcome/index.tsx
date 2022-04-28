import Button from '@shared/components/Button';
import Spacer from '@shared/components/Spacer';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Logo from '@shared/components/Logo';
import { useNavigation } from '@react-navigation/native';
import Container from '@shared/components/Container';
import { RootAuthenticationParamsList } from '../../routes';
import WelcomeBackground from '../../assets/welcome-bg.png';

import { WelcomeImage, Row, LargeText, TextEmphasized } from './styles';

type WelcomeScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Welcome'
>;

const Welcome = (): JSX.Element => {
  const { navigate } = useNavigation<WelcomeScreenProps>();
  return (
    <Container>
      <Spacer size={32} />
      <WelcomeImage resizeMode="contain" source={WelcomeBackground} />
      <Spacer size={32} />
      <Row>
        <Logo />
      </Row>
      <Spacer size={32} />
      <LargeText>
        Gerencie suas contas de casa diretamente do seu
        <TextEmphasized> celular</TextEmphasized>
      </LargeText>
      <Spacer size={64} />
      <Button onPress={() => navigate('Signin')}>Começar</Button>
    </Container>
  );
};

export default Welcome;
