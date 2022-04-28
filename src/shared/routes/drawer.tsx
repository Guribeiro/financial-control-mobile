import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import BillsRoutes from '@modules/bills/routes';
import { useTheme } from '@shared/hooks/theme';
import DrawerContent from '@shared/components/DrawerContent';
import SettingsRoutes from '@modules/settings/routes';

const Drawer = createDrawerNavigator();

const DrawerRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="BillsRoutes"
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: customTheme.palett.colors.primary_100,
        },
        drawerPosition: 'right',
        overlayColor: 'none',
        drawerStyle: {
          flex: 1,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          justifyContent: 'center',
          backgroundColor: 'none',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="BillsRoutes" component={BillsRoutes} />
      <Drawer.Screen name="SettingsRoutes" component={SettingsRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
