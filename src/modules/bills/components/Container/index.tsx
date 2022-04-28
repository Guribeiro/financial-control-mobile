import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Scroll from '@modules/bills/components/Scroll';

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
`;

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled
  >
    <Scroll>
      <Content>{children}</Content>
    </Scroll>
  </KeyboardAvoidingView>
);

export default Container;
