import React from 'react';
import { useStyles } from './style';
import { ContentfulText } from '../../components/ContentfulText';

export const FAQ: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { classes } = useStyles();
  return (
    <div>
      <ContentfulText contentType="faq" />
    </div>
  );
};
