import React from 'react';
import { useStyles } from './style';
import { Map } from './components/Map';
import { Col, Grid } from '@mantine/core';
import { FeedContent } from './components/FeedContent';
import { OurVoicesTimeline } from './components/OurVoicesTimeline';

export function Landing() {
  const { classes } = useStyles();
  return (
    <Grid sx={{ height: '100%' }} gutter={0}>
      <Col span={12} md={4} sx={{ maxHeight: '100%', overflowY: 'scroll'}}>
        <FeedContent />
      </Col>
      <Col span={12} md={8} sx={{minHeight: 320}}>
        <Map />
      </Col>
      <Col span={12}>
        <OurVoicesTimeline className={classes.ourVoiceTimeline} />
      </Col>
    </Grid>
  );
}
