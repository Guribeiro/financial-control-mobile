import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '@modules/authentication/components/Header';
import Settings from '../screens/settings';
import Theme from '../screens/theme';

export type RootSettingsParamsList = {
  Settings: undefined;
  Theme: undefined;
};

const SettingsStack = createNativeStackNavigator<RootSettingsParamsList>();

const SettingsRoutes = (): JSX.Element => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation, route }) => ({
          headerShown: true,
          header: () => (
            <Header
              navigation={navigation}
              label="Voltar"
              route={route}
              options={{}}
            />
          ),
        })}
      />

      <SettingsStack.Screen
        name="Theme"
        component={Theme}
        options={({ navigation, route }) => ({
          headerShown: true,
          header: () => (
            <Header
              navigation={navigation}
              label="Voltar"
              route={route}
              options={{}}
            />
          ),
        })}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsRoutes;
