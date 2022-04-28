import React from 'react';
import PickerSelect, {
  PickerSelectProps,
  PickerStyle,
} from 'react-native-picker-select';
import { FieldError } from 'react-hook-form';
import { useTheme } from '@shared/hooks/theme';
import TextError from '../TextError';

import { Label } from './styles';

export interface SelectItem {
  key: string;
  label: string;
  value: string | null;
}

type DropdownProps = {
  label?: string;
  required?: boolean;
  items: Array<SelectItem>;
  onValueChange: (value: string) => void;
  error?: FieldError | undefined;
} & Omit<PickerSelectProps, 'onValueChange'>;

export const Select = ({
  label,
  required,
  items,
  onValueChange,
  error,
  ...rest
}: DropdownProps): JSX.Element => {
  const { customTheme } = useTheme();

  const pickerStyle: PickerStyle = {
    inputAndroidContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: customTheme.screen.rem(1),
      height: customTheme.screen.rem(3.375),
      borderColor: customTheme.palett.colors.secondary_100,
      backgroundColor: customTheme.palett.colors.primary_100,
    },
    inputIOSContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: customTheme.screen.rem(1),
      height: customTheme.screen.rem(3.375),
      borderColor: customTheme.palett.colors.secondary_100,
      backgroundColor: customTheme.palett.colors.primary_100,
    },
    inputIOS: {
      color: customTheme.palett.colors.text_primary_60,
    },
    inputAndroid: {
      color: customTheme.palett.colors.text_primary_60,
    },
  };

  return (
    <>
      <Label>
        {label}
        {required && '*'}
      </Label>
      <PickerSelect
        placeholder={{}} // An empty object can be used if you'd like to disable the placeholder entirely
        style={pickerStyle}
        useNativeAndroidPickerStyle={false}
        onValueChange={onValueChange}
        items={items}
        {...rest}
      />
      {error && <TextError>{error.message}</TextError>}
    </>
  );
};

export default Select;
