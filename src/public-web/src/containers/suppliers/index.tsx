import React, { useState, useEffect, useCallback } from 'react';
import authgear from '@authgear/web';
import { FormattedMessage } from '@oursky/react-messageformat';
import { Map } from '../landing/components/Map';
import { Col, Grid, Text, Button, Stack } from '@mantine/core';
import { FeedContent } from '../landing/components/FeedContent';
import { OurVoicesTimeline } from '../landing/components/OurVoicesTimeline';
import { useStyles } from './style';

export const Suppliers: React.FC = () => {
  const [sessionState, setSessionState] = useState(authgear.sessionState);

  useEffect(() => {
    authgear.delegate = {
      onSessionStateChange: (container) => {
        setSessionState(container.sessionState);
      },
    };
    return () => {
      authgear.delegate = undefined;
    };
  }, []);

  const onClickSignIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const redirectURI = `${window.location.origin}/authgear`;
    authgear
      .startAuthorization({
        redirectURI,
        prompt: 'login',
        state: btoa(
          window.location.pathname +
            window.location.search +
            window.location.hash
        ),
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const { classes } = useStyles();

  if (sessionState === 'AUTHENTICATED') {
    return (
      <Grid className={classes.gridContainer} gutter={0}>
        <Col className={classes.feedContentContainer} span={12} md={4}>
          <FeedContent />
        </Col>
        <Col className={classes.mapContainer} span={12} md={8}>
          <Map />
        </Col>
        <Col span={12}>
          <OurVoicesTimeline className={classes.ourVoiceTimeline} />
        </Col>
      </Grid>
    );
  }

  if (sessionState === 'NO_SESSION') {
    return (
      <Grid className={classes.stackContainer}>
        <Col span={4} offset={4}>
          <Stack
            align="center"
            justify="center"
            className={classes.stackContainer}
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Button onClick={onClickSignIn}>
              <FormattedMessage id="suppliers_sign_in_button" />
            </Button>
          </Stack>
        </Col>
      </Grid>
    );
  }

  return null;
};
