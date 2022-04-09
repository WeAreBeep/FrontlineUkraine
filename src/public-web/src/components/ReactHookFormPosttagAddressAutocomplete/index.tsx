import React, { useCallback } from 'react';
import { Controller, FieldPath, UseControllerProps } from 'react-hook-form';
import {
  PosttagAddressAutocomplete,
  PosttagAddressAutocompleteProps,
} from '../PosttagAddressAutocomplete';

export function ReactHookFormPosttagAddressAutocomplete<
  TFV,
  TN extends FieldPath<TFV>
>(
  props: UseControllerProps<TFV, TN> &
    Omit<PosttagAddressAutocompleteProps, 'onChange'>
): ReturnType<React.FC> {
  const renderFn = useCallback(
    ({ field }) => <PosttagAddressAutocomplete {...props} {...field} />,
    [props]
  );
  return <Controller {...props} render={renderFn} />;
}
