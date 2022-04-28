import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { FieldError } from 'react-hook-form';
import TextError from '@shared/components/TextError';

const Container = styled.TouchableOpacity``;

export const InputText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.palett.colors.text_primary_60};
  line-height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0px ${({ theme }) => theme.screen.rem(1)}px;
`;

export const InputLabel = styled.Text`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Roboto_700Bold';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(0.5)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const TextInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  align-items: center;
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  border: 1px solid ${({ theme }) => theme.palett.colors.secondary_100};
  background: ${({ theme }) => theme.palett.colors.secondary_100};
`;

interface DocumentPickerProps extends TouchableOpacityProps {
  label?: string;
  error?: FieldError | undefined;
  children: string;
}

const DocumentPicker = ({
  label,
  children,
  error,
  ...rest
}: DocumentPickerProps): JSX.Element => {
  return (
    <Container {...rest}>
      {error && <TextError>{error.message}</TextError>}
      <InputLabel>{label}</InputLabel>
      <TextInputRow>
        <InputText>{children}</InputText>
      </TextInputRow>
    </Container>
  );
};

export default DocumentPicker;
