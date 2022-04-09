import React from 'react';
import { useStyles } from './style';
import { ContentfulText } from '../../components/ContentfulText';
import { usePartnersData } from './hooks/usePartnersData';
import { Group } from '@mantine/core';

export const Partners: React.FC = () => {
  const { classes } = useStyles();
  const { state, data } = usePartnersData();
  return (
    <div className={classes.container}>
      <ContentfulText contentType="partners-page" inverted={true} />
      <Group spacing="md">
        {state === 'loaded' &&
          data.map((partner) => (
            <a
              key={partner.title}
              href={partner.websiteUrl}
              className={classes.partner}
            >
              <img
                src={partner.logo.url}
                alt={partner.logo.description}
                className={classes.partnerImg}
              />
            </a>
          ))}
      </Group>
    </div>
  );
};
