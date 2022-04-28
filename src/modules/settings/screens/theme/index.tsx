import styled from 'styled-components/native';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import ThemeSwitcher from '@modules/settings/components/ThemeSwitcher';

export const Content = styled.View`
  height: 100%;
  flex: 1;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: 'Roboto_500Medium';
`;

export const HalfLightView = styled.View`
  background: ${({ theme }) => theme.palett.colors.text_primary_100};
  flex: 1;
  border: 1px solid red;
`;

export const HalfDarkView = styled.View`
  background: ${({ theme }) => theme.palett.colors.primary_100};
  flex: 1;
  border: 1px solid blue;
`;

const Theme = (): JSX.Element => {
  return (
    <Container>
      <Spacer size={32} />
      <Text>Tema</Text>
      <Spacer size={32} />
      <Content>
        <ThemeSwitcher />
      </Content>
    </Container>
  );
};

export default Theme;
