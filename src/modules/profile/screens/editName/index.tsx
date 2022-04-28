import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { useProfile } from '@modules/profile/hooks/profile';

import { verifyCodeError } from '@shared/utils/errors/firebase';
import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Container from '@shared/components/Container';
import InputText from '@shared/components/Inputs/InputText';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileParamsList } from '@modules/profile/routes';
import { Alert } from 'react-native';

type EditNameScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'EditName'
>;

interface FormProps {
  name: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
});

const EditName = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { docUser } = useAuthentication();
  const { handleUpdateUserName } = useProfile();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: docUser.name,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ name }: FormProps) => {
      try {
        await handleUpdateUserName({
          name,
        });
        navigate('Profile');
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      }
    },
    [handleUpdateUserName, navigate],
  );

  return (
    <Container>
      <EditScreenLabel>Editar nome</EditScreenLabel>
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputText
            onChangeText={onChange}
            value={value}
            error={error}
            autoCapitalize="words"
          />
        )}
      />
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Alterar</Button>
    </Container>
  );
};
export default EditName;
