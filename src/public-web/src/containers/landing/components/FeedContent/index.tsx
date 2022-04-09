import React from 'react';
import { ContentfulText } from '../../../../components/ContentfulText';
import { useStyles } from './style';
import { OurVoicesTimeline } from '../OurVoicesTimeline';

export const FeedContent: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <ContentfulText contentType="home-page" />
      <OurVoicesTimeline className={classes.ourVoiceTimeline} />
    </div>
  );
};
