import React from 'react';
import { useStyles } from './style';
import { Map } from './components/Map';
import { Col, Grid } from '@mantine/core';
import { FeedContent } from './components/FeedContent';
import { OurVoicesTimeline } from './components/OurVoicesTimeline';
import { useAPIContext } from '../../contexts/APIContext';
import { PublicMapData } from '../../models/map';

export const Landing: React.FC = () => {
  const {
    actions: { getPublicMapData },
  } = useAPIContext();
  const { classes } = useStyles();
  return (
    <Grid className={classes.gridContainer} gutter={0}>
      <Col className={classes.feedContentContainer} span={12} md={4}>
        <FeedContent />
      </Col>
      <Col className={classes.mapContainer} span={12} md={8}>
        <Map<PublicMapData> fetchMapData={getPublicMapData} />
      </Col>
      <Col span={12}>
        <OurVoicesTimeline className={classes.ourVoiceTimeline} />
      </Col>
    </Grid>
  );
};
