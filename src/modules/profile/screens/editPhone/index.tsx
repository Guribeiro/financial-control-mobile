import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { useProfile } from '@modules/profile/hooks/profile';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';
import { RootProfileParamsList } from '@modules/profile/routes';
import InputPhone from '@shared/components/Inputs/InputPhone';

import Button from '@shared/components/Button';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import { Alert } from 'react-native';

interface FormProps {
  phone: string;
}

type EditPhoneScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'EditPhone'
>;

const schema = Yup.object().shape({
  phone: Yup.string().required('Campo obrigatório').min(15, 'Formato inválido'),
});

const EditPhone = (): JSX.Element => {
  const { navigate } = useNavigation<EditPhoneScreenProps>();
  const { docUser } = useAuthentication();
  const { handleUpdateUserPhone, showProfileModal } = useProfile();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      phone: docUser.phone,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    return () => showProfileModal();
  });

  const onSubmit = useCallback(
    async ({ phone }: FormProps) => {
      try {
        await handleUpdateUserPhone({
          phone,
        });

        navigate('Profile');
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Algo deu errado', message);
      }
    },
    [navigate, handleUpdateUserPhone],
  );

  return (
    <Container>
      <EditScreenLabel>Editar telefone</EditScreenLabel>
      <Controller
        name="phone"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputPhone
            type="cel-phone"
            keyboardType="number-pad"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Spacer size={64} />
      <Button onPress={handleSubmit(onSubmit)}>Alterar</Button>
    </Container>
  );
};
export default EditPhone;
