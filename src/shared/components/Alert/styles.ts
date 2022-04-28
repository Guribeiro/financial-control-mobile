import styled from 'styled-components/native';
import { Type } from '@shared/hooks/alert';

const alertColorsVariation = {
  error: '#ff595e',
  success: '#63ccca',
  info: '#4381c1',
  warning: '#FFA027',
};

interface HeaderProps {
  type?: Type;
}

export const Container = styled.View`
  align-items: center;
  padding: 0 ${({ theme }) => theme.screen.rem(0.625)}px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Content = styled.View<HeaderProps>`
  padding: 16px;
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ type }) => alertColorsVariation[type || 'info']};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(0.8)}px;
  line-height: ${({ theme }) => theme.screen.rem(1.2)}px;
  color: ${({ theme }) => theme.palett.colors.white};
  letter-spacing: 1px;
  font-family: 'Roboto_400Regular';
  max-width: ${({ theme }) => theme.screen.rem(15.75)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
