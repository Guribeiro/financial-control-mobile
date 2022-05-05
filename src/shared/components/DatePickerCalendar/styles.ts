import styled from 'styled-components/native';
import { opacify } from 'polished';

export const Container = styled.View`
  flex: 1;
  position: absolute;
  background: ${({ theme }) =>
    opacify(0.1, `${theme.palett.colors.primary_60}`)};
  justify-content: flex-end;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.palett.colors.secondary_100};
`;

export const CloseCalendarButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palett.colors.red};
  padding: ${({ theme }) => theme.screen.rem(1, true)}px;
  justify-content: center;
  align-items: center;
`;
