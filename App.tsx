import 'intl';
import 'intl/locale-data/jsonp/en';
import 'react-native-gesture-handler';
import { View, ActivityIndicator, StatusBar, LogBox } from 'react-native';
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from '@shared/hooks';

import { useFonts } from 'expo-font';
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppRoutes from '@shared/routes/index';

const App = (): JSX.Element => {
  LogBox.ignoreLogs([
    'Setting a timer',
    'Non-serializable values were found in the navigation state',
  ]);

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#141517',
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={16}>
        <NavigationContainer>
          <AppProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <AppRoutes />
          </AppProvider>
        </NavigationContainer>
      </ScreenProvider>
    </SafeAreaProvider>
  );
};

export default App;
