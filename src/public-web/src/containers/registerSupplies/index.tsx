import React, { useCallback } from 'react';
import { useStyles } from './style';
import {
  Container,
  InputWrapper,
  Radio,
  TextInput,
  Button,
  Switch,
  Text,
  List,
} from '@mantine/core';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeSupplySubForm } from './components/PpeSupplySubForm';
import {
  getDisplayNameMessageID,
  getPpeTypeEnumFromInt,
} from '../../models/ppeType';
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
import { useLocale } from '../../locale/LocaleProvider';
import { RESOURCE_GROUPS } from '../../constants/resourceGroup';
import { FormattedMessage } from '../../locale/FormattedMessage';
import { TransportType } from '../../models/transportType';
import { WHAT_3_WORDS_ADDRESS_PATTERN } from '../../constants/patterns';
import { W3WLocationInput } from '../../components/W3WLocationInput/W3WLocationInput';

export const RegisterSupplies: React.FC = () => {
  const { renderToString } = useLocale();
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
          'Thanks you have been added to the database, we will be in contact in due course. You will be redirected to home page in 10 seconds.',
        autoClose: 10000,
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
          // select at least one of the resource type.
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
        <h1 className={classes.header}>Supplies</h1>
        <section className={classes.section}>
          <List type="unordered">
            <List.Item>
              Complete the form below with your organisation&apos;s details.
            </List.Item>
            <List.Item>
              Please, <strong>tick</strong>, all the needs you can cover.
            </List.Item>
            <List.Item>Submit the form.</List.Item>
          </List>
          <p>
            <strong>Next</strong>
          </p>
          <List type="unordered">
            <List.Item>
              Our team of volunteers will contact you shortly over
              videocall/Zoom to verify your credentials (this step is for the
              safety of those we wish to support in Ukraine)
            </List.Item>
            <List.Item>
              Once verification is completed, you will receive a Login ID &
              password.
            </List.Item>
            <List.Item>
              Log-in to access the map of needs and other useful resources.
            </List.Item>
          </List>
          <p>Thank you for taking this journey and supporting those in need.</p>
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
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                })}
                error={errors.organisationName?.message}
                className={classes.inputWrapper}
                label="Organisation Name"
                description="Company or organisation name"
                required={true}
              />
              <TextInput
                {...register('description', {
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
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
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                }}
                error={errors.supplierType?.message}
                classNames={{ root: classes.inputWrapper }}
                orientation="vertical"
                label="Type"
                description="Which best describes your organisation?"
                required={true}
              >
                <Radio value="Manufacturer" label="Manufacturer/Supplier" />
                <Radio
                  value="AidOrganisationOrCharity"
                  label="Aid Organisation/Charity"
                />
                <Radio value="CommunityGroup" label="Community Group" />
                <Radio value="Other" label="Other..." />
              </ReactHookFormRadioGroup>
              {watchedSupplierType === 'Other' && (
                <TextInput
                  {...register('supplierTypeOther', {
                    required: {
                      value: true,
                      message: VALIDATION_MSG.required(renderToString),
                    },
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
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
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
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                })}
                error={errors.phoneNumber?.message}
                className={classes.inputWrapper}
                label="Phone number"
                description="Phone number"
                required={true}
              />
              <TextInput
                {...register('contactName', {
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                })}
                error={errors.contactName?.message}
                className={classes.inputWrapper}
                label="Contact Name"
                description="Name of person who deals with resource enquiries"
                required={true}
              />
              <W3WLocationInput
                {...register('postcode', {
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                  pattern: {
                    value: WHAT_3_WORDS_ADDRESS_PATTERN,
                    message: VALIDATION_MSG.what3wordsPattern(renderToString),
                  },
                })}
                error={errors.postcode?.message}
                className={classes.inputWrapper}
                label="what3words address"
                description="Will be added to the map to indicate location of your supplies"
                required={true}
              />
            </fieldset>
            {RESOURCE_GROUPS.map((group) => (
              <fieldset key={group.id} className={classes.fieldSet}>
                <legend className={classes.legend}>
                  <FormattedMessage id={group.name} />
                </legend>
                <Text size="sm">
                  <FormattedMessage id="i_have_form_fieldset_resourceCategory_title" />
                </Text>
                <Text size="xs" color="dimmed">
                  <FormattedMessage id="resourceCategory_defaultDescription_supply" />
                </Text>
                {group.type === 'node' &&
                  group.subGroups.map((subGroup) => (
                    <InputWrapper
                      key={`${group.id}_${subGroup.id}`}
                      label={<FormattedMessage id={subGroup.name} />}
                      className={classes.inputWrapper}
                      labelElement="div"
                      description={
                        subGroup.description && (
                          <FormattedMessage id={subGroup.description} />
                        )
                      }
                      // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
                      // select at least one of the resource type.
                      error={errors.ppeTypes?.AlcoholHandGel?.can?.message}
                    >
                      {subGroup.type === 'leaf' &&
                        subGroup.resourceTypes.map((resourceType) => {
                          const typeEnum = getPpeTypeEnumFromInt(
                            resourceType.id
                          );
                          if (typeEnum == null) return <></>;
                          return (
                            <div key={resourceType.id}>
                              <Switch
                                {...register(`ppeTypes.${typeEnum}.can`)}
                                className={classes.switchInput}
                                label={renderToString(
                                  getDisplayNameMessageID(typeEnum)
                                )}
                                size="md"
                              />
                              {watchedPpe[typeEnum].can && (
                                <PpeSupplySubForm
                                  ppeType={typeEnum}
                                  control={control}
                                  register={register}
                                  watch={watch}
                                  formState={formState}
                                  shouldUnregister={true}
                                />
                              )}
                            </div>
                          );
                        })}
                    </InputWrapper>
                  ))}
              </fieldset>
            ))}
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>Transport</legend>
              <ReactHookFormRadioGroup
                name="transportType"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: VALIDATION_MSG.required(renderToString),
                  },
                }}
                error={errors.transportType?.message}
                classNames={{ root: classes.inputWrapper }}
                orientation="vertical"
                label="Transport"
                description="Can you transport and deliver the supplies?"
                required={true}
              >
                <Radio value={TransportType.Yes} label="Yes" />
                <Radio value={TransportType.No} label="No" />
                <Radio value={TransportType.Other} label="Please specify" />
              </ReactHookFormRadioGroup>
              {watch('transportType') === TransportType.Other && (
                <TextInput
                  {...register('transportTypeOther', {
                    required: {
                      value: true,
                      message: VALIDATION_MSG.required(renderToString),
                    },
                    shouldUnregister: true,
                  })}
                  error={errors.transportTypeOther?.message}
                  className={classes.inputWrapper}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}
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
