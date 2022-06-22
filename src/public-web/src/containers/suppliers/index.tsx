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
import { FormattedMessage } from '../../locale/FormattedMessage';

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
  const [searchParams] = useSearchParams();

  const focus = useMemo(() => {
    const lat = parseFloat(searchParams.get('lat') ?? '');
    const lng = parseFloat(searchParams.get('lng') ?? '');
    const zoom = parseFloat(searchParams.get('zoom') ?? '');
    return !isNaN(lat) && !isNaN(lat)
      ? { lat, lng, zoom: isNaN(zoom) ? undefined : zoom }
      : null;
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
            <h1 className={classes.heading}>
              <FormattedMessage id="supplier_portal_no_session_title" />
            </h1>
            <h2>
              <FormattedMessage id="supplier_portal_no_session_how_to_login_title" />
            </h2>
            <List type="ordered">
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step1" components={{Anchor}} values={{iHaveFormHref: '/register-supplies'}} />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step2" />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step3" />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step4" />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step5" components={{Anchor}} values={{authyHref: '//authy.com/download/'}} />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step6" />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step7" />
              </List.Item>
              <List.Item>
                <FormattedMessage id="supplier_portal_no_session_how_to_login_steps_step8" />
              </List.Item>
            </List>
            <Button onClick={onClickSignIn}>
              <FormattedMessage id="supplier_portal_no_session_how_to_login_login_btn" />
            </Button>
          </Stack>
        </Col>
      </Grid>
    );
  }

  return null;
};
