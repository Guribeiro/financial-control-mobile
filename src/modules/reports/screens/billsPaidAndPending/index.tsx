import styled from 'styled-components/native';
import Container from '@shared/components/Container';
import { useBill } from '@modules/bills/hooks/bill';
import Spacer from '@shared/components/Spacer';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@shared/hooks/theme';

import DatePicker from '@modules/bills/components/DatePicker';

import Chart from '@modules/reports/components/Chart';

import Switch, { Option } from '@modules/bills/components/Switch';

export const TitleText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

type ChartPropertyFocused = 'total' | 'count';

const BillsPaidAndPending = (): JSX.Element => {
  const { bills, handleSetStatus } = useBill();
  const { customTheme } = useTheme();

  const [chartPropertyFocused, setChartPropertyFocused] =
    useState<ChartPropertyFocused>('count');

  useEffect(() => {
    handleSetStatus({ statusFilter: undefined });
  }, [handleSetStatus]);

  const victoryPieData = useMemo(() => {
    const statusVariations = {
      paid: {
        label: 'Pagas',
        color: customTheme.palett.colors.green,
      },
      pending: {
        label: 'Pendentes',
        color: customTheme.palett.colors.orange,
      },
    };
    const balancedBills = bills.reduce(
      (accumulator, current) => {
        switch (current.status) {
          case 'paid':
            accumulator.paid.count += 1;
            accumulator.paid.total += current.value;

            break;
          case 'pending':
            accumulator.pending.count += 1;
            accumulator.pending.total += current.value;

            break;
          default:
        }
        return accumulator;
      },
      {
        paid: {
          count: 0,
          total: 0,
        },
        pending: {
          count: 0,
          total: 0,
        },
      },
    );

    return Object.keys(balancedBills).map(bill => {
      const key = bill as 'paid' | 'pending';
      return {
        label: statusVariations[key].label,
        color: statusVariations[key].color,
        count: balancedBills[key].count,
        total: balancedBills[key].total,
        value: balancedBills[key][chartPropertyFocused],
      };
    });
  }, [
    bills,
    customTheme.palett.colors.green,
    customTheme.palett.colors.orange,
    chartPropertyFocused,
  ]);

  const options: Array<Option> = [
    {
      key: '1',
      label: 'Total',
      selected: chartPropertyFocused === 'total',
      onPress: () => setChartPropertyFocused('total'),
    },
    {
      key: '2',
      label: 'Quantidade',
      selected: chartPropertyFocused === 'count',
      onPress: () => setChartPropertyFocused('count'),
    },
  ];

  return (
    <Container>
      <Spacer size={32} />
      <TitleText>Pagas e pendentes</TitleText>
      <DatePicker />
      <Switch options={options} title="Selecionar foco do gráfico" />
      <Chart data={victoryPieData} />
    </Container>
  );
};

export default BillsPaidAndPending;
