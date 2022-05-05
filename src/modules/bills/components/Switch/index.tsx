import { Container, Label, Row, Button, ButtonText } from './styles';

export interface Option {
  key: string;
  label: string;
  selected: boolean;
  onPress(): void;
}

interface SwitchProps {
  title: string;
  options: Array<Option>;
}

const Switch = ({ title, options }: SwitchProps): JSX.Element => {
  return (
    <Container>
      <Label>{title}</Label>
      <Row>
        {options.map(({ key, label, selected, onPress }) => (
          <Button key={key} selected={selected} onPress={onPress}>
            <ButtonText>{label}</ButtonText>
          </Button>
        ))}
      </Row>
    </Container>
  );
};

export default Switch;
