/* eslint-disable consistent-return */
import { View, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import * as Notifications from 'expo-notifications';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBillsParamsList, EditBillParams } from '@modules/bills/routes';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import Loading from '@shared/components/Loading';

import { useCallback, useEffect, useState } from 'react';
import EditProfileButton from '@modules/profile/components/EditProfileButton';
import { Bill, useBill } from '@modules/bills/hooks/bill';
import BillDate from '@modules/bills/components/BillDate';
import PaidAt from '@modules/bills/components/PaidAt';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { useTheme } from '@shared/hooks/theme';
import { useAlert } from '@shared/hooks/alert';

import { Feather } from '@expo/vector-icons';

import ConfirmDeleteModal from '@modules/bills/components/ConfirmDeleteModal';
import { deleteDoc, doc } from 'firebase/firestore';
import { database, storage } from '@shared/services/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = Dimensions.get('screen').height / 2;

  const [selectedBill, setSelectedBill] = useState<Bill>({} as Bill);
  const { bills } = useBill();
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation<EditBillScreenParams>();
  const { params } = useRoute();

  const { user } = useAuthentication();
  const { customTheme } = useTheme();
  const { alert } = useAlert();

  const { bill_id } = params as EditBillParams;

  const modalConfirmationOffset = useSharedValue(INITIAL_VALUE);
  const modalConfirmationOpacity = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: modalConfirmationOffset.value,
      opacity: modalConfirmationOpacity.value,
    };
  });

  useEffect(() => {
    setLoading(true);
    const findBill = bills.find(b => b.id === bill_id);

    if (!findBill) return;

    setSelectedBill(findBill);
    setLoading(false);
  }, [bill_id, bills]);

  const showConfirmDeleteBillModal = useCallback(() => {
    modalConfirmationOffset.value = withTiming(FINAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
    modalConfirmationOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, modalConfirmationOpacity, FINAL_VALUE]);

  const hideConfirmDeleteBillModal = useCallback(() => {
    modalConfirmationOffset.value = withTiming(INITIAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
    modalConfirmationOpacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [modalConfirmationOffset, modalConfirmationOpacity, INITIAL_VALUE]);

  const handleDeleteBill = useCallback(
    async (bill: Bill) => {
      try {
        setLoading(true);
        const userBillReceiptImageRef = ref(
          storage,
          `${user.uid}/receipts/${bill.billReceipt.filePath}`,
        );

        await deleteObject(userBillReceiptImageRef);

        await Notifications.cancelScheduledNotificationAsync(
          bill.notificationId,
        );

        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill.id,
        );

        await deleteDoc(docUserBillRef);

        navigate('Home');
      } catch (error) {
        const message = verifyCodeError(error);

        alert({
          message,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [user.uid, alert, navigate],
  );

  return (
    <Container>
      <Spacer size={32} />
      <Row>
        <TitleText>Atualizar conta</TitleText>
        <TouchableOpacity onPress={showConfirmDeleteBillModal}>
          <Feather
            name="trash-2"
            size={customTheme.screen.rem(1.5, true)}
            color={customTheme.palett.colors.red}
          />
        </TouchableOpacity>
      </Row>
      {loading ? (
        <>
          <Spacer size={32} />
          <Loading size="large" />
        </>
      ) : (
        <>
          <Spacer size={32} />
          <View>
            <EditProfileButton
              label="título"
              type="common"
              onPress={() =>
                navigate('EditBillTitle', {
                  bill: selectedBill,
                })
              }
            >
              {selectedBill.title}
            </EditProfileButton>
            <Spacer size={16} />
            <EditProfileButton
              label="valor"
              type="common"
              onPress={() =>
                navigate('EditBillValue', {
                  bill: selectedBill,
                })
              }
            >
              {selectedBill.valueFormatted}
            </EditProfileButton>
            <Spacer size={16} />
            <EditProfileButton
              label="data de vencimento"
              type="common"
              onPress={() =>
                navigate('EditBillDueDate', {
                  bill: selectedBill,
                })
              }
            >
              {selectedBill.dueDateFormatted}
            </EditProfileButton>
            <Spacer size={16} />
            <EditProfileButton
              label="status"
              type="common"
              onPress={() =>
                navigate('EditBillStatus', {
                  bill: selectedBill,
                })
              }
            >
              {selectedBill.statusFormatted}
            </EditProfileButton>
            <Spacer size={16} />
            <EditProfileButton
              label="comprovante"
              type="common"
              onPress={() =>
                navigate('ShowBillReceipt', {
                  bill: selectedBill,
                })
              }
            >
              {selectedBill.billReceipt && selectedBill.billReceipt.name}
            </EditProfileButton>
          </View>
          <Spacer size={32} />
          <Row>
            <BillDate
              label="Adicionado em"
              dateFormatted={selectedBill.createdAtFormatted}
            />
            <BillDate
              label="Atualizado em"
              dateFormatted={selectedBill.updatedAtFormatted}
            />
            <BillDate
              label="Vencimento em"
              dateFormatted={selectedBill.dueDateFormatted}
            />
          </Row>
          <Spacer size={16} />
          {selectedBill.paidAtFormatted && (
            <PaidAt
              label="Pago em"
              dateFormatted={selectedBill.paidAtFormatted}
            />
          )}
        </>
      )}

      <Spacer size={32} />
      <Animated.View
        style={[
          modalAnimatedStyle,
          { position: 'absolute', alignSelf: 'center' },
        ]}
      >
        <ConfirmDeleteModal
          onClose={hideConfirmDeleteBillModal}
          onPress={() => handleDeleteBill(selectedBill)}
        />
      </Animated.View>
    </Container>
  );
};

export default EditBill;
