import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import Alert from '@shared/components/Alert';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AlertContextData {
  alert(props: AlertState): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

interface AlertProviderProps {
  children: ReactNode;
}

export type Type = 'success' | 'error' | 'info' | 'warning';

interface AlertState {
  type: Type;
  message: string;
}

const AlertProvider = ({ children }: AlertProviderProps): JSX.Element => {
  const INITIAL_VALUE = -300;
  const FINAL_VALUE = 20;

  const [alertState, setAlertState] = useState<AlertState>({} as AlertState);

  const alertOffset = useSharedValue(INITIAL_VALUE);

  const alertStyles = useAnimatedStyle(() => {
    return {
      bottom: alertOffset.value,
    };
  });

  const showAnimatedAlert = useCallback(() => {
    alertOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [alertOffset]);

  const hideAnimatedAlert = useCallback(() => {
    alertOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });

    setAlertState({} as AlertState);
  }, [alertOffset, INITIAL_VALUE]);

  const alert = useCallback(
    ({ type, message }: AlertState) => {
      setAlertState({
        type,
        message,
      });

      showAnimatedAlert();
    },
    [showAnimatedAlert],
  );

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <Animated.View style={alertStyles}>
        <Alert {...alertState} onClose={hideAnimatedAlert} />
      </Animated.View>
    </AlertContext.Provider>
  );
};

function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context)
    throw new Error('useAlert should be used within an AlertProvider');

  return context;
}

export { useAlert, AlertProvider };
