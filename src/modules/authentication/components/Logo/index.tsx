import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LargeText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  font-family: 'Roboto_400Regular';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  margin-left: ${({ theme }) => theme.screen.rem(0.5)}px;
`;

export const TextEmphasized = styled(LargeText)`
  color: ${({ theme }) => theme.palett.colors.blue};
`;

const Logo = (): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <Container>
      <Feather
        name="dollar-sign"
        size={customTheme.screen.rem(4, true)}
        color={customTheme.palett.colors.blue}
      />
      <LargeText>
        Financial{'\n'}
        <TextEmphasized>Control</TextEmphasized>
      </LargeText>
    </Container>
  );
};

export default Logo;
