import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useTheme } from '@shared/hooks/theme';
import { Container, CloseDrawerButton, Text, TextEmphasized } from './styles';

interface HeaderProps {
  navigation: DrawerNavigationHelpers;
}

const Header = ({ navigation }: HeaderProps): JSX.Element => {
  const { customTheme } = useTheme();
  const { closeDrawer } = navigation;
  const { userName } = useAuthentication();

  return (
    <Container>
      <Text>
        Olá, <TextEmphasized>{userName}</TextEmphasized>
      </Text>
      <CloseDrawerButton onPress={() => closeDrawer()}>
        <Feather
          name="x"
          size={24}
          color={customTheme.palett.colors.text_primary_100}
        />
      </CloseDrawerButton>
    </Container>
  );
};

export default Header;
