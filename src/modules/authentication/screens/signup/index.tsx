import { useCallback } from 'react';

import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Logo from '@modules/authentication/components/Logo';
import Button from '@shared/components/Button';
import Spacer from '@shared/components/Spacer';
import Input from '@shared/components/Inputs/InputText';
import InputPhone from '@shared/components/Inputs/InputPhone';
import Container from '@shared/components/Container';
import { RootAuthenticationParamsList } from '../../routes';

export const WelcomeImage = styled.Image`
  justify-content: flex-end;
  width: 100%;
`;

export const LargeText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  font-family: 'Roboto_400Regular';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

type SignupScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Signup'
>;

interface FormProps {
  name: string;
  email: string;
  phone: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o seu nome'),
  email: Yup.string().email('Formato inválido').required('Informe o seu email'),
  phone: Yup.string()
    .required('Informe o seu telefone')
    .min(15, 'Formato inválido'),
});

const Signup = (): JSX.Element => {
  const { navigate } = useNavigation<SignupScreenProps>();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    ({ name, email, phone }: FormProps) => {
      navigate('DefinePassword', {
        name,
        email,
        phone,
      });
    },
    [navigate],
  );

  return (
    <Container>
      <Spacer size={32} />
      <Logo />
      <Spacer size={32} />
      <LargeText>Fazer meu cadastro</LargeText>
      <Spacer size={32} />
      <View>
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              label="nome completo"
              value={value}
              onChangeText={onChange}
              error={error}
            />
          )}
        />

        <Spacer size={16} />
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              label="email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={error}
            />
          )}
        />

        <Spacer size={16} />
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <InputPhone
              type="cel-phone"
              label="telefone"
              value={value}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
      </View>
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Próximo</Button>
      <Spacer size={128} />
    </Container>
  );
};

export default Signup;
