import { TouchableOpacityProps } from 'react-native';
import Loading from '@shared/components/Loading';

import { Container, ButtonText } from './styles';

export type Type = 'common' | 'transparent';

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  type?: Type;
}

const Button = ({
  onPress,
  loading,
  type = 'common',
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Container type={type} onPress={onPress} {...rest}>
      {loading ? <Loading /> : <ButtonText>{children}</ButtonText>}
    </Container>
  );
};

export default Button;
