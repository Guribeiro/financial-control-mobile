import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputLabel,
  TextInputRow,
  AtSignContainer,
  InputText,
} from './styles';

interface EditProfileTextProps extends TouchableOpacityProps {
  label: string;
  children: string;
}

const Username = ({
  label,
  children,
  ...rest
}: EditProfileTextProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container {...rest}>
      <InputLabel>{label}</InputLabel>
      <TextInputRow>
        <AtSignContainer>
          <Ionicons
            name="at-outline"
            size={22}
            color={customTheme.palett.colors.text_primary_100}
          />
        </AtSignContainer>
        <InputText>{children}</InputText>
      </TextInputRow>
    </Container>
  );
};

export default Username;
