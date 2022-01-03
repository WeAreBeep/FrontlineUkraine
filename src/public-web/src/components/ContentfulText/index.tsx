import React from 'react';
import { CSSObject, Global, MantineTheme } from '@mantine/core';
import { useStyles } from './style';

interface Props {
  html: string;
}

function getVimeoGlobalStyle(_theme: MantineTheme): CSSObject {
  return {
    '.vimeo-container': {
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden',
      maxWidth: '100%',
      '& > iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
  };
}

export const ContentfulText: React.FC<Props> = ({ html }) => {
  const { classes } = useStyles();
  return (
    <>
      <Global styles={getVimeoGlobalStyle} />
      <div
        className={classes.contentfulText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};
