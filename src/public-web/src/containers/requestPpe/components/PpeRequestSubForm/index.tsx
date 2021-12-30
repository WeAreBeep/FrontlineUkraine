import React, { useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterRequestForm } from '../../types';
import { PpeType } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';

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
        description="We are a charity. Our supplies are limited. How many do you (and your team) really need to bridge the gap until supplies arrive?"
        min={0}
        max={100000000}
        step={1}
      />
      {ppeType !== PpeType.Other && (
        <TextInput
          description="How many people will this protect for how long?"
          {...register(`ppe.${ppeType}.dailyShortageForWhom`)}
        />
      )}
      {ppeType === PpeType.Other && (
        <TextInput
          label="PPE Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
          {...register(`ppe.${ppeType}.ppeTypeOther`, { required: true })}
        />
      )}
    </div>
  );
};
