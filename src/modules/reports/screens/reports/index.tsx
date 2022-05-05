import styled from 'styled-components/native';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import NavigateButton from '@shared/components/NavigateButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootReportsParamsList } from '@modules/reports/routes';

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: 'Roboto_500Medium';
`;

export const Chart = styled.View`
  align-items: center;
`;

type ReportsScreenProps = NativeStackNavigationProp<
  RootReportsParamsList,
  'Reports'
>;

const Reports = (): JSX.Element => {
  const { navigate } = useNavigation<ReportsScreenProps>();
  return (
    <Container>
      <Spacer size={32} />
      <Text>Relatórios</Text>
      <Spacer size={32} />
      <NavigateButton
        label="Relação de contas pagas e pendentes"
        icon="pie-chart"
        onPress={() => navigate('BillsPaidAndPending')}
      />
    </Container>
  );
};

export default Reports;
