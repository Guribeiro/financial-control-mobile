import React, { useState, useCallback } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputLabel,
  TextInputRow,
  InputText,
  TogglePasswordVisibilityButton,
} from './styles';

interface EditProfileTextProps extends TouchableOpacityProps {
  label: string;
  children: string;
}

const Password = ({ label, children }: EditProfileTextProps): JSX.Element => {
  const [isVisibile, setIsVisible] = useState(false);

  const { customTheme } = useTheme();

  const handleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <TextInputRow>
        <InputText>{isVisibile ? children : '***********'}</InputText>
        <TogglePasswordVisibilityButton onPress={handleVisibility}>
          {isVisibile ? (
            <Feather
              name="eye-off"
              size={customTheme.screen.rem(1.375, true)}
              color={customTheme.palett.colors.text_primary_100}
            />
          ) : (
            <Feather
              name="eye"
              size={customTheme.screen.rem(1.375, true)}
              color={customTheme.palett.colors.text_primary_100}
            />
          )}
        </TogglePasswordVisibilityButton>
      </TextInputRow>
    </Container>
  );
};

export default Password;
