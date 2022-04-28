import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useBill } from '@modules/bills/hooks/bill';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Container from '@shared/components/Container';
import OpenDatePickerButton from '@shared/components/OpenDatePickerButton';

import {
  RootBillsParamsList,
  EditBillDueDateParams,
} from '@modules/bills/routes';

type EditNameScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBillTitle'
>;

interface FormProps {
  dueDate: Date;
}

const schema = Yup.object().shape({
  dueDate: Yup.date().required('Selecione a data de vencimento da conta'),
});

const EditBillDueDate = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { params } = useRoute();

  const { bill } = params as EditBillDueDateParams;

  const { handleUpdateBillDueDate, loading } = useBill();

  const [selectedDate, setSelectedDate] = useState(bill.dueDate);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const { handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      dueDate: bill.dueDate,
    },
    resolver: yupResolver(schema),
  });

  const handleToggleDatePicker = useCallback(() => {
    setShowDateTimePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (_, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDateTimePicker(false);
      }

      if (date) {
        setSelectedDate(date);
        setValue('dueDate', date);
      }
    },
    [setValue],
  );

  const onSubmit = useCallback(
    async ({ dueDate }: FormProps) => {
      handleUpdateBillDueDate({
        bill_id: bill.id,
        dueDate,
      });

      navigate('EditBill', {
        bill_id: bill.id,
      });
    },
    [handleUpdateBillDueDate, bill.id, navigate],
  );

  return (
    <Container>
      <EditScreenLabel>Editar data de vencimento</EditScreenLabel>
      <OpenDatePickerButton
        label="data de vencimento"
        date={selectedDate}
        onPress={handleToggleDatePicker}
      />
      {showDateTimePicker && (
        <DateTimePicker
          mode="date"
          value={selectedDate}
          onChange={handleDateChanged}
        />
      )}
      <Spacer size={64} />
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        Alterar
      </Button>
    </Container>
  );
};
export default EditBillDueDate;
