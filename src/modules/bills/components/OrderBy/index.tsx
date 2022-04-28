import { useBill } from '@modules/bills/hooks/bill';
import { Container, Label, Row, Button, ButtonText } from './styles';

const OrderBy = (): JSX.Element => {
  const { oderByDirection, handleSetOrderByDirection } = useBill();
  return (
    <Container>
      <Label>Ordernação</Label>
      <Row>
        <Button
          selected={oderByDirection === 'asc'}
          onPress={() => handleSetOrderByDirection('asc')}
        >
          <ButtonText>Crescente</ButtonText>
        </Button>
        <Button
          selected={oderByDirection === 'desc'}
          onPress={() => handleSetOrderByDirection('desc')}
        >
          <ButtonText>Decrescente</ButtonText>
        </Button>
      </Row>
    </Container>
  );
};

export default OrderBy;
