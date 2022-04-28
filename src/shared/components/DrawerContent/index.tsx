import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { useBill } from '@modules/bills/hooks/bill';

import DrawerItem from './DrawerItem';
import Spacer from '../Spacer';

import Header from './Header';

import { Container } from './styles';

const DrawerContent = ({
  navigation,
  ...rest
}: DrawerContentComponentProps): JSX.Element => {
  const { showCreateBillModal } = useBill();
  return (
    <Container>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 0,
        }}
        {...rest}
      >
        <Header navigation={navigation} />
        <Spacer size={30} />
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
          label="Configurações"
          icon="settings"
          onPress={() => navigation.navigate('SettingsRoutes')}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default DrawerContent;
