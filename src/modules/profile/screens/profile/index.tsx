import { View } from 'react-native';
import styled from 'styled-components/native';

import EditProfileButton from '@modules/profile/components/EditProfileButton';
import Container from '@shared/components/Container';
import Spacer from '@shared/components/Spacer';
import Button from '@shared/components/Button';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileParamsList } from '@modules/profile/routes';

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: 'Roboto_500Medium';
`;

type ProfileScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'Profile'
>;

const Profile = (): JSX.Element => {
  const navigation = useNavigation<ProfileScreenProps>();

  const { docUser, handleSignOut, loading } = useAuthentication();

  const { name, email, phone } = docUser;

  return (
    <Container>
      <Spacer size={32} />
      <Text>Perfil do usuário</Text>
      <Spacer size={32} />
      <View>
        <EditProfileButton
          label="Nome completo"
          type="common"
          onPress={() => {
            navigation.navigate('EditName');
          }}
        >
          {name}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="Email"
          type="common"
          onPress={() => {
            navigation.navigate('EditEmailRoutes');
          }}
        >
          {email}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="Telefone"
          type="common"
          onPress={() => {
            navigation.navigate('EditPhone');
          }}
        >
          {phone}
        </EditProfileButton>
        <Spacer size={16} />
        <EditProfileButton
          label="Senha"
          type="common"
          onPress={() => {
            navigation.navigate('EditPasswordRoutes');
          }}
        >
          ********
        </EditProfileButton>
      </View>
      <Spacer size={64} />
      <Button loading={loading} onPress={handleSignOut}>
        Sair
      </Button>
      <Spacer size={128} />
    </Container>
  );
};

export default Profile;
