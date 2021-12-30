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
          <form>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Company Details</legend>
              <TextInput
                {...register('organisationName')}
                className={classes.inputWrapper}
                label="Organisation Name"
                description="Company or organisation name"
                required={true}
              />
              <TextInput
                {...register('description')}
                className={classes.inputWrapper}
                label="Description"
                description="Brief description of what your organisation does"
                required={true}
              />
              <ReactHookFormRadioGroup
                name="supplierType"
                control={control}
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
                  {...register('supplierTypeOther', { required: true })}
                  className={classes.inputWrapper}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Contact Details</legend>
              <TextInput
                {...register('email')}
                className={classes.inputWrapper}
                label="Email"
                description="Email address"
                required={true}
              />
              <TextInput
                {...register('website')}
                className={classes.inputWrapper}
                label="Website"
                description="Web address"
              />
              <TextInput
                {...register('phoneNumber')}
                className={classes.inputWrapper}
                label="Phone number"
                description="Phone number"
                required={true}
              />
              <TextInput
                {...register('contactName')}
                className={classes.inputWrapper}
                label="Contact Name"
                description="Name of person who deals with PPE enquiries"
                required={true}
              />
              <TextInput
                {...register('postcode')}
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
                required={true}
              >
                {PPE_TYPES.map((ppeType) => (
                  <div key={ppeType}>
                    <Switch
                      {...register(`ppe.${ppeType}.can`)}
                      className={classes.switchInput}
                      label={PpeTypeName[ppeType]}
                      size="md"
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
