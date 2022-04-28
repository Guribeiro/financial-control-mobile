import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBill } from '@modules/bills/hooks/bill';

import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';
import Container from '@shared/components/Container';
import EditScreenLabel from '@modules/profile/components/EditScreenLabel';
import { useDocument } from '@shared/hooks/document';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  RootBillsParamsList,
  EditBillReceiptParams,
} from '@modules/bills/routes';
import DocumentPicker from '../../components/DocumentPicker';

type EditNameScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBillReceipt'
>;

interface FormProps {
  newReceipt: string;
}

const EditBillReceipt = (): JSX.Element => {
  const { navigate } = useNavigation<EditNameScreenProps>();
  const { params } = useRoute();

  const { bill } = params as EditBillReceiptParams;

  const { handleUpdateBillReceipt, loading } = useBill();

  const { showAnimatedModalConfirmation, image, handleClearSelectedReceipt } =
    useDocument();

  const { control, handleSubmit, setError } = useForm<FormProps>({
    defaultValues: {
      newReceipt: bill.billReceipt.name,
    },
  });

  useEffect(() => {
    return () => handleClearSelectedReceipt();
  }, [handleClearSelectedReceipt]);

  const onSubmit = useCallback(async () => {
    if (!image) {
      setError('newReceipt', {
        message: 'Anexe o comprovante da conta',
        type: 'required',
      });
    }

    await handleUpdateBillReceipt({
      bill_id: bill.id,
      newReceipt: image,
      currentReceipt: bill.billReceipt,
    });

    navigate('EditBill', {
      bill_id: bill.id,
    });
  }, [
    bill.id,
    navigate,
    handleUpdateBillReceipt,
    image,
    setError,
    bill.billReceipt,
  ]);

  return (
    <Container>
      <EditScreenLabel>Editar comprovante</EditScreenLabel>
      <Controller
        name="newReceipt"
        control={control}
        render={({ fieldState: { error } }) => (
          <DocumentPicker
            label="comprovante"
            onPress={showAnimatedModalConfirmation}
            error={error}
          >
            {!image.uri ? 'Anexe o comprovante' : image.uri}
          </DocumentPicker>
        )}
      />
      <Spacer size={64} />
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        Alterar
      </Button>
    </Container>
  );
};
export default EditBillReceipt;
