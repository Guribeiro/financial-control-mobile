import { View, Alert } from 'react-native';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import { useNavigation } from '@react-navigation/native';
import { RootEditPasswordParamsList } from '@modules/profile/routes/password';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import InputPassword from '@shared/components/Inputs/InputPassword';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import EditScreenLabel from '@modules/profile/components/EditScreenLabel';
import Container from '@shared/components/Container';

interface FormProps {
  password: string;
  passwordConfirmation: string;
}

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Formato inválido, mínimo de 08 caracteres')
    .required('Senha é um campo obrigatório'),
});

type UpdatePasswordScreenParams = NativeStackNavigationProp<
  RootEditPasswordParamsList,
  'UpdatePassword'
>;

const UpdatePassword = (): JSX.Element => {
  const { handleUpdateAuthPassword } = useAuthentication();

  const { navigate } = useNavigation<UpdatePasswordScreenParams>();

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ password }: FormProps) => {
      try {
        await handleUpdateAuthPassword({ password });
        // navigate('');
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      }
    },
    [handleUpdateAuthPassword],
  );
  return (
    <Container>
      <EditScreenLabel>Editar senha</EditScreenLabel>
      <View>
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
      </View>
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Prosseguir</Button>
    </Container>
  );
};

export default UpdatePassword;
