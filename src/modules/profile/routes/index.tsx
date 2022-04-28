import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import Header from '@modules/authentication/components/Header';
import EditName from '@modules/profile/screens/editName';
import EditPhone from '@modules/profile/screens/editPhone';
import EditEmailRoutes from '@modules/profile/routes/email';
import EditPasswordRoutes from '@modules/profile/routes/password';
import Profile from '../screens/profile';

export type RootProfileParamsList = {
  Profile: undefined;
  EditName: undefined;
  EditPhone: undefined;
  EditEmailRoutes: undefined;
  EditPasswordRoutes: undefined;
};

const ProfileStack = createNativeStackNavigator<RootProfileParamsList>();

const ProfileRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
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
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
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

      <ProfileStack.Screen
        name="EditName"
        component={EditName}
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

      <ProfileStack.Screen
        name="EditPhone"
        component={EditPhone}
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
      <ProfileStack.Screen name="EditEmailRoutes" component={EditEmailRoutes} />
      <ProfileStack.Screen
        name="EditPasswordRoutes"
        component={EditPasswordRoutes}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileRoutes;
