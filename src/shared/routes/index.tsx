import styled from 'styled-components/native';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import AuthenticationRoutes from '@modules/authentication/routes';
import DrawerRoutes from './drawer';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
`;

const AppRoutes = (): JSX.Element => {
  const { user } = useAuthentication();
  return (
    <Container>
      {user.uid ? <DrawerRoutes /> : <AuthenticationRoutes />}
    </Container>
  );
};

export default AppRoutes;
