/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { updateEmail } from 'firebase/auth';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { updateDoc, doc } from 'firebase/firestore';

import { database } from '@shared/services/firebase';

import ProfileModal from '@modules/profile/screens/profile';

interface HandleUpdateUserNameProps {
  name: string;
}

interface HandleUpdateUserPhoneProps {
  phone: string;
}

interface HandleUpdateUserEmailProps {
  email: string;
}

interface ProfileContextData {
  loading: boolean;
  handleUpdateUserName(data: HandleUpdateUserNameProps): Promise<void>;
  handleUpdateUserPhone(data: HandleUpdateUserPhoneProps): Promise<void>;
  handleUpdateUserEmail(data: HandleUpdateUserEmailProps): Promise<void>;
  showProfileModal(): void;
  hideProfileModal(): void;
}

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

interface AuthenticationProviderProps {
  children: ReactNode;
}

const ProfileProvider = ({
  children,
}: AuthenticationProviderProps): JSX.Element => {
  const INITIAL_VALUE = 1000;
  const FINAL_VALUE = 0;

  const [loading, setLoading] = useState(false);
  const { user } = useAuthentication();

  const profileModalOffset = useSharedValue(INITIAL_VALUE);

  const profileModalStyle = useAnimatedStyle(() => {
    return {
      bottom: profileModalOffset.value,
    };
  });

  const showProfileModal = useCallback(() => {
    profileModalOffset.value = withTiming(FINAL_VALUE, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [profileModalOffset, FINAL_VALUE]);

  const hideProfileModal = useCallback(() => {
    profileModalOffset.value = withTiming(INITIAL_VALUE, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [INITIAL_VALUE, profileModalOffset]);

  const handleUpdateUserName = useCallback(
    async ({ name }: HandleUpdateUserNameProps) => {
      try {
        setLoading(true);
        const docUserRef = doc(database, 'users', user.uid);

        await updateDoc(docUserRef, {
          name,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user.uid],
  );

  const handleUpdateUserPhone = useCallback(
    async ({ phone }: HandleUpdateUserPhoneProps) => {
      try {
        setLoading(true);
        const docUserRef = doc(database, 'users', user.uid);

        await updateDoc(docUserRef, {
          phone,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user.uid],
  );

  const handleUpdateUserEmail = useCallback(
    async ({ email }: HandleUpdateUserEmailProps) => {
      const docUserRef = doc(database, 'users', user.uid);

      await updateEmail(user, email);

      await updateDoc(docUserRef, {
        email,
      });
    },
    [user],
  );

  return (
    <ProfileContext.Provider
      value={{
        loading,
        handleUpdateUserName,
        handleUpdateUserPhone,
        handleUpdateUserEmail,
        showProfileModal,
        hideProfileModal,
      }}
    >
      {children}
      {/* <Animated.View
        style={[
          profileModalStyle,
          { height: '100%', width: '100%', position: 'absolute' },
        ]}
      > */}
      {/* <ProfileModal onRequestClose={hideProfileModal} /> */}
      {/* </Animated.View> */}
    </ProfileContext.Provider>
  );
};

function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile should be used within an ProfileProvider ');
  }
  return context;
}

export { useProfile, ProfileProvider };
