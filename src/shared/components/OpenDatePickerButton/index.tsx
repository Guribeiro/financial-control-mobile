/* eslint-disable import/extensions */
import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '@shared/hooks/theme';

import { Feather } from '@expo/vector-icons';

import { Container, Button, Label, ButtonText } from './styles';

interface OpenDatePickerButtonProps
  extends Omit<TouchableOpacityProps, 'style'> {
  label: string;
  date: Date;
}

const OpenDatePickerButton = ({
  label,
  date,
  ...rest
}: OpenDatePickerButtonProps): JSX.Element => {
  const { customTheme } = useTheme();

  const dateFormatted = useMemo(() => {
    return format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    });
  }, [date]);

  return (
    <Container>
      <Label>{label}</Label>
      <Button {...rest}>
        <ButtonText>{dateFormatted}</ButtonText>
        <Feather
          name="chevron-down"
          size={customTheme.screen.rem(1.25, true)}
          color={customTheme.palett.colors.text_primary_100}
        />
      </Button>
    </Container>
  );
};

export default OpenDatePickerButton;
