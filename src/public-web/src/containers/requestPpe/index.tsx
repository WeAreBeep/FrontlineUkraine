import React from 'react';
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
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeRequestSubForm } from './components/PpeRequestSubForm';
import { PPE_TYPES, PpeTypeName } from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import { defaultRegisterRequestForm, RegisterRequestForm } from './types';

export const RequestPpe: React.FC = () => {
  const { classes } = useStyles();
  const {
    register,
    unregister,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterRequestForm>({
    defaultValues: defaultRegisterRequestForm,
  });
  const watchedPpe = watch('ppe');
  const watchedOrgType = watch('orgType');
  return (
    <div className={classes.scrollContainer}>
      <Container>
        <h1>PPE Needs</h1>
        <section>
          <p>
            Complete this form if you don&apos;t use twitter or would prefer to
            report your PPE shortage anonymously.
          </p>
          <p>
            We&apos;ll put your need on the map and try to get equipment to you
            as quickly as possible.
          </p>
        </section>
        <section>
          <DevTool control={control} />
          <form>
            <fieldset>
              <legend>Your Details</legend>
              <InputWrapper
                label="Publish Anonymously"
                description="Check this if you do not wish your name to be published on the Frontline Map"
              >
                <Switch
                  {...register('publishAnonymously', { required: true })}
                />
              </InputWrapper>
              <TextInput
                {...register('contactName')}
                label="Your Name"
                description="If you tick 'Publish Anonymously' this will not be published on the website nor shared outside the Frontline team. If you don't leave your name, we will delivery PPE package to the department you entered."
              />
              <TextInput
                {...register('email')}
                label="Email"
                description="We need to contact you to confirm information and successful delivery."
                required={true}
              />
              <TextInput
                description="Phone number"
                label="Phone number"
                required={true}
                {...register('phoneNumber')}
              />
            </fieldset>
            <fieldset>
              <legend>PPE</legend>
              <InputWrapper
                label="Needs"
                description="Tick as many as apply"
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppe.${ppeType}.need`)}
                      label={PpeTypeName[ppeType]}
                    />
                    {watchedPpe[ppeType].need && (
                      <PpeRequestSubForm
                        ppeType={ppeType}
                        control={control}
                        register={register}
                        unregister={unregister}
                      />
                    )}
                  </div>
                ))}
              </InputWrapper>
            </fieldset>
            <fieldset>
              <legend>Organisation</legend>

              <TextInput
                {...register('organisationName')}
                label="Organisation Name"
                description="Organisation or Company name"
                required={true}
              />
              <ReactHookFormRadioGroup
                name="orgType"
                control={control}
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
                  {...register('orgTypeOther', { required: true })}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}

              <TextInput
                {...register('jobTitle')}
                label="Job Title"
                description="This will not be published on the site. It will be used for anonymous data reporting."
                required={true}
              />
              <TextInput
                {...register('department')}
                label="Department"
                description="This will not be published on the site. It will be used for anonymous data reporting."
                required={true}
              />
            </fieldset>
            <fieldset>
              <legend>Additional Details</legend>
              <TextInput
                {...register('addressLineOne', { required: true })}
                label="Address line 1"
                required={true}
              />
              <TextInput
                {...register('addressLineTwo')}
                label="Address line 2"
              />
              <TextInput
                {...register('postcode', { required: true })}
                label="Postcode"
                description="Will be added to the map to indicate location of your supplies"
                required={true}
              />
              <Textarea
                {...register('tellUsMore')}
                label="Tell Us More"
                description="Tell us more about how the shortage affects you"
              />
            </fieldset>
            <Button
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
