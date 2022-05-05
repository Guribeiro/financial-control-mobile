import styled from 'styled-components/native';
import { VictoryPie } from 'victory-native';
import Spacer from '@shared/components/Spacer';
import ChartSubtitles from '@modules/reports/components/ChartSubtitles';

import { useTheme } from '@shared/hooks/theme';

const Container = styled.View`
  align-items: center;
`;

interface Data {
  label: string;
  color: '#ff8100' | '#63CCCA';
  count: number;
  total: number;
  value: number;
}

interface ChartProps {
  data: Array<Data>;
}

const Chart = ({ data }: ChartProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <VictoryPie
        data={data}
        x="label"
        y="value"
        colorScale={data.map(bill => bill.color)}
        innerRadius={customTheme.screen.rem(5)}
        padAngle={1}
        animate={{
          duration: 500,
          easing: 'bounce',
        }}
        style={{
          labels: {
            display: 'none',
          },
        }}
      />
      <ChartSubtitles items={data} />
      <Spacer size={32} />
    </Container>
  );
};

export default Chart;
