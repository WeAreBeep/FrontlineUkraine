import React from 'react';
import { Radio, Textarea, TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterSuppliesForm } from '../../types';
import { ReactHookFormRadioGroup } from '../../../../components/ReactHookFormRadioGroup';
import { PpeType } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';

interface Props {
  ppeType: PpeType;
}

export const PpeSupplySubForm: React.FC<
  Props & Pick<UseFormReturn<RegisterSuppliesForm>, 'control' | 'register'>
> = ({ ppeType, control, register }) => {
  return (
    <div>
      {ppeType === PpeType.Other && (
        <TextInput
          {...register(`ppe.${ppeType}.typeOther`, { required: true })}
          label="PPE Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
        />
      )}
      <ReactHookFormRadioGroup
        control={control}
        name={`ppe.${ppeType}.meetRegulations`}
        label="Meets Regulations"
        description={
          <span>
            Does this type of PPE you supply meet the appropriate regulatory
            requirements? <br /> All PPE must meet the required standards and
            will be tested before use by the NHS.
          </span>
        }
        variant="vertical"
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
        <Radio value="NotSure">I&apos;m not sure</Radio>
      </ReactHookFormRadioGroup>
      <ReactHookFormRadioGroup
        control={control}
        name={`ppe.${ppeType}.costType`}
        label="Costs"
        description="How are you offering this type of PPE"
        variant="vertical"
      >
        <Radio value="Free">Free of Charge</Radio>
        <Radio value="Charged">Charged</Radio>
        <Radio value="Other">Other...</Radio>
        <Textarea
          label="Other Cost Type"
          description="Describe how are you offering this type of PPE"
          {...register(`ppe.${ppeType}.costTypeOther`)}
        />
      </ReactHookFormRadioGroup>
      <ReactHookFormNumberInput
        name={`ppe.${ppeType}.capacityPerWeek`}
        control={control}
        label="Capacity"
        description="How many units you can supply per week"
        min={0}
        max={100000000}
        step={1}
      />
      <ReactHookFormNumberInput
        name={`ppe.${ppeType}.currentStock`}
        control={control}
        label="Current Stock"
        description="How many units are available immediately"
        min={0}
        max={100000000}
        step={1}
      />
      <ReactHookFormNumberInput
        name={`ppe.${ppeType}.leadTimeInDays`}
        control={control}
        label="Lead Time"
        description="Lead times on production in days"
        min={0}
        max={1000}
        step={1}
      />
      <Textarea
        {...register(`ppe.${ppeType}.notes`)}
        label="Notes"
        description="Any additional notes"
      />
    </div>
  );
};
