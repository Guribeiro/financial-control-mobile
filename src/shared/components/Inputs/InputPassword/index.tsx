import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import Feather from '@expo/vector-icons/Feather';
import TextError from '@shared/components/TextError';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputText,
  InputLabel,
  TextInputRow,
  TogglePasswordVisibilityButton,
} from './styles';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: FieldError | undefined;
}

const PasswordInput = ({
  label,
  error,
  ...rest
}: PasswordInputProps): JSX.Element => {
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const { customTheme } = useTheme();

  const handlePasswordVisibility = useCallback(() => {
    setPasswordIsHide(prev => !prev);
  }, []);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <TextInputRow error={!!error}>
        <InputText
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={passwordIsHide}
          {...rest}
        />
        <TogglePasswordVisibilityButton onPress={handlePasswordVisibility}>
          {passwordIsHide ? (
            <Feather
              name="eye"
              size={customTheme.screen.rem(1.375, true)}
              color={customTheme.palett.colors.text_primary_100}
            />
          ) : (
            <Feather
              name="eye-off"
              size={customTheme.screen.rem(1.375, true)}
              color={customTheme.palett.colors.text_primary_100}
            />
          )}
        </TogglePasswordVisibilityButton>
      </TextInputRow>
      {error && <TextError>{error.message}</TextError>}
    </Container>
  );
};

export default PasswordInput;
