/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { setDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAlert } from '@shared/hooks/alert';
import { auth, database } from '@shared/services/firebase';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import { Alert, Dimensions } from 'react-native';

import ConfirmAction from '@shared/components/ConfirmAction';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AuthenticationContextData {
  loading: boolean;
  user: User;
  docUser: DocUser;
  userName: string;
  showConfirmActionModal(): void;
  handleSignIn(data: HandleSingInProps): Promise<void>;
  handleSignOut(): Promise<void>;
  handleCreateUserWithEmailAndPassword(
    data: HandleCreateUserWithEmailAndPasswordProps,
  ): Promise<void>;
  handleReauthenticate(data: HandleReauthenticateProps): Promise<void>;
  handleUpdateAuthPassword(data: HandleUpdateAuthPasswordProps): Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextData>(
  {} as AuthenticationContextData,
);

interface AuthenticationProviderProps {
  children: ReactNode;
}

interface HandleCreateUserWithEmailAndPasswordProps {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface HandleSingInProps {
  email: string;
  password: string;
}

interface HandleReauthenticateProps {
  password: string;
}

interface HandleUpdateAuthPasswordProps {
  password: string;
}

interface CreateUserSchema {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

interface DocUser {
  name: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
}

const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps): JSX.Element => {
  const INITIAL_VALUE = 1000;
  const FINAL_VALUE = Dimensions.get('screen').height / 2;
  const { alert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [userName, setUserName] = useState('');
  const [docUser, setDocUser] = useState<DocUser>({} as DocUser);

  const modalConfirmationOffset = useSharedValue(INITIAL_VALUE);
  const modalConfirmationOpacity = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: modalConfirmationOffset.value,
      opacity: modalConfirmationOpacity.value,
    };
  });

  const showConfirmActionModal = useCallback(() => {
    modalConfirmationOffset.value = withTiming(FINAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
    modalConfirmationOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, modalConfirmationOpacity, FINAL_VALUE]);

  const hideConfirmActionModal = useCallback(() => {
    modalConfirmationOffset.value = withTiming(INITIAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
    modalConfirmationOpacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, modalConfirmationOpacity, INITIAL_VALUE]);

  const handleUserNameFormatted = useCallback((name: string) => {
    const [firstName, secondName] = name.split(' ');

    const nameFormatted = `${firstName} ${secondName}`;

    setUserName(nameFormatted);
  }, []);

  const loadPersistedAuth = useCallback(() => {
    onAuthStateChanged(auth, observedUser => {
      if (observedUser) {
        setUser(observedUser);
      } else {
        alert({
          message: 'user could not be found',
          type: 'warning',
        });
      }
    });
  }, [alert]);

  useEffect(() => {
    loadPersistedAuth();
  }, [loadPersistedAuth]);

  useEffect(() => {
    if (!user.uid) {
      return;
    }

    const unsubscribe = onSnapshot(
      doc(database, 'users', user.uid),
      docData => {
        const docUserData = docData.data() as DocUser;

        setDocUser(docUserData);
        handleUserNameFormatted(docUserData.name);
      },
    );

    return () => unsubscribe();
  }, [user, handleUserNameFormatted]);

  const handleCreateUserWithEmailAndPassword = useCallback(
    async ({
      name,
      email,
      phone,
      password,
    }: HandleCreateUserWithEmailAndPasswordProps) => {
      try {
        setLoading(true);
        const { user: userData } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const createdAt = new Date();

        const createUserSchema: CreateUserSchema = {
          name,
          email,
          phone,
          createdAt,
        };

        await setDoc(doc(database, 'users', userData.uid), createUserSchema);
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSignIn = useCallback(
    async ({ email, password }: HandleSingInProps) => {
      try {
        setLoading(true);
        const { user: signedUser } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        setUser(signedUser);
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser({} as User);
      setDocUser({} as DocUser);
    } catch (error) {
      const message = verifyCodeError(error);
      Alert.alert('Algo deu errado', message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReauthenticate = useCallback(
    async ({ password }: HandleReauthenticateProps) => {
      try {
        setLoading(true);
        const credential = EmailAuthProvider.credential(
          docUser.email,
          password,
        );

        const { user: reauthenticatedUser } =
          await reauthenticateWithCredential(user, credential);

        setUser(reauthenticatedUser);
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      } finally {
        setLoading(false);
      }
    },
    [docUser.email, user],
  );

  const handleUpdateAuthPassword = useCallback(
    async ({ password }: HandleUpdateAuthPasswordProps) => {
      try {
        setLoading(true);
        await updatePassword(user, password);
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return (
    <AuthenticationContext.Provider
      value={{
        loading,
        user,
        docUser,
        userName,
        showConfirmActionModal,
        handleSignIn,
        handleSignOut,
        handleCreateUserWithEmailAndPassword,
        handleReauthenticate,
        handleUpdateAuthPassword,
      }}
    >
      {children}
      <Animated.View
        style={[
          modalAnimatedStyle,
          { position: 'absolute', alignSelf: 'center' },
        ]}
      >
        <ConfirmAction
          label="Deseja mesmo sair?"
          cancelButtonText="Cancelar"
          confirmButtonText="Sim"
          onClose={hideConfirmActionModal}
          onConfirm={handleSignOut}
        />
      </Animated.View>
    </AuthenticationContext.Provider>
  );
};

function useAuthentication(): AuthenticationContextData {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthentication should be used within an AuthenticationProvider ',
    );
  }
  return context;
}

export { useAuthentication, AuthenticationProvider };
