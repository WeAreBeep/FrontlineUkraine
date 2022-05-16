import React from 'react';
import { Radio, Textarea, TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterSuppliesForm } from '../../types';
import { ReactHookFormRadioGroup } from '../../../../components/ReactHookFormRadioGroup';
import { isResourceTypeOther, PpeTypeEnum } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';
import { useStyles } from '../../../registerNeeds/components/PpeRequestSubForm/style';
import { VALIDATION_MSG } from '../../../../utils/validation';
import { useLocale } from '../../../../locale/LocaleProvider';

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
  const { renderToString } = useLocale();
  const watchedCostType = watch(`ppeTypes.${ppeType}.costType`);
  const { errors } = formState;
  const { classes } = useStyles();
  return (
    <div>
      {isResourceTypeOther(ppeType) && (
        <TextInput
          {...register(`ppeTypes.${ppeType}.typeOther`, {
            required: {
              value: true,
              message: VALIDATION_MSG.required(renderToString),
            },
            shouldUnregister,
          })}
          className={classes.inputWrapper}
          label="Resource Type Other"
          description={`If the list above does not fit choose "Other..." and describe here`}
        />
      )}
      <ReactHookFormRadioGroup
        control={control}
        name={`ppeTypes.${ppeType}.meetRegulations`}
        classNames={{ root: classes.inputWrapper }}
        rules={{
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.meetRegulations?.message}
        required={true}
        label="Meets Regulations"
        description={
          <span>
            Does this type of resource you supply meet the appropriate regulatory
            requirements? <br /> All resource must meet the required standards and
            will be tested before use by the NHS.
          </span>
        }
        orientation="vertical"
      >
        <Radio value="Yes" label="Yes" />
        <Radio value="No" label="No" />
        <Radio value="NotSure" label={<>I&apos;m not sure</>} />
      </ReactHookFormRadioGroup>
      <ReactHookFormRadioGroup
        control={control}
        name={`ppeTypes.${ppeType}.costType`}
        classNames={{ root: classes.inputWrapper }}
        rules={{
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.costType?.message}
        label="Costs"
        description="How are you offering this type of resource"
        orientation="vertical"
      >
        <Radio value="Free" label="Free of Charge" />
        <Radio value="Other" label="Other..." />
      </ReactHookFormRadioGroup>
      {watchedCostType === 'Other' && (
        <Textarea
          label="Other Cost Type"
          description="Describe how are you offering this type of resource"
          {...register(`ppeTypes.${ppeType}.costTypeOther`, {
            required: {
              value: true,
              message: VALIDATION_MSG.required(renderToString),
            },
            shouldUnregister,
          })}
          error={errors.ppeTypes?.[ppeType]?.costTypeOther?.message}
        />
      )}
      <ReactHookFormNumberInput
        name={`ppeTypes.${ppeType}.capacityPerWeek`}
        control={control}
        rules={{
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
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
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
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
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
          shouldUnregister,
        }}
        error={errors.ppeTypes?.[ppeType]?.leadTimeInDays?.message}
        className={classes.inputWrapper}
        label="Lead Time"
        description="Lead times on production in DAYS"
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
