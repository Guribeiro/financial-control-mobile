import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components/native';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Input from '@shared/components/Inputs/InputText';
import Logo from '@modules/authentication/components/Logo';

import Container from '@shared/components/Container';
import { useCallback } from 'react';

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

interface FormProps {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Formato inválido').required('Informe o seu email'),
});

const ForgotPassword = (): JSX.Element => {
  const { loading, handleSendPasswordResetEmail } = useAuthentication();
  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ email }: FormProps) => {
      await handleSendPasswordResetEmail({
        email,
      });
    },
    [handleSendPasswordResetEmail],
  );

  return (
    <Container>
      <Spacer size={32} />
      <Logo />
      <Spacer size={32} />
      <LargeText>Recuperar senha</LargeText>
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
      </View>
      <Spacer size={64} />
      <View>
        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          Entrar
        </Button>
      </View>
      <Spacer size={128} />
    </Container>
  );
};

export default ForgotPassword;
