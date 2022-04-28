import styled from 'styled-components/native';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import NavigateButton from '@shared/components/NavigateButton';
import { RootSettingsParamsList } from '@modules/settings/routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: 'Roboto_500Medium';
`;

export type SettingsScreenProps = NativeStackNavigationProp<
  RootSettingsParamsList,
  'Settings'
>;

const Settings = (): JSX.Element => {
  const { navigate } = useNavigation<SettingsScreenProps>();
  return (
    <Container>
      <Spacer size={32} />
      <Text>Configurações</Text>
      <Spacer size={32} />
      <NavigateButton
        label="Tema"
        icon="color-palette"
        onPress={() => navigate('Theme')}
      />
    </Container>
  );
};

export default Settings;
