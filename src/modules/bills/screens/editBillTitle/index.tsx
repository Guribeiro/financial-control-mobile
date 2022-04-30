import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBill } from '@modules/bills/hooks/bill';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Container from '@shared/components/Container';
import InputText from '@shared/components/Inputs/InputText';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  RootBillsParamsList,
  EditBillTitleParams,
} from '@modules/bills/routes';

type EditNameScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBillTitle'
>;

interface FormProps {
  title: string;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
});

const EditBillTitle = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { params } = useRoute();

  const { bill } = params as EditBillTitleParams;

  const { handleUpdateBillTitle, loading } = useBill();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      title: bill.title,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ title }: FormProps) => {
      await handleUpdateBillTitle({
        bill_id: bill.id,
        title,
        dueDate: bill.dueDate,
        value: bill.value,
        notificationId: bill.notificationId,
      });
      navigate('EditBill', {
        bill_id: bill.id,
      });
    },
    [handleUpdateBillTitle, bill.id, navigate],
  );

  return (
    <Container>
      <EditScreenLabel>Editar título</EditScreenLabel>
      <Controller
        name="title"
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
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        Alterar
      </Button>
    </Container>
  );
};
export default EditBillTitle;
