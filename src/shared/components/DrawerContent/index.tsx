import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { useBill } from '@modules/bills/hooks/bill';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import DrawerItem from './DrawerItem';
import Spacer from '../Spacer';

import Header from './Header';

import { Container } from './styles';

const DrawerContent = ({
  navigation,
  ...rest
}: DrawerContentComponentProps): JSX.Element => {
  const { showCreateBillModal } = useBill();
  const { showConfirmActionModal } = useAuthentication();
  return (
    <Container>
      <DrawerContentScrollView {...rest}>
        <Header navigation={navigation} />
        <Spacer size={30} />
        <DrawerItem
          label="Início"
          icon="home"
          onPress={() => navigation.navigate('BillsRoutes')}
        />
        <DrawerItem
          label="Adicionar nova conta"
          icon="plus"
          onPress={showCreateBillModal}
        />
        <DrawerItem
          label="Perfil"
          icon="user"
          onPress={() => navigation.navigate('ProfileRoutes')}
        />
        <DrawerItem
          label="Relatórios"
          icon="paperclip"
          onPress={() => navigation.navigate('ReportsRoutes')}
        />
        <DrawerItem
          label="Configurações"
          icon="settings"
          onPress={() => navigation.navigate('SettingsRoutes')}
        />

        <DrawerItem
          label="Sair"
          icon="power"
          onPress={showConfirmActionModal}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default DrawerContent;
