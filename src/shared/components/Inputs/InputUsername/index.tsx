import React from 'react';
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import TextError from '@shared/components/TextError';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputText,
  InputLabel,
  TextInputRow,
  AtSignContainer,
} from './styles';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: FieldError | undefined;
  handlePasswordVisibility?(): void;
}

const PasswordInput = ({
  label,
  error,
  ...rest
}: PasswordInputProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      {error && <TextError>{error.message}</TextError>}
      <TextInputRow>
        <AtSignContainer>
          <Ionicons
            name="at-outline"
            size={22}
            color={customTheme.palett.colors.text_primary_100}
          />
        </AtSignContainer>
        <InputText autoCapitalize="none" {...rest} />
      </TextInputRow>
    </Container>
  );
};

export default PasswordInput;
