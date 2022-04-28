import { View, Platform, Dimensions } from 'react-native';
import Spacer from '@shared/components/Spacer';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBill } from '@modules/bills/hooks/bill';
import Scroll from '@shared/components/Scroll';

import Input from '@shared/components/Inputs/InputText';
import InputMoney from '@shared/components/Inputs/InputMoney';
import Button from '@shared/components/Button';
import { useCallback, useState } from 'react';

import OpenDatePickerButton from '@shared/components/OpenDatePickerButton';
import { useTheme } from '@shared/hooks/theme';

import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '@shared/components/Header';
import { useDocument } from '@shared/hooks/document';
import DocumentPicker from '../../components/DocumentPicker';

import {
  Container,
  Content,
  CreateBillModalText,
  TextEmphasized,
} from './styles';

interface FormProps {
  title: string;
  dueDate: Date;
  value: string;
  receipt: string;
}

interface CreateBillModalProps {
  onRequestClose(): void;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Informe o título da sua conta'),
  dueDate: Yup.date().required('Selecione a data de vencimento da conta'),
  value: Yup.string()
    .required('campo obrigatório')
    .notOneOf(['0'], 'Valor da conta inválido'),
});

const CreateBillModal = ({
  onRequestClose,
}: CreateBillModalProps): JSX.Element => {
  const { handleCreateBill, loading } = useBill();
  const { customTheme } = useTheme();
  const { showAnimatedModalConfirmation, image } = useDocument();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const { control, handleSubmit, setValue, setError, reset } =
    useForm<FormProps>({
      defaultValues: {
        title: '',
        dueDate: new Date(),
        value: '0',
        receipt: image.uri,
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
    async ({ title, dueDate, value }: FormProps) => {
      if (!image) {
        setError('receipt', {
          message: 'Anexe o comprovante da conta',
          type: 'required',
        });
      }
      await handleCreateBill({
        title,
        dueDate,
        value: Number(value),
        receipt: image,
      });

      reset();
    },
    [handleCreateBill, setError, reset, image],
  );

  return (
    <Container>
      <Header label="Voltar" onRequestClose={onRequestClose} />
      <Scroll
        contentContainerStyle={{ height: Dimensions.get('screen').height }}
      >
        <Content>
          <Spacer size={32} />
          <CreateBillModalText>
            Cadastrar uma nova <TextEmphasized>conta</TextEmphasized>
          </CreateBillModalText>
          <Spacer size={32} />
          <View>
            <Controller
              name="title"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Título"
                  value={value}
                  placeholder="ex: Conta de água"
                  placeholderTextColor={
                    customTheme.palett.colors.text_primary_60
                  }
                  onChangeText={onChange}
                  error={error}
                />
              )}
            />
            <Spacer size={16} />
            <Controller
              name="value"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <InputMoney
                  label="valor"
                  prefix="R$"
                  onChangeText={(text, rawValue) => {
                    onChange(text);
                    setValue('value', rawValue);
                  }}
                  value={value}
                  error={error}
                />
              )}
            />
            <Spacer size={16} />
            <>
              <OpenDatePickerButton
                label="Data de vencimento"
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
            </>
            <Spacer size={16} />
            <Controller
              name="receipt"
              control={control}
              render={({ fieldState: { error } }) => (
                <DocumentPicker
                  label="comprovante"
                  onPress={showAnimatedModalConfirmation}
                  error={error}
                >
                  {image.uri ? image.uri : 'Anexe o comprovante'}
                </DocumentPicker>
              )}
            />
          </View>
          <Spacer size={64} />
          <Button loading={loading} onPress={handleSubmit(onSubmit)}>
            Criar conta
          </Button>
        </Content>
      </Scroll>
    </Container>
  );
};

export default CreateBillModal;
