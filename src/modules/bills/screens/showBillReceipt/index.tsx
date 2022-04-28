import { Image } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Button from '@shared/components/Button';

import {
  ShowBillReceiptParams,
  RootBillsParamsList,
} from '@modules/bills/routes';

export const Container = styled.View`
  flex: 1;
`;

export const Footer = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.screen.rem(0.625)}px;
`;

type ShowBillReceiptScreenProps = NativeStackNavigationProp<
  RootBillsParamsList,
  'ShowBillReceipt'
>;

const ShowBillReceipt = (): JSX.Element => {
  const { params } = useRoute();
  const { navigate } = useNavigation<ShowBillReceiptScreenProps>();

  const { bill } = params as ShowBillReceiptParams;

  return (
    <Container>
      <Image
        style={{ flex: 1 }}
        resizeMode="contain"
        source={{
          uri: bill.billReceipt.downloadUrl,
        }}
      />
      <Footer>
        <Button
          onPress={() =>
            navigate('EditBillReceipt', {
              bill,
            })
          }
        >
          Alterar comprovante
        </Button>
      </Footer>
    </Container>
  );
};

export default ShowBillReceipt;
