import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '@shared/hooks/theme';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(0.75, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

export const TextEmphasized = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.blue};
`;

const Logo = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <Feather
        name="dollar-sign"
        size={24}
        color={customTheme.palett.colors.blue}
      />
      <Text>
        Financial{'\n'}
        <TextEmphasized>control</TextEmphasized>
      </Text>
    </Container>
  );
};

export default Logo;
