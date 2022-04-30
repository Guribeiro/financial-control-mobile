import styled, { css } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Spacer from '@shared/components/Spacer';
import { useTheme } from '@shared/hooks/theme';

interface ContainerProps {
  disabled?: boolean | null | undefined;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
    `}
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(2)}px
    ${({ theme }) => theme.screen.rem(1)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.625)}px;
  border: 1px solid ${({ theme }) => theme.palett.colors.blue};
  background-color: ${({ theme }) => theme.palett.colors.secondary_100};
`;

interface ButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
}

export const Text = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

const PickDocumentButton = ({
  icon,
  label,
  disabled,
  ...rest
}: ButtonProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container disabled={disabled} {...rest}>
      <Feather
        size={customTheme.screen.rem(1.5, true)}
        color={customTheme.palett.colors.text_primary_100}
        name={icon}
      />
      <Spacer size={16} horizontal />
      <Text>{label}</Text>
    </Container>
  );
};

export default PickDocumentButton;
