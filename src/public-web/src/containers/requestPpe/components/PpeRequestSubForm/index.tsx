import React, { useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterRequestForm } from '../../types';
import { PpeType } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';
import { useStyles } from './style';

interface Props {
  ppeType: PpeType;
}

export const PpeRequestSubForm: React.FC<
  Props &
    Pick<
      UseFormReturn<RegisterRequestForm>,
      'control' | 'register' | 'unregister'
    >
> = ({ ppeType, control, register, unregister }) => {
  const { classes } = useStyles();
  useEffect(() => {
    return () => {
      unregister(`ppe.${ppeType}.ppeTypeOther`);
      unregister(`ppe.${ppeType}.dailyShortageForWhom`);
    };
  }, [ppeType, unregister]);
  return (
    <div>
      <ReactHookFormNumberInput
        name={`ppe.${ppeType}.dailyShortage`}
        control={control}
        className={classes.inputWrapper}
        description="We are a charity. Our supplies are limited. How many do you (and your team) really need to bridge the gap until supplies arrive?"
        min={0}
        max={100000000}
        step={1}
      />
      {ppeType !== PpeType.Other && (
        <TextInput
          {...register(`ppe.${ppeType}.dailyShortageForWhom`)}
          className={classes.inputWrapper}
          description="How many people will this protect for how long?"
        />
      )}
      {ppeType === PpeType.Other && (
        <TextInput
          {...register(`ppe.${ppeType}.ppeTypeOther`, { required: true })}
          className={classes.inputWrapper}
          label="PPE Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
        />
      )}
    </div>
  );
};
