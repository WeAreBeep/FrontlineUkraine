import React from 'react';
import { useStyles } from './style';
import {
  Container,
  InputWrapper,
  Radio,
  TextInput,
  Button,
  Switch,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeSupplySubForm } from './components/PpeSupplySubForm';
import { PPE_TYPES, PpeTypeName } from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import { defaultRegisterSuppliesForm, RegisterSuppliesForm } from './types';

export const RegisterSupplies: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { classes } = useStyles();
  const {
    register,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterSuppliesForm>({
    defaultValues: defaultRegisterSuppliesForm,
  });
  const watchedPpe = watch('ppe');
  const watchedSupplierType = watch('supplierType');
  return (
    <div className={classes.scrollContainer}>
      <Container>
        <h1>PPE Supplies</h1>
        <section>
          <p>
            Use this form so we can add you to our collated database of
            suppliers
          </p>
          <p>Email frontline@wearebeep.com to tell us about:</p>
          <ul>
            <li>any needs you have met: so we can remove them from the map</li>
            <li>any stories of supplying needs: so we can raise awareness</li>
          </ul>
          <p>Thank you!</p>
        </section>
        <section>
          <DevTool control={control} />
          <form>
            <fieldset>
              <legend>Company Details</legend>
              <TextInput
                description="Company or organisation name"
                label="Organisation Name"
                required={true}
                {...register('organisationName')}
              />
              <TextInput
                description="Brief description of what your organisation does"
                label="Description"
                required={true}
                {...register('description')}
              />
              <ReactHookFormRadioGroup
                name="supplierType"
                control={control}
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
                  {...register('supplierTypeOther', { required: true })}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}
            </fieldset>
            <fieldset>
              <legend>Contact Details</legend>
              <TextInput
                description="Email address"
                label="Email"
                required={true}
                {...register('email')}
              />
              <TextInput
                description="Web address"
                label="Website"
                {...register('website')}
              />
              <TextInput
                description="Phone number"
                label="Phone number"
                required={true}
                {...register('phoneNumber')}
              />
              <TextInput
                description="Name of person who deals with PPE enquiries"
                label="Contact Name"
                required={true}
                {...register('contactName')}
              />
              <TextInput
                description="Will be added to the map to indicate location of your supplies"
                label="Postcode"
                required={true}
                {...register('postcode')}
              />
            </fieldset>
            <fieldset>
              <legend>PPE</legend>
              <InputWrapper
                label="What You Can Supply"
                description="Tick as many as apply"
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppe.${ppeType}.can`)}
                      label={PpeTypeName[ppeType]}
                    />
                    {watchedPpe[ppeType].can && (
                      <PpeSupplySubForm
                        ppeType={ppeType}
                        control={control}
                        register={register}
                      />
                    )}
                  </div>
                ))}
              </InputWrapper>
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
