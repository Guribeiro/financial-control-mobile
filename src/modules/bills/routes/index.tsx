import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';

import { Bill } from '@modules/bills/hooks/bill';

import Header from '@modules/authentication/components/Header';
import ProfileRoutes from '@modules/profile/routes';
import Home from '../screens/home';
import EditBill from '../screens/editBill';
import EditBillTitle from '../screens/editBillTitle';
import EditBillValue from '../screens/editBillValue';
import EditBillDueDate from '../screens/editBillDueDate';
import EditBillStatus from '../screens/editBillStatus';
import EditBillReceipt from '../screens/editBillReceipt';
import ShowBillReceipt from '../screens/showBillReceipt';

export interface EditBillParams {
  bill_id: string;
}

export interface EditBillTitleParams {
  bill: Bill;
}

export interface EditBillValueParams {
  bill: Bill;
}

export interface EditBillDueDateParams {
  bill: Bill;
}

export interface EditBillStatusParams {
  bill: Bill;
}

export interface EditBillReceiptParams {
  bill: Bill;
}

export interface ShowBillReceiptParams {
  bill: Bill;
}

export type RootBillsParamsList = {
  Home: undefined;
  ProfileRoutes: undefined;
  EditBill: EditBillParams;
  EditBillTitle: EditBillTitleParams;
  EditBillValue: EditBillValueParams;
  EditBillDueDate: EditBillDueDateParams;
  EditBillStatus: EditBillStatusParams;
  EditBillReceipt: EditBillReceiptParams;
  ShowBillReceipt: ShowBillReceiptParams;
};

const BillsStack = createNativeStackNavigator<RootBillsParamsList>();

const BillsRoutes = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <BillsStack.Navigator
      initialRouteName="Home"
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
      <BillsStack.Screen name="Home" component={Home} />

      <BillsStack.Screen
        name="EditBill"
        component={EditBill}
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

      <BillsStack.Screen
        name="EditBillTitle"
        component={EditBillTitle}
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

      <BillsStack.Screen
        name="EditBillValue"
        component={EditBillValue}
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

      <BillsStack.Screen
        name="EditBillDueDate"
        component={EditBillDueDate}
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

      <BillsStack.Screen
        name="EditBillStatus"
        component={EditBillStatus}
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

      <BillsStack.Screen
        name="EditBillReceipt"
        component={EditBillReceipt}
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

      <BillsStack.Screen
        name="ShowBillReceipt"
        component={ShowBillReceipt}
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

      <BillsStack.Screen name="ProfileRoutes" component={ProfileRoutes} />
    </BillsStack.Navigator>
  );
};

export default BillsRoutes;
