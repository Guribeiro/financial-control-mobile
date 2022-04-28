import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import ConfirmCurrentPassword from '@modules/profile/screens/editPassword/confirmCurrentPassword';
import Header from '@modules/authentication/components/Header';
import UpdatePassword from '../screens/editPassword/updatePassword';

export interface DefinePasswordParams {
  name: string;
  email: string;
  phone: string;
}

export type RootEditPasswordParamsList = {
  ConfirmCurrentPassword: undefined;
  UpdatePassword: undefined;
};

const PasswordStack = createNativeStackNavigator<RootEditPasswordParamsList>();

const AuthenticationRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <PasswordStack.Navigator
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
      <PasswordStack.Screen
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

      <PasswordStack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
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
    </PasswordStack.Navigator>
  );
};

export default AuthenticationRoutes;
