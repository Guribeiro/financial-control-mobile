import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components/native';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Input from '@shared/components/Inputs/InputText';
import InputPassword from '@shared/components/Inputs/InputPassword';
import Logo from '@modules/authentication/components/Logo';

import Container from '@shared/components/Container';
import { useCallback } from 'react';
import { RootAuthenticationParamsList } from '../../routes';

export const WelcomeImage = styled.Image`
  justify-content: flex-end;
  width: 100%;
`;

type SigninScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Signin'
>;

interface FormProps {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Formato inválido').required('Informe o seu email'),
  password: Yup.string()
    .min(8, 'Formato inválido, mínimo de 08 caracteres')
    .required('Senha é um campo obrigatório'),
});

const Signin = (): JSX.Element => {
  const { handleSignIn, loading } = useAuthentication();
  const { navigate } = useNavigation<SigninScreenProps>();
  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ email, password }: FormProps) => {
      await handleSignIn({
        email,
        password,
      });
    },
    [handleSignIn],
  );

  return (
    <Container>
      <Spacer size={32} />
      <Logo />
      <Spacer size={32} />
      <View>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              label="email"
              value={value}
              keyboardType="email-address"
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        <Spacer size={16} />
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
      </View>
      <Spacer size={64} />
      <View>
        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          Entrar
        </Button>
        <Spacer size={50} />
        <Button type="transparent" onPress={() => navigate('Signup')}>
          Ainda não tenho uma conta
        </Button>
      </View>
      <Spacer size={128} />
    </Container>
  );
};

export default Signin;
