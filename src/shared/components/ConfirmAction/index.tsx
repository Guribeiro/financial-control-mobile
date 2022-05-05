import Spacer from '@shared/components/Spacer';
import { Container, Content, Text, Row, Button, ButtonText } from './styles';

interface ConfirmActionProps {
  onClose: () => void;
  onConfirm: () => void;
  label: string;
  cancelButtonText: string;
  confirmButtonText: string;
}

const ConfirmAction = ({
  label,
  cancelButtonText,
  confirmButtonText,
  onClose,
  onConfirm,
}: ConfirmActionProps): JSX.Element => {
  return (
    <Container>
      <Content>
        <Text>{label}</Text>
        <Spacer size={32} />
        <Row>
          <Button onPress={onClose} type="cancel">
            <ButtonText>{cancelButtonText}</ButtonText>
          </Button>
          <Spacer horizontal size={16} />
          <Button
            onPress={() => {
              onConfirm();
              onClose();
            }}
            type="confirm"
          >
            <ButtonText>{confirmButtonText}</ButtonText>
          </Button>
        </Row>
      </Content>
    </Container>
  );
};

export default ConfirmAction;
