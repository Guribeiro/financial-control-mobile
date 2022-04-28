import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import ConfirmCurrentPassword from '@modules/profile/screens/editEmail/confirmCurrentPassword';
import Header from '@modules/authentication/components/Header';
import UpdateEmail from '../screens/editEmail/updateEmail';

export type RootEditEmailParamsList = {
  ConfirmCurrentPassword: undefined;
  UpdateEmail: undefined;
};

const EmailStack = createNativeStackNavigator<RootEditEmailParamsList>();

const AuthenticationRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <EmailStack.Navigator
      initialRouteName="ConfirmCurrentPassword"
      defaultScreenOptions={{
        contentStyle: {
          backgroundColor: customTheme.palett.colors.primary_100,
        },
      }}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: customTheme.palett.colors.primary_100,
        },
      }}
    >
      <EmailStack.Screen
        name="ConfirmCurrentPassword"
        component={ConfirmCurrentPassword}
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

      <EmailStack.Screen
        name="UpdateEmail"
        component={UpdateEmail}
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
    </EmailStack.Navigator>
  );
};

export default AuthenticationRoutes;
