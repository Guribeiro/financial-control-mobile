import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: ${({ theme }) => theme.screen.rem(2.125)}px 0
    ${({ theme }) => theme.screen.rem(1.625)}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
  font-family: 'Roboto_400Regular';
  font-size: ${({ theme }) => theme.screen.rem(1.125)}px;
`;

export const Bar = styled.View`
  padding: 3px;
  background: ${({ theme }) => theme.palett.colors.blue};
  width: ${({ theme }) => theme.screen.rem(2.5)}px;
  margin-top: ${({ theme }) => theme.screen.rem(1.5)}px;
  border-radius: 2px;
`;

interface EditScreenLabelProps {
  children: string;
}

const EditScreenLabel = ({ children }: EditScreenLabelProps): JSX.Element => (
  <Container>
    <Label>{children}</Label>
    <Bar />
  </Container>
);

export default EditScreenLabel;
