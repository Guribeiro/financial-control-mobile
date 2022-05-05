import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import Header from '@modules/authentication/components/Header';

import BillsPaidAndPending from '../screens/billsPaidAndPending';
import Reports from '../screens/reports';

export type RootReportsParamsList = {
  Reports: undefined;
  BillsPaidAndPending: undefined;
};

const ReportsStack = createNativeStackNavigator<RootReportsParamsList>();

const ReportsRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <ReportsStack.Navigator
      initialRouteName="Reports"
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
      <ReportsStack.Screen
        name="Reports"
        component={Reports}
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

      <ReportsStack.Screen
        name="BillsPaidAndPending"
        component={BillsPaidAndPending}
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
    </ReportsStack.Navigator>
  );
};

export default ReportsRoutes;
