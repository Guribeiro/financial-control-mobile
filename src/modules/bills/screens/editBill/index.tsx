import { View } from 'react-native';
import styled from 'styled-components/native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBillsParamsList, EditBillParams } from '@modules/bills/routes';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';

import { useEffect, useState } from 'react';
import EditProfileButton from '@modules/profile/components/EditProfileButton';
import { Bill, useBill } from '@modules/bills/hooks/bill';
import BillDate from '@modules/bills/components/BillDate';
import PaidAt from '@modules/bills/components/PaidAt';

import { useDocument } from '@shared/hooks/document';

export const TitleText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type EditBillScreenParams = NativeStackNavigationProp<
  RootBillsParamsList,
  'EditBill'
>;

const EditBill = (): JSX.Element => {
  const [bill, setBill] = useState<Bill>({} as Bill);
  const { bills } = useBill();
  const { navigate } = useNavigation<EditBillScreenParams>();
  const { params } = useRoute();

  const { image } = useDocument();

  const { bill_id } = params as EditBillParams;

  useEffect(() => {
    const findBill = bills.find(b => b.id === bill_id);

    if (!findBill) return;

    setBill(findBill);
  }, [bill_id, bills]);

  return (
    <Container>
      <Spacer size={32} />
      <TitleText>Atualizar conta</TitleText>
      <Spacer size={32} />
      <View>
        <EditProfileButton
          label="título"
          type="common"
          onPress={() =>
            navigate('EditBillTitle', {
              bill,
            })
          }
        >
          {bill.title}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="valor"
          type="common"
          onPress={() =>
            navigate('EditBillValue', {
              bill,
            })
          }
        >
          {bill.valueFormatted}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="data de vencimento"
          type="common"
          onPress={() =>
            navigate('EditBillDueDate', {
              bill,
            })
          }
        >
          {bill.dueDateFormatted}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="status"
          type="common"
          onPress={() =>
            navigate('EditBillStatus', {
              bill,
            })
          }
        >
          {bill.statusFormatted}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="comprovante"
          type="common"
          onPress={() =>
            navigate('ShowBillReceipt', {
              bill,
            })
          }
        >
          {bill.billReceipt ? bill.billReceipt.name : image.uri}
        </EditProfileButton>
      </View>
      <Spacer size={32} />
      <Row>
        <BillDate
          label="Adicionado em"
          dateFormatted={bill.createdAtFormatted}
        />
        <BillDate
          label="Atualizado em"
          dateFormatted={bill.updatedAtFormatted}
        />
        <BillDate label="Vencimento em" dateFormatted={bill.dueDateFormatted} />
      </Row>
      <Spacer size={16} />
      {bill.paidAtFormatted && (
        <PaidAt label="Pago em" dateFormatted={bill.paidAtFormatted} />
      )}
      <Spacer size={32} />
    </Container>
  );
};

export default EditBill;
