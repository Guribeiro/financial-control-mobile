import React, { useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
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
            <Feather name="eye-off" size={22} color="#FFFFFF" />
          ) : (
            <Feather name="eye" size={22} color="#FFFFFF" />
          )}
        </TogglePasswordVisibilityButton>
      </TextInputRow>
    </Container>
  );
};

export default Password;
