import React, { useCallback } from 'react';
import cx from 'classnames';
import authgear from '@authgear/web';
import { Map } from '../landing/components/Map';
import { Col, Grid, Text, Button, Stack } from '@mantine/core';
import { useSessionState } from '../../contexts/AuthgearContext';
import { useStyles } from './style';
import { RestrictedMapData } from '../../models/map';
import { useAPIContext } from '../../contexts/APIContext';

export const Suppliers: React.FC = () => {
  const {
    actions: { getMapData },
  } = useAPIContext();
  const sessionState = useSessionState();

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
        <Col className={classes.mapContainer} span={12}>
          <Map<RestrictedMapData> fetchMapData={getMapData} />
        </Col>
      </Grid>
    );
  }

  if (sessionState === 'NO_SESSION') {
    return (
      <Grid className={cx(classes.stackContainer, classes.noSessionContent)}>
        <Col md={12} lg={4} offsetLg={4}>
          <Stack align="center" className={classes.stackContainer}>
            <h1 className={classes.heading}>Supplier Portal</h1>
            <Text className={classes.description}>
              If you are a verified supplier, please login to see the full map.
              <br />
              If you wish to sign up as an verified supplier, please contact{' '}
              <a href="mailto:hello@frontline.live">hello@frontline.live</a>
            </Text>
            <Button onClick={onClickSignIn}>Login to see the full map</Button>
          </Stack>
        </Col>
      </Grid>
    );
  }

  return null;
};
