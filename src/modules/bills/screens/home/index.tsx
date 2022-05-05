import { View } from 'react-native';
import Container from '@modules/bills/components/Container';
import Header from '@modules/bills/components/Header';
import Spacer from '@shared/components/Spacer';
import RoundedButton from '@modules/bills/components/RoudedButton';
import { useTheme } from '@shared/hooks/theme';
import { RootBillsParamsList } from '@modules/bills/routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loading from '@shared/components/Loading';
import EmptyIndicator from '@shared/components/EmptyIndicator';
import Switch, { Option } from '@modules/bills/components/Switch';

import Bill from '@modules/bills/components/Bill';

import { useBill } from '@modules/bills/hooks/bill';
import DatePicker from '@modules/bills/components/DatePicker';

import { Content, Overview, Row, OverviewText, StatusText } from './styles';

interface StylesVariation {
  color: string;
  text: string;
}

interface StatusVariation {
  pending: StylesVariation;
  paid: StylesVariation;
  late: StylesVariation;
}

type HomeScreenParams = NativeStackNavigationProp<RootBillsParamsList, 'Home'>;

const Home = (): JSX.Element => {
  const { customTheme } = useTheme();
  const {
    bills,
    filterStatus,
    showCreateBillModal,
    handleSetStatus,
    loading,
    oderByDirection,
    handleSetOrderByDirection,
  } = useBill();

  const { navigate } = useNavigation<HomeScreenParams>();

  const statusVariation: StatusVariation = {
    pending: {
      color: customTheme.palett.colors.orange,
      text: 'Pendentes',
    },
    paid: {
      color: customTheme.palett.colors.green,
      text: 'Pagas',
    },
    late: {
      color: customTheme.palett.colors.red,
      text: 'Atrasadas',
    },
  };

  const options: Array<Option> = [
    {
      key: 'asc',
      label: 'Crescente',
      onPress: () => handleSetOrderByDirection('asc'),
      selected: oderByDirection === 'asc',
    },
    {
      key: 'desc',
      label: 'Decrescente',
      onPress: () => handleSetOrderByDirection('desc'),
      selected: oderByDirection === 'desc',
    },
  ];

  return (
    <Container>
      <Header />
      <Content>
        <Spacer size={24} />
        <Overview>
          <Row>
            <View>
              <OverviewText>Minhas contas</OverviewText>
              <Spacer size={24} />
              {filterStatus ? (
                <StatusText color={statusVariation[filterStatus].color}>
                  {statusVariation[filterStatus].text}
                </StatusText>
              ) : (
                <StatusText color={customTheme.palett.colors.text_primary_100}>
                  Todas
                </StatusText>
              )}
            </View>
            <DatePicker />
          </Row>

          <Spacer size={24} />
          <Row>
            <View>
              <RoundedButton
                label="Criar"
                name="plus-circle"
                size={customTheme.screen.rem(1, true)}
                color={customTheme.palett.colors.primary_100}
                iconColor={customTheme.palett.colors.blue}
                onPress={() => showCreateBillModal()}
              />
            </View>
            <Row>
              <RoundedButton
                label="Todas"
                name="globe"
                size={customTheme.screen.rem(1, true)}
                color={customTheme.palett.colors.primary_100}
                iconColor={customTheme.palett.colors.text_primary_100}
                onPress={() => handleSetStatus({ statusFilter: undefined })}
                selected={!filterStatus}
              />
              <Spacer size={16} horizontal />
              <RoundedButton
                label="Pagas"
                name="check-circle"
                size={customTheme.screen.rem(1, true)}
                color={customTheme.palett.colors.primary_100}
                iconColor={customTheme.palett.colors.green}
                onPress={() => handleSetStatus({ statusFilter: 'paid' })}
                selected={filterStatus === 'paid'}
              />
              <Spacer size={16} horizontal />
              <RoundedButton
                label="Pendentes"
                name="alert-circle"
                size={customTheme.screen.rem(1, true)}
                color={customTheme.palett.colors.primary_100}
                iconColor={customTheme.palett.colors.orange}
                onPress={() => handleSetStatus({ statusFilter: 'pending' })}
                selected={filterStatus === 'pending'}
              />
              <Spacer size={16} horizontal />
              <RoundedButton
                label="Atrasadas"
                name="x-circle"
                size={customTheme.screen.rem(1, true)}
                color={customTheme.palett.colors.primary_100}
                iconColor={customTheme.palett.colors.red}
                onPress={() => handleSetStatus({ statusFilter: 'late' })}
                selected={filterStatus === 'late'}
              />
            </Row>
          </Row>
        </Overview>
        <Spacer size={24} />
        <Switch title="Ordenação" options={options} />
        <Spacer size={24} />
        {loading ? (
          <Loading />
        ) : (
          bills.map(bill => (
            <View key={bill.id}>
              <Bill
                onPress={() =>
                  navigate('EditBill', {
                    bill_id: bill.id,
                  })
                }
                id={bill.id}
                title={bill.title}
                status={bill.status}
                dueDateFormatted={bill.dueDateFormatted}
                valueFormatted={bill.valueFormatted}
              />
              <Spacer size={16} />
            </View>
          ))
        )}
        {!bills.length && <EmptyIndicator />}
      </Content>
    </Container>
  );
};

export default Home;
