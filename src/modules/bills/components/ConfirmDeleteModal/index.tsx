import Spacer from '@shared/components/Spacer';
import { Container, Content, Text, Row, Button, ButtonText } from './styles';

interface ModalConfirmationProps {
  onClose: () => void;
  onPress: () => void;
}

const ConfirmDeleteModal = ({
  onClose,
  onPress,
}: ModalConfirmationProps): JSX.Element => {
  return (
    <Container>
      <Content>
        <Text>Deseja mesmo excluir essa conta ?</Text>
        <Spacer size={32} />
        <Row>
          <Button onPress={onClose} type="cancel">
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Spacer horizontal size={16} />
          <Button
            onPress={() => {
              onPress();
              onClose();
            }}
            type="confirm"
          >
            <ButtonText>Sim</ButtonText>
          </Button>
        </Row>
      </Content>
    </Container>
  );
};

export default ConfirmDeleteModal;
