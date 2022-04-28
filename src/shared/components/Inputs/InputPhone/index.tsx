import React from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';
import { FieldError } from 'react-hook-form';
import TextError from '@shared/components/TextError';
import { Container, InputLabel, InputText, TextInputRow } from './styles';

interface InputPhoneProps extends TextInputMaskProps {
  label?: string;
  required?: boolean;
  error?: FieldError | undefined;
}

const InputPhone = ({
  label,
  required,
  error,
  ...rest
}: InputPhoneProps): JSX.Element => (
  <Container>
    <InputLabel>
      {label}
      {required && '*'}
    </InputLabel>
    {error && <TextError>{error.message}</TextError>}
    <TextInputRow>
      <InputText
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        keyboardAppearance="dark"
        autoCorrect={false}
        autoCapitalize="none"
        {...rest}
      />
    </TextInputRow>
  </Container>
);

export default InputPhone;
