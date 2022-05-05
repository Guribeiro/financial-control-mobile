import React from 'react';
import styled from 'styled-components/native';
import AnimatedLottieView from 'lottie-react-native';
import lottieDeleteSuccessAnimation from '../../assets/lottie/delete-success.json';

const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.palett.colors.primary_100};
`;

const DeleteSuccess = (): JSX.Element => (
  <Container>
    <AnimatedLottieView
      autoPlay
      loop
      resizeMode="contain"
      source={lottieDeleteSuccessAnimation}
      style={{ height: 200 }}
    />
  </Container>
);

export default DeleteSuccess;
