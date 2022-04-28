import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  flex: 1;

  padding: 0 ${({ theme }) => theme.screen.rem(0.625)}px 0;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
`;

export const CreateBillModalText = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: 'Roboto_500Medium';
`;

export const TextEmphasized = styled(CreateBillModalText)`
  color: ${({ theme }) => theme.palett.colors.blue};
`;

export const CloseModalButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palett.colors.red};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: ${({ theme }) => theme.screen.rem(1)}px 0;
  border-top-left-radius: ${({ theme }) => theme.screen.rem(0.8)}px;
  border-top-right-radius: ${({ theme }) => theme.screen.rem(0.8)}px;
`;

export const CloseModalButtonText = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: 'Roboto_500Medium';
  text-align: center;
`;
