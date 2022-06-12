import React, { useEffect } from 'react';
import { useStyles } from './style';
import { Map, MapRenderPopupType } from './components/Map';
import { Col, Grid } from '@mantine/core';
import { FeedContent } from './components/FeedContent';
import { OurVoicesTimeline } from './components/OurVoicesTimeline';
import { useAPIContext } from '../../contexts/APIContext';
import { PublicMapData } from '../../models/map';
import { CategoryEnum } from './type';
import { MapSupplyPopup } from './components/MapSupplyPopup';
import { MapCityDataPopup } from './components/MapCityDataPopup';
import { useNotifications } from '@mantine/notifications';
import { FormattedMessage } from '../../locale/FormattedMessage';

const renderMapPopup: MapRenderPopupType<PublicMapData> = (
  category,
  { recordType, recordId },
  recordMap
) => {
  if (category === CategoryEnum.Supply && recordType === 'supply') {
    return <MapSupplyPopup supply={recordMap[recordType][recordId]} />;
  }
  if (category !== CategoryEnum.Supply && recordType === 'city') {
    return (
      <MapCityDataPopup
        cityData={recordMap[recordType][recordId]}
        variant={category}
      />
    );
  }
  return <></>;
};

export const Landing: React.FC = () => {
  const {
    actions: { getPublicMapData },
  } = useAPIContext();
  const { classes } = useStyles();
  const notifications = useNotifications();
  useEffect(() => {
    notifications.showNotification({
      color: 'flGreen',
      message: (
        <FormattedMessage id="landing_welcome_banner_message" />
      ),
      autoClose: false,
    })
    // NOTE: Only show the notification on page mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid className={classes.gridContainer} gutter={0}>
      <Col className={classes.feedContentContainer} span={12} md={4}>
        <FeedContent />
      </Col>
      <Col className={classes.mapContainer} span={12} md={8}>
        <Map<PublicMapData>
          fetchMapData={getPublicMapData}
          renderPopup={renderMapPopup}
          focus={null}
        />
      </Col>
      <Col span={12}>
        <OurVoicesTimeline className={classes.ourVoiceTimeline} />
      </Col>
    </Grid>
  );
};
