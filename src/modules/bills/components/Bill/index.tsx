import Spacer from '@shared/components/Spacer';
import { TouchableOpacityProps, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useTheme } from '@shared/hooks/theme';
import BillDate from '../BillDate';

import {
  Container,
  Content,
  Status,
  StatusText,
  TitleText,
  ValueText,
} from './styles';

interface BillProps extends TouchableOpacityProps {
  id: string;
  title: string;
  status: 'pending' | 'paid';
  dueDateFormatted: string;
  valueFormatted: string;
}

const Bill = ({
  title,
  status,
  dueDateFormatted,
  valueFormatted,
  ...rest
}: BillProps): JSX.Element => {
  const { customTheme } = useTheme();

  interface StylesVariation {
    icon: keyof typeof Feather.glyphMap;
    color: string;
    text: string;
  }

  interface StatusVariation {
    pending: StylesVariation;
    paid: StylesVariation;
  }

  const statusVariation: StatusVariation = {
    pending: {
      icon: 'alert-circle',
      color: customTheme.palett.colors.orange,
      text: 'Pendente',
    },
    paid: {
      icon: 'check-circle',
      color: customTheme.palett.colors.green,
      text: 'Pago',
    },
  };

  return (
    <Container {...rest}>
      <Content>
        <View>
          <TitleText>{title}</TitleText>
          <Spacer size={16} />
          <ValueText>{valueFormatted}</ValueText>
        </View>

        <BillDate label="Vencimento" dateFormatted={dueDateFormatted} />
      </Content>
      <Status>
        <Feather
          name={statusVariation[status].icon}
          color={statusVariation[status].color}
          size={20}
        />
        <Spacer size={6} />
        <StatusText color={statusVariation[status].color}>
          {statusVariation[status].text}
        </StatusText>
      </Status>
    </Container>
  );
};

export default Bill;
