import React from 'react';
import { TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { RegisterRequestForm } from '../../types';
import { isResourceTypeOther, PpeTypeEnum } from '../../../../models/ppeType';
import { ReactHookFormNumberInput } from '../../../../components/ReactHookFormNumberInput';
import { useStyles } from './style';
import { VALIDATION_MSG } from '../../../../utils/validation';
import { FormattedMessage } from '../../../../locale/FormattedMessage';
import { useLocale } from '../../../../locale/LocaleProvider';

interface Props {
  ppeType: PpeTypeEnum;
  shouldUnregister: boolean;
}

export const PpeRequestSubForm: React.FC<
  Props &
    Pick<
      UseFormReturn<RegisterRequestForm>,
      'control' | 'formState' | 'register'
    >
> = ({ ppeType, shouldUnregister, control, formState, register }) => {
  const { renderToString } = useLocale();
  const { errors } = formState;
  const { classes } = useStyles();
  return (
    <div>
      <ReactHookFormNumberInput
        name={`ppeTypes.${ppeType}.dailyShortage`}
        rules={{
          required: {
            value: true,
            message: VALIDATION_MSG.required(renderToString),
          },
        }}
        control={control}
        error={errors.ppeTypes?.[ppeType]?.dailyShortage?.message}
        className={classes.inputWrapper}
        description={
          <FormattedMessage id="i_need_form_sub_form_how_many_you_need_title" />
        }
        min={0}
        max={100000000}
        step={1}
      />
      {isResourceTypeOther(ppeType) && (
        <TextInput
          {...register(`ppeTypes.${ppeType}.ppeTypeOther`, {
            required: {
              value: true,
              message: VALIDATION_MSG.required(renderToString),
            },
            shouldUnregister,
          })}
          error={errors.ppeTypes?.[ppeType]?.ppeTypeOther?.message}
          className={classes.inputWrapper}
          label={<FormattedMessage id="i_need_form_sub_form_other_title" />}
          description={
            <FormattedMessage id="i_need_form_sub_form_other_description" />
          }
        />
      )}
    </div>
  );
};
