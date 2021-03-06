import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import { useStyles } from './style';

export const OurVoicesTimeline: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { classes } = useStyles();
  return (
    <div className={className}>
      <h2 className={classes.sectionHeader}>Our Voices</h2>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'FrontlineMap' }}
      />
    </div>
  );
};
