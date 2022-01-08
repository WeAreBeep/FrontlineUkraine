import React, { useCallback } from 'react';
import { useStyles } from './style';
import {
  Container,
  InputWrapper,
  Radio,
  TextInput,
  Button,
  Textarea,
  Switch,
} from '@mantine/core';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeRequestSubForm } from './components/PpeRequestSubForm';
import { PPE_TYPES, PpeTypeName } from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import { defaultRegisterRequestForm, RegisterRequestForm } from './types';
import { VALIDATION_MSG } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@mantine/notifications';
import {
  APIError,
  isSchemaValidationErrorData,
  useAPIContext,
} from '../../contexts/APIContext';

export const RequestPpe: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const notification = useNotifications();
  const {
    actions: { createRequest },
  } = useAPIContext();
  const { register, control, watch, handleSubmit, formState, setError } =
    useForm<RegisterRequestForm>({
      defaultValues: defaultRegisterRequestForm,
    });
  const { isSubmitting, errors, isSubmitSuccessful } = formState;
  const handleValidSubmit: SubmitHandler<RegisterRequestForm> = useCallback(
    async (data) => {
      await createRequest(data);
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
    [createRequest, navigate, notification]
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
        let key = loc[loc.length - 1] as FieldPath<RegisterRequestForm>;
        if (key === 'ppeTypes') {
          // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
          // select at least one of the PPE type.
          key = 'ppeTypes.AlcoholHandGel.need';
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
  const watchedOrgType = watch('orgType');
  return (
    <div className={classes.scrollContainer}>
      <Container>
        <h1 className={classes.header}>PPE Needs</h1>
        <section className={classes.section}>
          <p>
            Complete this form if you don&apos;t use twitter or would prefer to
            report your PPE shortage anonymously.
          </p>
          <p>
            We&apos;ll put your need on the map and try to get equipment to you
            as quickly as possible.
          </p>
        </section>
        <section className={classes.section}>
          <DevTool control={control} />
          <form
            onSubmit={async (e) =>
              handleSubmit(handleValidSubmit)(e).catch(handleSubmitError)
            }
          >
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Your Details</legend>
              <InputWrapper
                error={errors.publishAnonymously?.message}
                className={classes.inputWrapper}
                label="Publish Anonymously"
                description="Check this if you do not wish your name to be published on the Frontline Map"
              >
                <Switch {...register('publishAnonymously')} size="md" />
              </InputWrapper>
              <TextInput
                {...register('contactName')}
                error={errors.contactName?.message}
                className={classes.inputWrapper}
                label="Your Name"
                description="If you tick 'Publish Anonymously' this will not be published on the website nor shared outside the Frontline team. If you don't leave your name, we will delivery PPE package to the department you entered."
              />
              <TextInput
                {...register('email', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.email?.message}
                className={classes.inputWrapper}
                type="email"
                label="Email"
                description="We need to contact you to confirm information and successful delivery."
                required={true}
              />
              <TextInput
                {...register('phoneNumber', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.phoneNumber?.message}
                className={classes.inputWrapper}
                type="tel"
                label="Phone number"
                description="Phone number"
                required={true}
              />
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>PPE</legend>
              <InputWrapper
                label="Needs"
                className={classes.inputWrapper}
                description="Tick as many as apply"
                // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
                // select at least one of the PPE type.
                error={errors.ppeTypes?.AlcoholHandGel?.need?.message}
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppeTypes.${ppeType}.need`)}
                      className={classes.switchInput}
                      label={PpeTypeName[ppeType]}
                      size="md"
                    />
                    {watchedPpe[ppeType].need && (
                      <PpeRequestSubForm
                        ppeType={ppeType}
                        control={control}
                        register={register}
                        formState={formState}
                        shouldUnregister={true}
                      />
                    )}
                  </div>
                ))}
              </InputWrapper>
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Organisation</legend>
              <TextInput
                {...register('organisationName', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.organisationName?.message}
                className={classes.inputWrapper}
                label="Organisation Name"
                description="Organisation or Company name"
                required={true}
              />
              <ReactHookFormRadioGroup
                name="orgType"
                control={control}
                rules={{
                  required: { value: true, message: VALIDATION_MSG.required },
                }}
                error={errors.orgType?.message}
                classNames={{ root: classes.inputWrapper }}
                variant="vertical"
                label="Type"
                description="Which best describes your organisation?"
                required={true}
              >
                <Radio value="NhsHospital">NHS Hospital</Radio>
                <Radio value="CareHome">Care Home</Radio>
                <Radio value="GpSurgery">GP Surgery</Radio>
                <Radio value="PrivateHospital">Private Hospital</Radio>
                <Radio value="ShelteredHousing">Sheltered Housing</Radio>
                <Radio value="CivicInfrastructure">Civic Infrastructure</Radio>
                <Radio value="Dentists">Dentists</Radio>
                <Radio value="Other">Other...</Radio>
              </ReactHookFormRadioGroup>
              {watchedOrgType === 'Other' && (
                <TextInput
                  {...register('orgTypeOther', {
                    required: { value: true, message: VALIDATION_MSG.required },
                    shouldUnregister: true,
                  })}
                  error={errors.orgTypeOther?.message}
                  className={classes.inputWrapper}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}

              <TextInput
                {...register('jobTitle', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.jobTitle?.message}
                className={classes.inputWrapper}
                label="Job Title"
                description="This will not be published on the site. It will be used for anonymous data reporting."
                required={true}
              />
              <TextInput
                {...register('department', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.department?.message}
                className={classes.inputWrapper}
                label="Department"
                description="This will not be published on the site. It will be used for anonymous data reporting."
                required={true}
              />
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Additional Details</legend>
              <TextInput
                {...register('addressLineOne', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.addressLineOne?.message}
                className={classes.inputWrapper}
                label="Address line 1"
                required={true}
              />
              <TextInput
                {...register('addressLineTwo')}
                error={errors.addressLineTwo?.message}
                className={classes.inputWrapper}
                label="Address line 2"
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
              <Textarea
                {...register('tellUsMore')}
                error={errors.tellUsMore?.message}
                className={classes.inputWrapper}
                label="Tell Us More"
                description="Tell us more about how the shortage affects you"
              />
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
