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
import { SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeRequestSubForm } from './components/PpeRequestSubForm';
import { PPE_TYPES, PpeTypeName } from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import { defaultRegisterRequestForm, RegisterRequestForm } from './types';
import { VALIDATION_MSG } from '../../utils/validation';

export const RequestPpe: React.FC = () => {
  const { classes } = useStyles();
  const { register, control, watch, handleSubmit, formState } =
    useForm<RegisterRequestForm>({
      defaultValues: defaultRegisterRequestForm,
    });
  const { isSubmitting, errors } = formState;
  const handleValidSubmit: SubmitHandler<RegisterRequestForm> = useCallback(
    (data) => {
      console.log('submitting');
      console.log(data);
      console.log('TODO: submit the form');
    },
    []
  );
  const watchedPpe = watch('ppe');
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
          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Your Details</legend>
              <InputWrapper
                error={errors.publishAnonymously?.message}
                className={classes.inputWrapper}
                label="Publish Anonymously"
                description="Check this if you do not wish your name to be published on the Frontline Map"
              >
                <Switch
                  {...register('publishAnonymously', {
                    required: { value: true, message: VALIDATION_MSG.required },
                  })}
                  size="md"
                />
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
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppe.${ppeType}.need`)}
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
              loading={isSubmitting}
            >
              Save
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};
