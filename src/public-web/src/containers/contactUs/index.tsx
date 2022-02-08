import React from 'react';
import { useStyles } from './style';

export const ContactUs: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.content}>
      <h1>Contact Us</h1>

      <p>
        Please contact us by sending email to{' '}
        <a href="mailto:hello@frontline.live">frontline@wearebeep.com</a>.
      </p>
      <p>Thank you!</p>
    </div>
  );
};
