import React from 'react';
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import TextError from '@shared/components/TextError';
import { Container, InputText, InputLabel, TextInputRow } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: FieldError | undefined;
}

const Input = ({ label, error, ...rest }: InputProps): JSX.Element => {
  return (
    <Container>
      {error && <TextError>{error.message}</TextError>}
      <InputLabel>{label}</InputLabel>
      <TextInputRow>
        <InputText
          keyboardAppearance="dark"
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />
      </TextInputRow>
    </Container>
  );
};

export default Input;
