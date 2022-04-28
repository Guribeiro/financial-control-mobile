import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBill } from '@modules/bills/hooks/bill';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Container from '@shared/components/Container';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';
import Select, { SelectItem } from '@shared/components/Select';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  RootBillsParamsList,
  EditBillStatusParams,
} from '@modules/bills/routes';

type EditNameScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBillStatus'
>;

interface FormProps {
  status: 'pending' | 'paid';
}

const schema = Yup.object().shape({
  status: Yup.string().required('Campo obrigatório'),
});

const EditBillStatus = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { params } = useRoute();

  const { bill } = params as EditBillStatusParams;

  const { handleUpdateBillStatus, loading } = useBill();

  const items: Array<SelectItem> = [
    {
      key: 'pending',
      label: 'Pendente',
      value: 'pending',
    },
    {
      key: 'paid',
      label: 'Pago',
      value: 'paid',
    },
  ];

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      status: bill.status,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ status }: FormProps) => {
      await handleUpdateBillStatus({
        bill_id: bill.id,
        status,
        title: bill.title,
        value: bill.value,
        dueDate: bill.dueDate,
        notificationId: bill.notificationId,
      });

      navigate('EditBill', {
        bill_id: bill.id,
      });
    },
    [
      navigate,
      handleUpdateBillStatus,
      bill.id,
      bill.title,
      bill.value,
      bill.dueDate,
      bill.notificationId,
    ],
  );

  return (
    <Container>
      <EditScreenLabel>Editar status</EditScreenLabel>
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            value={value}
            label="status"
            required
            items={items}
            onValueChange={text => {
              onChange(text);
            }}
            error={error}
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
export default EditBillStatus;
