import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: ${({ theme }) => theme.screen.rem(0.5)}px;
  background-color: ${({ theme }) => theme.palett.colors.secondary_100};
  overflow: hidden;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(0.625)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const TitleText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

export const ValueText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.blue};
`;

export const Status = styled.View`
  width: ${({ theme }) => theme.screen.rem(5)}px;
  background-color: ${({ theme }) =>
    lighten(0.1, theme.palett.colors.primary_100)};
  align-items: center;
  justify-content: center;
`;

interface StatusTextProps {
  color: string;
}

export const StatusText = styled.Text<StatusTextProps>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
`;
