import styled from 'styled-components/native';

export const Content = styled.View`
  padding: 0 ${({ theme }) => theme.screen.rem(0.625)}px 0;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Overview = styled.View``;

export const OverviewText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
  font-family: 'Roboto_500Medium';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

interface StatusTextProps {
  color: string;
}

export const StatusText = styled.Text<StatusTextProps>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: 'Roboto_500Medium';
`;
