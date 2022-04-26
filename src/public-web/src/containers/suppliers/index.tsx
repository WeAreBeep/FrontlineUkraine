import React, { useCallback } from 'react';
import cx from 'classnames';
import authgear from '@authgear/web';
import { Map, MapRenderPopupType } from '../landing/components/Map';
import { Button, Col, Grid, Stack, Text } from '@mantine/core';
import { useSessionState } from '../../contexts/AuthgearContext';
import { useStyles } from './style';
import { RestrictedMapData } from '../../models/map';
import { useAPIContext } from '../../contexts/APIContext';
import { CategoryEnum } from '../landing/type';
import { MapSupplyPopup } from '../landing/components/MapSupplyPopup';
import { MapNeedPopup } from '../landing/components/MapNeedPopup';
import { PpeStatus } from '../../models/ppeStatus';

const renderMapPopup: MapRenderPopupType<RestrictedMapData> = (
  category,
  { recordType, recordId },
  recordMap
) => {
  if (category === CategoryEnum.Supply && recordType === 'supply') {
    return <MapSupplyPopup supply={recordMap[recordType][recordId]} />;
  }
  if (category !== CategoryEnum.Supply && recordType === 'need') {
    return (
      <MapNeedPopup
        need={recordMap[recordType][recordId]}
        allowStatuses={
          category === CategoryEnum.Need
            ? [PpeStatus.New, PpeStatus.InProgress, PpeStatus.NotMet]
            : [PpeStatus.Met]
        }
        variant={category}
      />
    );
  }
  return <></>;
};

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
          <Map<RestrictedMapData>
            fetchMapData={getMapData}
            renderPopup={renderMapPopup}
          />
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
