import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { verifyCodeError } from '@shared/utils/errors/firebase';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileParamsList } from '@modules/profile/routes';
import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import InputText from '@shared/components/Inputs/InputText';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import EditScreenLabel from '@modules/profile/components/EditScreenLabel';
import Container from '@shared/components/Container';
import { useProfile } from '@modules/profile/hooks/profile';
import { Alert } from 'react-native';

interface FormProps {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Campo não pode estar em branco'),
});

type UpdateEmailScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'EditEmailRoutes'
>;

const UpdateEmail = (): JSX.Element => {
  const { docUser } = useAuthentication();
  const { handleUpdateUserEmail } = useProfile();
  const { navigate } = useNavigation<UpdateEmailScreenProps>();

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      email: docUser.email,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ email }: FormProps) => {
      try {
        await handleUpdateUserEmail({ email });
        navigate('Profile');
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      }
    },
    [handleUpdateUserEmail, navigate],
  );
  return (
    <Container>
      <EditScreenLabel>Editar email</EditScreenLabel>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputText
            keyboardType="email-address"
            onChangeText={text => onChange(text)}
            value={value}
            error={error}
            autoFocus
          />
        )}
      />
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Prosseguir</Button>
    </Container>
  );
};

export default UpdateEmail;
