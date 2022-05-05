import styled from 'styled-components/native';
import Spacer from '@shared/components/Spacer';
import { useMemo } from 'react';
import currencyFormatter from '@shared/utils/currencyFomatter';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface ContentProps {
  color: string;
}

const Content = styled.View<ContentProps>`
  padding: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  width: 45%;
  align-items: center;

  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.screen.rem(0.4, true)}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
  font-family: 'Roboto_700Bold';
  color: ${({ theme }) => theme.palett.colors.white};
`;

const Text = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: 'Roboto_700Bold';
  color: ${({ theme }) => theme.palett.colors.white};
`;

interface Item {
  label: string;
  color: string;
  count: number;
  total: number;
}

interface ChartSubtitlesProps {
  items: Array<Item>;
}

const ChartSubtitles = ({ items }: ChartSubtitlesProps): JSX.Element => {
  const itemsFormatted = useMemo(() => {
    return items.map(item => ({
      ...item,
      totalFormatted: currencyFormatter(item.total),
    }));
  }, [items]);

  return (
    <Container>
      {itemsFormatted.map(({ label, color, count, totalFormatted }) => (
        <Content key={label} color={color}>
          <Label>{label}</Label>
          <Spacer size={6} />
          <Row>
            <Text>Quantidade</Text>
            <Text>{count}</Text>
          </Row>
          <Spacer size={3} />
          <Row>
            <Text>Total</Text>
            <Text>{totalFormatted}</Text>
          </Row>
        </Content>
      ))}
    </Container>
  );
};

export default ChartSubtitles;
