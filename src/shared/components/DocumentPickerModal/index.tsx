import { Dimensions } from 'react-native';
import Spacer from '@shared/components/Spacer';
import Scroll from '@shared/components/Scroll';

import Header from '@shared/components/Header';

import PickDocumentButton from './PickerDocumentButton';

import {
  Container,
  Content,
  DocumentPickerText,
  TextEmphasized,
} from './styles';

interface DocumentPickerModalProps {
  onRequestClose(): void;
  onCamera(): void;
  onDocument(): void;
}

const DocumentPickerModal = ({
  onRequestClose,
  onCamera,
  onDocument,
}: DocumentPickerModalProps): JSX.Element => {
  return (
    <Container>
      <Header label="Voltar" onRequestClose={onRequestClose} />
      <Scroll
        contentContainerStyle={{ height: Dimensions.get('screen').height }}
      >
        <Content>
          <Spacer size={32} />
          <DocumentPickerText>
            De onde você gostaria de buscar o{' '}
            <TextEmphasized>comprovante</TextEmphasized> ?
          </DocumentPickerText>
          <Spacer size={32} />
          <PickDocumentButton
            icon="image"
            label="Galeria"
            onPress={() => {
              onDocument();
            }}
          />
          <Spacer size={16} />
          <PickDocumentButton icon="camera" label="Câmera" onPress={onCamera} />

          <Spacer size={64} />
        </Content>
      </Scroll>
    </Container>
  );
};

export default DocumentPickerModal;
