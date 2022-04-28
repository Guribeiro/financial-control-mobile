import { useRoute } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import Logo from '@modules/authentication/components/Logo';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import InputPassword from '@shared/components/Inputs/InputPassword';

import Container from '@shared/components/Container';
import { useCallback } from 'react';
import { DefinePasswordParams } from '../../routes';

export const WelcomeImage = styled.Image`
  justify-content: flex-end;
  width: 100%;
`;

// type SigninScreenProps = NativeStackNavigationProp<
//   RootAuthenticationParamsList,
//   'DefinePassword'
// >;

interface FormProps {
  password: string;
  passwordConfirmation: string;
}

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Formato inválido, mínimo de 08 caracteres')
    .required('Senha é um campo obrigatório'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
});

const DefinePassword = (): JSX.Element => {
  const { handleCreateUserWithEmailAndPassword } = useAuthentication();
  const { params } = useRoute();

  const { name, email, phone } = params as DefinePasswordParams;

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ password }: FormProps) => {
      await handleCreateUserWithEmailAndPassword({
        name,
        email,
        phone,
        password,
      });
    },
    [name, email, phone, handleCreateUserWithEmailAndPassword],
  );

  return (
    <Container>
      <Spacer size={32} />
      <Logo />
      <Spacer size={32} />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputPassword
            label="senha"
            value={value}
            onChangeText={onChange}
            error={error}
          />
        )}
      />
      <Spacer size={16} />
      <Controller
        name="passwordConfirmation"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputPassword
            label="confirmar senha"
            value={value}
            onChangeText={onChange}
            error={error}
          />
        )}
      />
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
      <Spacer size={128} />
    </Container>
  );
};

export default DefinePassword;
