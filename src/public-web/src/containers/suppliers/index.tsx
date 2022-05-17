import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import authgear from '@authgear/web';
import { Map, MapRenderPopupType } from '../landing/components/Map';
import { Anchor, Button, Col, Grid, List, Stack } from '@mantine/core';
import { useSessionState } from '../../contexts/AuthgearContext';
import { useStyles } from './style';
import { RestrictedMapData } from '../../models/map';
import { useAPIContext } from '../../contexts/APIContext';
import { CategoryEnum } from '../landing/type';
import { MapSupplyPopup } from '../landing/components/MapSupplyPopup';
import { MapNeedPopup } from '../landing/components/MapNeedPopup';
import { PpeStatus } from '../../models/ppeStatus';
import { useSearchParams } from 'react-router-dom';

const renderMapPopup: MapRenderPopupType<RestrictedMapData> = (
  category,
  { recordType, recordId },
  recordMap
) => {
  if (category === CategoryEnum.Supply && recordType === 'supply') {
    return <MapSupplyPopup supply={recordMap[recordType][recordId]}/>;
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
  const [searchParams] = useSearchParams();

  const focus = useMemo(() => {
    const lat = parseFloat(searchParams.get('lat') ?? '');
    const lng = parseFloat(searchParams.get('lng') ?? '');
    const zoom = parseFloat(searchParams.get('zoom') ?? '');
    return !isNaN(lat) && !isNaN(lat) ? { lat, lng, zoom: isNaN(zoom) ? undefined : zoom } : null;
  }, [searchParams]);

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
            focus={focus}
          />
        </Col>
      </Grid>
    );
  }

  if (sessionState === 'NO_SESSION') {
    return (
      <Grid className={cx(classes.stackContainer, classes.noSessionContent)}>
        <Col md={12} lg={6} offsetLg={3}>
          <Stack align="center" className={classes.stackContainer}>
            <h1 className={classes.heading}>Supplier Portal</h1>
            <h2>How to login</h2>
            <List type="ordered">
              <List.Item>First, please fill in the <Anchor href="/register-supplies">I HAVE FORM</Anchor> &
                Submit</List.Item>
              <List.Item>A volunteer will contact you shortly (within 24hrs) over video call.</List.Item>
              <List.Item>Once verification is completed you will receive your LOG IN credentials.</List.Item>
              <List.Item>On the SUPPLIERS’ portal, enter your email and the password sent to you by our
                team.</List.Item>
              <List.Item>You will be asked to set up 2FA. Feel free to use any 2FA app you have. If you haven’t used a
                2FA app before, we suggest using <Anchor href="https://authy.com/download/" target="_blank">
                  <strong>Authy</strong>
                </Anchor>.</List.Item>
              <List.Item>Fire up your 2FA app to scan the QR code, then you will get a 6-digit number.</List.Item>
              <List.Item>Enter the 6-digit number to login. Now you can access the needs map.</List.Item>
              <List.Item>2FA is required for every. login. This is for the safety of all those we wish to
                support.</List.Item>
            </List>
            <Button onClick={onClickSignIn}>Login to see the full map</Button>
          </Stack>
        </Col>
      </Grid>
    );
  }

  return null;
};
