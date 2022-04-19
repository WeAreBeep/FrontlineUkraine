import React from 'react';
import { useStyles } from '../landing/style';
import { Map } from '../landing/components/Map';
import { Col, Grid } from '@mantine/core';
import { FeedContent } from '../landing/components/FeedContent';
import { OurVoicesTimeline } from '../landing/components/OurVoicesTimeline';

export const Suppliers: React.FC = () => {
  const { classes } = useStyles();
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
};
