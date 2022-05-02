/* eslint-disable consistent-return */
import { v4 } from 'uuid';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ImageInfo } from 'expo-image-picker';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { format, startOfMonth, endOfMonth, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as Notifications from 'expo-notifications';

import { scheduleNotification } from '@shared/utils/notifications';

import currencyFormatter from '@shared/utils/currencyFomatter';
import { useAlert } from '@shared/hooks/alert';
import { database, storage } from '@shared/services/firebase';

import {
  addDoc,
  doc,
  collection,
  Timestamp,
  onSnapshot,
  query,
  where,
  Query,
  DocumentData,
  updateDoc,
  deleteField,
  orderBy,
  OrderByDirection,
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { useDocument } from '@shared/hooks/document';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import { useCalendar } from './calendar';

import CreateBillModal from '../screens/createBill';

interface BillContextData {
  bills: Bills;
  loading: boolean;
  filterStatus: StatusState;
  oderByDirection: OrderByDirection;
  showCreateBillModal(): void;
  hideCreateBillModal(): void;
  handleSetStatus(props: HandleSetStatusProps): void;
  handleSetOrderByDirection(props: OrderByDirection): void;
  handleCreateBill(props: HandleCreateBillProps): Promise<void>;
  handleUpdateBillTitle(props: UpdateBillTitleProps): Promise<void>;
  handleUpdateBillValue(props: UpdateBillValueProps): Promise<void>;
  handleUpdateBillDueDate(props: UpdateBillDueDateProps): Promise<void>;
  handleUpdateBillStatus(props: UpdateBillStatusProps): Promise<void>;
  handleUpdateBillReceipt(props: HandleUpdateBillReceiptProps): Promise<void>;
}

interface BillProviderProps {
  children: ReactNode;
}

interface UpdateBill {
  bill_id: string;
}

interface HandleCreateBillProps {
  title: string;
  dueDate: Date;
  value: number;
  receipt: ImageInfo;
}

interface UpdateBillTitleProps extends UpdateBill {
  title: string;
  dueDate: Date;
  value: number;
  notificationId: string;
}

interface UpdateBillValueProps extends UpdateBill {
  value: string;
}

interface UpdateBillDueDateProps extends UpdateBill {
  dueDate: Date;
  title: string;
  value: number;
  notificationId: string;
}

interface UpdateBillStatusProps extends UpdateBill {
  status: 'pending' | 'paid';
  title: string;
  value: number;
  dueDate: Date;
  notificationId: string;
}

interface HandleUpdateBillReceiptProps extends UpdateBill {
  newReceipt: ImageInfo;
  currentReceipt: Receipt;
}

interface FirestoreBill {
  title: string;
  dueDate: Timestamp;
  value: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  status: 'pending' | 'paid';
  billReceipt: Receipt;
  notificationId: string;
}

export interface Bill {
  id: string;
  title: string;
  status: 'pending' | 'paid';
  dueDate: Date;
  dueDateFormatted: string;
  value: number;
  valueFormatted: string;
  statusFormatted: string;
  createdAt: Date;
  createdAtFormatted: string;
  updatedAtFormatted: string;
  paidAt?: Timestamp;
  paidAtFormatted?: string;
  billReceipt: Receipt;
  notificationId: string;
}

export interface Receipt {
  downloadUrl: string;
  name: string;
  filePath: string;
}

type StatusState = 'pending' | 'paid' | 'late' | undefined;

interface HandleSetStatusProps {
  statusFilter: StatusState;
}

type Bills = Array<Bill>;

const BillContext = createContext<BillContextData>({} as BillContextData);

const BillProvider = ({ children }: BillProviderProps): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState<Bills>([]);
  const [filterStatus, setFilterStatus] = useState<StatusState>();
  const [oderByDirection, setOrderByDirection] =
    useState<OrderByDirection>('asc');

  const { alert } = useAlert();

  const { markedDateAsDate } = useCalendar();

  const { user, docUser } = useAuthentication();

  const { handleClearSelectedReceipt } = useDocument();

  const billModalOffset = useSharedValue(INITIAL_VALUE);

  const createBillModalStyle = useAnimatedStyle(() => {
    return {
      bottom: billModalOffset.value,
    };
  });

  useEffect(() => {
    const loadBills = async () => {
      try {
        setLoading(true);
        if (!user.uid) return;

        const userBillsCollectionRef = collection(
          database,
          'users',
          user.uid,
          'bills',
        );

        let onSnapshotQuery: Query<DocumentData>;

        const startOfMonthDate = startOfMonth(markedDateAsDate);
        const endOfMonthDate = endOfMonth(markedDateAsDate);

        const todayDate = new Date();

        switch (filterStatus) {
          case 'paid':
            onSnapshotQuery = query(
              userBillsCollectionRef,
              where('status', '==', filterStatus),
              where('dueDate', '>=', startOfMonthDate),
              where('dueDate', '<=', endOfMonthDate),
              orderBy('dueDate', oderByDirection),
            );
            break;
          case 'pending':
            onSnapshotQuery = query(
              userBillsCollectionRef,
              where('status', '==', filterStatus),
              where('dueDate', '>=', startOfMonthDate),
              where('dueDate', '<=', endOfMonthDate),
              orderBy('dueDate', oderByDirection),
            );
            break;
          case 'late':
            onSnapshotQuery = query(
              userBillsCollectionRef,
              where('status', '==', 'pending'),
              where('dueDate', '>=', startOfMonthDate),
              where('dueDate', '<', todayDate),
              orderBy('dueDate', oderByDirection),
            );
            break;
          default:
            onSnapshotQuery = query(
              userBillsCollectionRef,
              where('dueDate', '>=', startOfMonthDate),
              where('dueDate', '<=', endOfMonthDate),
              orderBy('dueDate', oderByDirection),
            );
        }

        const unsubscribe = onSnapshot(onSnapshotQuery, querySnapshot => {
          const billsDocsArray: Bills = [];

          querySnapshot.forEach(queryDoc => {
            const billDocData = queryDoc.data() as FirestoreBill;

            const dueDateFormatted = format(
              billDocData.dueDate.toDate(),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              },
            );

            const createdAtFormatted = format(
              billDocData.createdAt.toDate(),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              },
            );

            const updatedAtFormatted = format(
              billDocData.updatedAt.toDate(),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              },
            );

            let paidAtFormatted;

            if (billDocData.paidAt) {
              paidAtFormatted = format(
                billDocData.paidAt.toDate(),
                'dd/MM/yyyy',
              );
            } else {
              paidAtFormatted = undefined;
            }

            const valueFormatted = currencyFormatter(billDocData.value);

            const statusVariations = {
              pending: 'Pendente',
              paid: 'Pago',
            };

            const dueDate = billDocData.dueDate.toDate();
            const createdAt = billDocData.dueDate.toDate();

            const statusFormatted = statusVariations[billDocData.status];

            const billFormatted: Bill = {
              ...billDocData,
              id: queryDoc.id,
              dueDateFormatted,
              valueFormatted,
              statusFormatted,
              createdAtFormatted,
              updatedAtFormatted,
              dueDate,
              createdAt,
              paidAtFormatted,
            };

            billsDocsArray.push(billFormatted);
          });
          setBills(billsDocsArray);
        });

        return () => unsubscribe();
      } catch (error) {
        const message = verifyCodeError(error);
        alert({
          message,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    loadBills();
  }, [user.uid, filterStatus, alert, oderByDirection, markedDateAsDate]);

  const showCreateBillModal = useCallback(() => {
    billModalOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [billModalOffset, FINAL_VALUE]);

  const hideCreateBillModal = useCallback(() => {
    billModalOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
    handleClearSelectedReceipt();
  }, [INITIAL_VALUE, billModalOffset, handleClearSelectedReceipt]);

  const handleSetStatus = useCallback(
    ({ statusFilter }: HandleSetStatusProps) => {
      setFilterStatus(statusFilter);
    },
    [],
  );

  const handleSetOrderByDirection = useCallback(
    (direction: OrderByDirection) => {
      setOrderByDirection(direction);
    },
    [],
  );

  const handleCreateBill = useCallback(
    async ({ title, dueDate, value, receipt }: HandleCreateBillProps) => {
      try {
        setLoading(true);

        const todayDate = new Date();

        const notificationId = await scheduleNotification({
          content: {
            title: `Heeey, ${docUser.name}`,
            body: `Não se esqueça, a ${title} vence hoje`,
            sound: true,
            data: {
              title,
              value,
            },
          },
          trigger: {
            seconds: 60,
            date: dueDate,
          },
        });

        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = e => {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', receipt.uri, true);
          xhr.send(null);
        });

        const uuid = v4();

        const filePath = `${uuid}-${new Date().toISOString()}`;

        const userReceiptImagesRef = ref(
          storage,
          `${user.uid}/receipts/${filePath}`,
        );

        const { ref: storageRef } = await uploadBytes(
          userReceiptImagesRef,
          blob,
        );

        const downloadUrl = await getDownloadURL(storageRef);

        const billReceipt: Receipt = {
          downloadUrl,
          name: receipt.uri,
          filePath,
        };

        const userBillsCollectionRef = collection(
          database,
          'users',
          user.uid,
          'bills',
        );

        await addDoc(userBillsCollectionRef, {
          title,
          value,
          status: 'pending',
          billReceipt,
          notificationId,
          dueDate: Timestamp.fromDate(dueDate),
          createdAt: Timestamp.fromDate(todayDate),
          updatedAt: Timestamp.fromDate(todayDate),
        });

        alert({
          message: 'conta criada com sucesso',
          type: 'success',
        });

        hideCreateBillModal();
      } catch (error) {
        console.log(error);
        const message = verifyCodeError(error);

        alert({
          message,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [user, alert, hideCreateBillModal, docUser.name],
  );

  const handleUpdateBillTitle = useCallback(
    async ({
      bill_id,
      title,
      dueDate,
      value,
      notificationId,
    }: UpdateBillTitleProps) => {
      try {
        setLoading(true);

        const startOfDueDate = startOfDay(dueDate);

        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill_id,
        );

        await Notifications.cancelScheduledNotificationAsync(notificationId);

        const newNotificationId = await scheduleNotification({
          content: {
            title: `Heeey, ${docUser.name}`,
            body: `Não se esqueça, a sua ${title} vence hoje`,
            sound: true,
            data: {
              title,
              value,
            },
          },
          trigger: {
            date: startOfDueDate,
          },
        });

        await updateDoc(docUserBillRef, {
          title,
          notificationId: newNotificationId,
          updatedAt: Timestamp.fromDate(new Date()),
        });
        alert({
          message: 'Campo atualizado com sucesso',
          type: 'success',
        });
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
    [user.uid, alert],
  );

  const handleUpdateBillValue = useCallback(
    async ({ bill_id, value }: UpdateBillValueProps) => {
      try {
        setLoading(true);
        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill_id,
        );

        await updateDoc(docUserBillRef, {
          value: Number(value),
          updatedAt: Timestamp.fromDate(new Date()),
        });

        alert({
          message: 'Campo atualizado com sucesso',
          type: 'success',
        });
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
    [user.uid, alert],
  );

  const handleUpdateBillDueDate = useCallback(
    async ({
      bill_id,
      dueDate,
      title,
      value,
      notificationId,
    }: UpdateBillDueDateProps) => {
      try {
        setLoading(true);

        const startOfDueDate = startOfDay(dueDate);

        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill_id,
        );

        await Notifications.cancelScheduledNotificationAsync(notificationId);

        const newNotificationId = await scheduleNotification({
          content: {
            title: `Heeey, ${docUser.name}`,
            body: `Não se esqueça, a sua ${title} vence hoje`,
            sound: true,
            data: {
              title,
              value,
            },
          },
          trigger: {
            date: startOfDueDate,
          },
        });

        await updateDoc(docUserBillRef, {
          notificationId: newNotificationId,
          dueDate: Timestamp.fromDate(dueDate),
          updatedAt: Timestamp.fromDate(new Date()),
        });

        alert({
          message: 'Campo atualizado com sucesso',
          type: 'success',
        });
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
    [user.uid, alert, docUser.name],
  );

  const handleUpdateBillStatus = useCallback(
    async ({
      bill_id,
      status,
      title,
      value,
      dueDate,
      notificationId,
    }: UpdateBillStatusProps) => {
      try {
        setLoading(true);

        const startOfDueDate = startOfDay(dueDate);
        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill_id,
        );

        await Notifications.cancelScheduledNotificationAsync(notificationId);

        if (status === 'paid') {
          await updateDoc(docUserBillRef, {
            status,
            updatedAt: Timestamp.fromDate(new Date()),
            paidAt: Timestamp.fromDate(new Date()),
          });
        } else {
          const newNotificationId = await scheduleNotification({
            content: {
              title: `Heeey, ${docUser.name}`,
              body: `Não se esqueça, a sua ${title} vence hoje`,
              sound: true,
              data: {
                title,
                value,
              },
            },
            trigger: {
              date: startOfDueDate,
            },
          });

          await updateDoc(docUserBillRef, {
            status,
            notificationId: newNotificationId,
            updatedAt: Timestamp.fromDate(new Date()),
            paidAt: deleteField(),
          });
        }

        alert({
          message: 'Campo atualizado com sucesso',
          type: 'success',
        });
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
    [user.uid, alert, docUser.name],
  );

  const handleUpdateBillReceipt = useCallback(
    async ({
      bill_id,
      newReceipt,
      currentReceipt,
    }: HandleUpdateBillReceiptProps) => {
      try {
        setLoading(true);

        if (!newReceipt.uri) {
          throw new Error('Por favor, anexe o comprovante da conta');
        }

        const lastUserReceiptImageRef = ref(
          storage,
          `${user.uid}/receipts/${currentReceipt.filePath}`,
        );

        await deleteObject(lastUserReceiptImageRef);

        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = e => {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', newReceipt.uri, true);
          xhr.send(null);
        });

        const uuid = v4();

        const filePath = `${uuid}-${newReceipt.uri}`;

        const userReceiptImagesRef = ref(
          storage,
          `${user.uid}/receipts/${filePath}`,
        );

        const { ref: storageRef } = await uploadBytes(
          userReceiptImagesRef,
          blob,
        );

        const downloadUrl = await getDownloadURL(storageRef);

        const billReceipt: Receipt = {
          downloadUrl,
          name: newReceipt.uri,
          filePath,
        };

        const docUserBillRef = doc(
          database,
          'users',
          user.uid,
          'bills',
          bill_id,
        );

        await updateDoc(docUserBillRef, {
          billReceipt,
          updatedAt: Timestamp.fromDate(new Date()),
        });
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
    [alert, user.uid],
  );

  return (
    <BillContext.Provider
      value={{
        bills,
        loading,
        filterStatus,
        oderByDirection,
        showCreateBillModal,
        hideCreateBillModal,
        handleCreateBill,
        handleSetStatus,
        handleSetOrderByDirection,
        handleUpdateBillTitle,
        handleUpdateBillValue,
        handleUpdateBillDueDate,
        handleUpdateBillStatus,
        handleUpdateBillReceipt,
      }}
    >
      {children}

      <Animated.View
        style={[
          createBillModalStyle,
          { height: '100%', width: '100%', position: 'absolute' },
        ]}
      >
        <CreateBillModal onRequestClose={hideCreateBillModal} />
      </Animated.View>
    </BillContext.Provider>
  );
};

function useBill(): BillContextData {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBill should be used within an BillProvider');
  }
  return context;
}

export { BillProvider, useBill };
