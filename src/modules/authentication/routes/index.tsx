import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import Header from '../components/Header';
import Welcome from '../screens/welcome';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import DefinePassword from '../screens/definePassword';
import ForgotPassword from '../screens/forgotPassword';

export interface DefinePasswordParams {
  name: string;
  email: string;
  phone: string;
}

export type RootAuthenticationParamsList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  DefinePassword: DefinePasswordParams;
  ForgotPassword: undefined;
};

const AuthenticationStack =
  createNativeStackNavigator<RootAuthenticationParamsList>();

const AuthenticationRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <AuthenticationStack.Navigator
      initialRouteName="Welcome"
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
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen
        name="Signin"
        component={Signin}
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

      <AuthenticationStack.Screen
        name="Signup"
        component={Signup}
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

      <AuthenticationStack.Screen
        name="DefinePassword"
        component={DefinePassword}
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

      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
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
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationRoutes;
