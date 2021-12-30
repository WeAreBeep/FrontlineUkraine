import React, { useCallback } from 'react';
import { Controller, FieldPath, UseControllerProps } from 'react-hook-form';
import { NumberInput, NumberInputProps } from '@mantine/core';

export function ReactHookFormNumberInput<TFV, TN extends FieldPath<TFV>>(
  props: UseControllerProps<TFV, TN> & Omit<NumberInputProps, 'onChange'>
): ReturnType<React.FC> {
  const renderFn = useCallback(
    ({ field }) => <NumberInput {...props} {...field} />,
    [props]
  );
  return <Controller {...props} render={renderFn} />;
}
