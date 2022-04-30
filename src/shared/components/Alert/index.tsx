import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Type } from '@shared/hooks/alert';
import Spacer from '@shared/components/Spacer';
import { useTheme } from '@shared/hooks/theme';

import { Container, Content, Message, Row } from './styles';

interface AlertProps {
  message: string;
  type?: Type;
  onClose: () => void;
}

const TContainer = styled(TouchableOpacity)``;

type FeatherIcons = keyof typeof Feather.glyphMap;

interface TouchableProps extends TouchableOpacityProps {
  icon: FeatherIcons;
}

const Touchable = ({ icon, ...rest }: TouchableProps): JSX.Element => {
  const { customTheme } = useTheme();
  return (
    <TContainer {...rest}>
      <Feather
        name={icon}
        color={customTheme.palett.colors.text_primary_100}
        size={customTheme.screen.rem(1.375, true)}
      />
    </TContainer>
  );
};

const Alert = ({ message, type, onClose }: AlertProps): JSX.Element => {
  const { customTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => onClose(), 3000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <Container>
      <Content type={type}>
        <Row>
          <Feather
            name="alert-octagon"
            color={customTheme.palett.colors.text_primary_100}
            size={customTheme.screen.rem(1.375, true)}
          />
          <Spacer size={16} horizontal />
          <Message>{message}</Message>
        </Row>
        <Touchable icon="x" onPress={onClose} />
      </Content>
    </Container>
  );
};

export default Alert;
