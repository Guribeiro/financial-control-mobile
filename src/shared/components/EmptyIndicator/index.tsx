import React from 'react';
import styled from 'styled-components/native';
import AnimatedLottieView from 'lottie-react-native';
import lottieEmptyAnimation from '../../assets/lottie/empty.json';

const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
`;

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
  font-family: 'Roboto_500Medium';
  color: ${({ theme }) => theme.palett.colors.text_primary_100};
`;

const EmptyIndicator = (): JSX.Element => (
  <Container>
    <AnimatedLottieView
      autoPlay
      loop
      resizeMode="contain"
      source={lottieEmptyAnimation}
      speed={0.5}
      style={{ height: 200 }}
    />
    <Text>Parece que não há nada por aqui</Text>
  </Container>
);

export default EmptyIndicator;
