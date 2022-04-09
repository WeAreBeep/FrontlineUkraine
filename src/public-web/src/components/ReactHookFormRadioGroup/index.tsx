import React, { useCallback } from 'react';
import { Controller, FieldPath, UseControllerProps } from 'react-hook-form';
import { RadioGroup, RadioGroupProps } from '@mantine/core';

export function ReactHookFormRadioGroup<TFV, TN extends FieldPath<TFV>>(
  props: UseControllerProps<TFV, TN> & Omit<RadioGroupProps, 'onChange'>
): ReturnType<React.FC> {
  const renderFn = useCallback(
    ({ field }) => (
      <RadioGroup {...props} {...field}>
        {props.children}
      </RadioGroup>
    ),
    [props]
  );
  return <Controller {...props} render={renderFn} />;
}
