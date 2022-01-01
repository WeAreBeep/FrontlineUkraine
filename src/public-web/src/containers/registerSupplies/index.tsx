import React, { useCallback } from 'react';
import { useStyles } from './style';
import {
  Container,
  InputWrapper,
  Radio,
  TextInput,
  Button,
  Switch,
} from '@mantine/core';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeSupplySubForm } from './components/PpeSupplySubForm';
import { PPE_TYPES, PpeTypeName } from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import { defaultRegisterSuppliesForm, RegisterSuppliesForm } from './types';
import { VALIDATION_MSG } from '../../utils/validation';
import {
  APIError,
  isSchemaValidationErrorData,
  useAPIContext,
} from '../../contexts/APIContext';
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export const RegisterSupplies: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const notification = useNotifications();
  const {
    actions: { createSupply },
  } = useAPIContext();
  const { register, control, watch, handleSubmit, formState, setError } =
    useForm<RegisterSuppliesForm>({
      defaultValues: defaultRegisterSuppliesForm,
    });
  const { isSubmitting, errors, isSubmitSuccessful } = formState;
  const handleValidSubmit: SubmitHandler<RegisterSuppliesForm> = useCallback(
    async (data) => {
      await createSupply(data);
      notification.showNotification({
        color: 'flGreen',
        title: 'Save Successful',
        message:
          'Thanks you have been added to the database, we will be in contact in due course. You will be redirected to home page in 5 seconds.',
        autoClose: 5000,
        onClose: () => {
          navigate('/');
        },
      });
    },
    [createSupply, navigate, notification]
  );
  const handleSubmitError = useCallback(
    (e: APIError) => {
      console.error(e);
      const data = e.data;
      if (!isSchemaValidationErrorData(data)) {
        notification.showNotification({
          color: 'red',
          title: 'Cannot save supply',
          message: 'Unexpected error occurred. Please try again.',
          autoClose: 5000,
        });
        return;
      }
      data.detail.forEach((fieldError) => {
        const { loc, msg, type } = fieldError;
        let key = loc[loc.length - 1] as FieldPath<RegisterSuppliesForm>;
        if (key === 'ppeTypes') {
          // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
          // select at least one of the PPE type.
          key = 'ppeTypes.AlcoholHandGel.can';
        }
        setError(key, {
          message: msg,
          type: type,
        });
      });
      notification.showNotification({
        color: 'red',
        title: 'Cannot save supply',
        message: 'Problems saving details, please fix and try again.',
        autoClose: 5000,
      });
    },
    [notification, setError]
  );
  const watchedPpe = watch('ppeTypes');
  const watchedSupplierType = watch('supplierType');

  return (
    <div className={classes.scrollContainer}>
      <Container>
        <h1 className={classes.header}>PPE Supplies</h1>
        <section className={classes.section}>
          <p>
            Use this form so we can add you to our collated database of
            suppliers
          </p>
          <p>
            Email{' '}
            <a href="mailto:frontline@wearebeep.com">frontline@wearebeep.com</a>{' '}
            to tell us about:
          </p>
          <ul>
            <li>any needs you have met: so we can remove them from the map</li>
            <li>any stories of supplying needs: so we can raise awareness</li>
          </ul>
          <p>Thank you!</p>
        </section>
        <section className={classes.section}>
          <DevTool control={control} />
          <form
            onSubmit={async (e) =>
              handleSubmit(handleValidSubmit)(e).catch(handleSubmitError)
            }
          >
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Company Details</legend>
              <TextInput
                {...register('organisationName', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.organisationName?.message}
                className={classes.inputWrapper}
                label="Organisation Name"
                description="Company or organisation name"
                required={true}
              />
              <TextInput
                {...register('description', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.description?.message}
                className={classes.inputWrapper}
                label="Description"
                description="Brief description of what your organisation does"
                required={true}
              />
              <ReactHookFormRadioGroup
                name="supplierType"
                control={control}
                rules={{
                  required: { value: true, message: VALIDATION_MSG.required },
                }}
                error={errors.supplierType?.message}
                classNames={{ root: classes.inputWrapper }}
                variant="vertical"
                label="Type"
                description="Which best describes your organisation?"
                required={true}
              >
                <Radio value="ExistingPPEsupplier">
                  PPE manufacturer/supplier (pre-COVID-19)
                </Radio>
                <Radio value="AdaptedPPEsupplier">
                  Manufacturer/supplier adapted to make PPE in response to
                  COVID-19
                </Radio>
                <Radio value="Individuals">
                  Individual/group of individuals
                </Radio>
                <Radio value="Other">Other...</Radio>
              </ReactHookFormRadioGroup>
              {watchedSupplierType === 'Other' && (
                <TextInput
                  {...register('supplierTypeOther', {
                    required: { value: true, message: VALIDATION_MSG.required },
                    shouldUnregister: true,
                  })}
                  error={errors.supplierTypeOther?.message}
                  className={classes.inputWrapper}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Contact Details</legend>
              <TextInput
                {...register('email', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.email?.message}
                className={classes.inputWrapper}
                label="Email"
                description="Email address"
                required={true}
              />
              <TextInput
                {...register('website')}
                error={errors.website?.message}
                className={classes.inputWrapper}
                label="Website"
                description="Web address"
              />
              <TextInput
                {...register('phoneNumber', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.phoneNumber?.message}
                className={classes.inputWrapper}
                label="Phone number"
                description="Phone number"
                required={true}
              />
              <TextInput
                {...register('contactName', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.contactName?.message}
                className={classes.inputWrapper}
                label="Contact Name"
                description="Name of person who deals with PPE enquiries"
                required={true}
              />
              <TextInput
                {...register('postcode', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.postcode?.message}
                className={classes.inputWrapper}
                label="Postcode"
                description="Will be added to the map to indicate location of your supplies"
                required={true}
              />
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>PPE</legend>
              <InputWrapper
                className={classes.inputWrapper}
                label="What You Can Supply"
                description="Tick as many as apply"
                // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
                // select at least one of the PPE type.
                error={errors.ppeTypes?.AlcoholHandGel?.can?.message}
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppeTypes.${ppeType}.can`)}
                      className={classes.switchInput}
                      label={PpeTypeName[ppeType]}
                      size="md"
                    />
                    {watchedPpe[ppeType].can && (
                      <PpeSupplySubForm
                        ppeType={ppeType}
                        control={control}
                        register={register}
                        watch={watch}
                        formState={formState}
                        shouldUnregister={true}
                      />
                    )}
                  </div>
                ))}
              </InputWrapper>
            </fieldset>
            <Button
              className={classes.submitBtn}
              variant="filled"
              type="submit"
              color="blue"
              disabled={isSubmitSuccessful}
              loading={isSubmitting}
            >
              {isSubmitSuccessful ? 'Saved!' : 'Save'}
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};
