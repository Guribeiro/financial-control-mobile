import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  ImageInfo,
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from 'expo-image-picker';
import { Platform } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DocumentPickerModal from '@shared/components/DocumentPickerModal';
import { useAlert } from '@shared/hooks/alert';

export type DocumentResultSuccess = {
  type: 'success';
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
};

interface DocumentContextData {
  image: ImageInfo;
  handleClearSelectedReceipt(): void;
  showAnimatedModalConfirmation(): void;
}

const DocumentContext = createContext<DocumentContextData>(
  {} as DocumentContextData,
);

interface DocumentProviderProps {
  children: ReactNode;
}
const DocumentProvider = ({ children }: DocumentProviderProps): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [image, setImage] = useState<ImageInfo>({} as ImageInfo);

  const { alert } = useAlert();

  const modalConfirmationOffset = useSharedValue(INITIAL_VALUE);
  const modalConfirmationOpacity = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: modalConfirmationOffset.value,
    };
  });

  const showAnimatedModalConfirmation = useCallback(() => {
    modalConfirmationOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, FINAL_VALUE]);

  const handleHidePickImageModal = useCallback(() => {
    modalConfirmationOffset.value = withTiming(INITIAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
    modalConfirmationOpacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, modalConfirmationOpacity, INITIAL_VALUE]);

  const handleRequestMediaLibraryPermissionsAsync = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert({
          message: 'Desculpe, não temos permissão de acesso às suas fotos',
          type: 'warning',
        });
      }
    }
  }, [alert]);

  const handlePickImage = useCallback(async () => {
    try {
      await handleRequestMediaLibraryPermissionsAsync();
      const pickedImage = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickedImage.cancelled) {
        setImage(pickedImage);
      }
      handleHidePickImageModal();
    } catch (error) {
      alert({
        message:
          'Desculpe, algo deu errado na inicilização do rolo da sua camêra, tente novamente',
        type: 'warning',
      });
    }
  }, [
    alert,
    handleRequestMediaLibraryPermissionsAsync,
    handleHidePickImageModal,
  ]);

  const handleRequestCameraPermissionsAsync = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert({
          message: 'Desculpe, não temos permissão de acesso à sua câmera',
          type: 'warning',
        });
      }
    }
  }, [alert]);

  const handleTakePicture = useCallback(async () => {
    try {
      await handleRequestCameraPermissionsAsync();

      const pickedImage = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickedImage.cancelled) {
        setImage(pickedImage);
      }
      handleHidePickImageModal();
    } catch (error) {
      alert({
        message:
          'Desculpe, algo deu errado na inicilização do rolo da sua camêra, tente novamente',
        type: 'warning',
      });
    }
  }, [alert, handleHidePickImageModal, handleRequestCameraPermissionsAsync]);

  const handleClearSelectedReceipt = useCallback(() => {
    setImage({} as ImageInfo);
  }, []);

  return (
    <DocumentContext.Provider
      value={{
        image,
        showAnimatedModalConfirmation,
        handleClearSelectedReceipt,
      }}
    >
      {children}
      <Animated.View
        style={[
          modalAnimatedStyle,
          { height: '100%', width: '100%', position: 'absolute' },
        ]}
      >
        <DocumentPickerModal
          onCamera={handleTakePicture}
          onDocument={handlePickImage}
          onRequestClose={handleHidePickImageModal}
        />
      </Animated.View>
    </DocumentContext.Provider>
  );
};

function useDocument(): DocumentContextData {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error('useDocument should be used within an DocumentProvider');
  }

  return context;
}

export { useDocument, DocumentProvider };
