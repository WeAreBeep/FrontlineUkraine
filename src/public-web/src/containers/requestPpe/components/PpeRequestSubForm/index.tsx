import React from 'react';
import { TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterRequestForm } from '../../types';
import { PpeType } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';
import { useStyles } from './style';
import { VALIDATION_MSG } from '../../../../utils/validation';

interface Props {
  ppeType: PpeType;
  shouldUnregister: boolean;
}

export const PpeRequestSubForm: React.FC<
  Props &
    Pick<
      UseFormReturn<RegisterRequestForm>,
      'control' | 'formState' | 'register'
    >
> = ({ ppeType, shouldUnregister, control, formState, register }) => {
  const { errors } = formState;
  const { classes } = useStyles();
  return (
    <div>
      <ReactHookFormNumberInput
        name={`ppe.${ppeType}.dailyShortage`}
        rules={{ required: { value: true, message: VALIDATION_MSG.required } }}
        control={control}
        error={errors.ppe?.[ppeType]?.dailyShortage?.message}
        className={classes.inputWrapper}
        description="We are a charity. Our supplies are limited. How many do you (and your team) really need to bridge the gap until supplies arrive?"
        min={0}
        max={100000000}
        step={1}
      />
      {ppeType !== PpeType.Other && (
        <TextInput
          {...register(`ppe.${ppeType}.dailyShortageForWhom`, {
            required: {
              value: true,
              message: VALIDATION_MSG.required,
            },
            shouldUnregister,
          })}
          error={errors.ppe?.[ppeType]?.dailyShortageForWhom?.message}
          className={classes.inputWrapper}
          description="How many people will this protect for how long?"
        />
      )}
      {ppeType === PpeType.Other && (
        <TextInput
          {...register(`ppe.${ppeType}.ppeTypeOther`, {
            required: { value: true, message: VALIDATION_MSG.required },
            shouldUnregister,
          })}
          error={errors.ppe?.[ppeType]?.ppeTypeOther?.message}
          className={classes.inputWrapper}
          label="PPE Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
        />
      )}
    </div>
  );
};
