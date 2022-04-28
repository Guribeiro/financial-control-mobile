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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  RootBillsParamsList,
  EditBillValueParams,
} from '@modules/bills/routes';
import InputMoney from '@shared/components/Inputs/InputMoney';

type EditNameScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBillTitle'
>;

interface FormProps {
  value: string;
}

const schema = Yup.object().shape({
  value: Yup.string()
    .required('campo obrigatório')
    .notOneOf(['0'], 'Valor da conta inválido'),
});

const EditBillValue = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { params } = useRoute();

  const { bill } = params as EditBillValueParams;

  const { handleUpdateBillValue, loading } = useBill();

  const { control, handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      value: String(bill.value),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ value }: FormProps) => {
      await handleUpdateBillValue({
        bill_id: bill.id,
        value,
      });

      navigate('EditBill', {
        bill_id: bill.id,
      });
    },
    [handleUpdateBillValue, bill.id, navigate],
  );

  return (
    <Container>
      <EditScreenLabel>Editar valor da conta</EditScreenLabel>
      <Controller
        name="value"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputMoney
            label="valor"
            prefix="R$"
            onChangeText={(text, rawValue) => {
              onChange(text);
              setValue('value', rawValue);
            }}
            value={value}
            defaultValue={value}
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
export default EditBillValue;
