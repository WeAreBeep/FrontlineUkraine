import React from 'react';
import { Radio, Textarea, TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterSuppliesForm } from '../../types';
import { ReactHookFormRadioGroup } from '../../../../components/ReactHookFormRadioGroup';
import { PpeTypeEnum } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';
import { useStyles } from '../../../requestPpe/components/PpeRequestSubForm/style';
import { VALIDATION_MSG } from '../../../../utils/validation';

interface Props {
  ppeType: PpeTypeEnum;
  shouldUnregister: boolean;
}

export const PpeSupplySubForm: React.FC<
  Props &
    Pick<
      UseFormReturn<RegisterSuppliesForm>,
      'control' | 'formState' | 'register' | 'watch'
    >
> = ({ ppeType, shouldUnregister, control, formState, register, watch }) => {
  const watchedCostType = watch(`ppeTypes.${ppeType}.costType`);
  const { errors } = formState;
  const { classes } = useStyles();
  return (
    <div>
      {ppeType === PpeTypeEnum.Other && (
        <TextInput
          {...register(`ppeTypes.${ppeType}.typeOther`, {
            required: { value: true, message: VALIDATION_MSG.required },
            shouldUnregister,
          })}
          className={classes.inputWrapper}
          label="PPE Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
        />
      )}
      <ReactHookFormRadioGroup
        control={control}
        name={`ppeTypes.${ppeType}.meetRegulations`}
        classNames={{ root: classes.inputWrapper }}
        rules={{
          required: { value: true, message: VALIDATION_MSG.required },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.meetRegulations?.message}
        required={true}
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
        name={`ppeTypes.${ppeType}.costType`}
        classNames={{ root: classes.inputWrapper }}
        rules={{
          required: { value: true, message: VALIDATION_MSG.required },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.costType?.message}
        label="Costs"
        description="How are you offering this type of PPE"
        variant="vertical"
      >
        <Radio value="Free">Free of Charge</Radio>
        <Radio value="Charged">Charged</Radio>
        <Radio value="Other">Other...</Radio>
      </ReactHookFormRadioGroup>
      {watchedCostType === 'Other' && (
        <Textarea
          label="Other Cost Type"
          description="Describe how are you offering this type of PPE"
          {...register(`ppeTypes.${ppeType}.costTypeOther`, {
            required: { value: true, message: VALIDATION_MSG.required },
            shouldUnregister,
          })}
          error={errors.ppeTypes?.[ppeType]?.costTypeOther?.message}
        />
      )}
      <ReactHookFormNumberInput
        name={`ppeTypes.${ppeType}.capacityPerWeek`}
        control={control}
        rules={{
          required: { value: true, message: VALIDATION_MSG.required },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.capacityPerWeek?.message}
        className={classes.inputWrapper}
        label="Capacity"
        description="How many units you can supply per week"
        min={0}
        max={100000000}
        step={1}
      />
      <ReactHookFormNumberInput
        name={`ppeTypes.${ppeType}.currentStock`}
        control={control}
        rules={{
          required: { value: true, message: VALIDATION_MSG.required },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.currentStock?.message}
        className={classes.inputWrapper}
        label="Current Stock"
        description="How many units are available immediately"
        min={0}
        max={100000000}
        step={1}
      />
      <ReactHookFormNumberInput
        name={`ppeTypes.${ppeType}.leadTimeInDays`}
        control={control}
        rules={{
          required: { value: true, message: VALIDATION_MSG.required },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.leadTimeInDays?.message}
        className={classes.inputWrapper}
        label="Lead Time"
        description="Lead times on production in days"
        min={0}
        max={1000}
        step={1}
      />
      <Textarea
        {...register(`ppeTypes.${ppeType}.notes`)}
        error={errors.ppeTypes?.[ppeType]?.notes?.message}
        className={classes.inputWrapper}
        label="Notes"
        description="Any additional notes"
      />
    </div>
  );
};
