import React, { useCallback, useState } from 'react';
import {
  ActionIcon,
  Button,
  MediaQuery,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { W3WModal } from './W3WModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mantine/hooks';
import { tabletConstraint } from '../../utils/mantine';
import { FormattedMessage } from '../../locale/FormattedMessage';
import { useStyles } from './style';

export const W3WLocationInput: React.ForwardRefExoticComponent<TextInputProps> =
  React.forwardRef<HTMLInputElement, TextInputProps>(
    (props: TextInputProps, ref) => {
      const { classes } = useStyles();
      const theme = useMantineTheme();
      const [opened, setOpened] = useState(false);
      const isTablet = useMediaQuery(tabletConstraint(theme));
      const openDialog = useCallback(() => setOpened(true), []);
      const closeDialog = useCallback(() => setOpened(false), []);

      return (
        <>
          <TextInput
            ref={ref}
            {...props}
            rightSection={
              <>
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                  <ActionIcon
                    className={classes.getW3wButton}
                    size={props.size}
                    onClick={openDialog}
                  >
                    <FontAwesomeIcon icon={['fas', 'location-crosshairs']} />
                  </ActionIcon>
                </MediaQuery>

                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                  <Button className={classes.getW3wButton} size={props.size} onClick={openDialog}>
                    <FormattedMessage id="i_need_form_fieldset_additional_details_field_postcode_get_what3words_btn_title" />
                  </Button>
                </MediaQuery>
              </>
            }
            rightSectionWidth={isTablet ? 205 : 31}
          />
          <W3WModal size="full" opened={opened} onClose={closeDialog} />
        </>
      );
    }
  );
