import { createStyles } from '@mantine/core';

export const useStyles = createStyles({
  contentfulText: {
    /* CONTENT */
    padding: '0 0.5rem',
    'ul.hashtag_list': {
      listStyle: 'none',
      lineHeight: 1.5,
      margin: '1rem 0 2rem',
    },
    'ul.hashtag_list li span': {
      fontWeight: 'normal',
      color: '#f7f0f0',
      marginLeft: '0.5rem',
    },
    h1: {
      color: '#ffffff',
      fontSize: '2.5em',
      margin: '1rem auto',
      fontWeight: 500,
      lineHeight: '1.1em',
    },
    h2: {
      color: '#ffffff',
      fontSize: '2.5em',
      margin: '1rem auto',
      whiteSpace: 'normal',
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
    h3: {
      whiteSpace: 'normal',
    },
    p: {
      color: '#ffffff',
      fontSize: '1em',
      letterSpacing: '0.002em',
    },
    ul: {
      fontSize: '1.25em',
      color: '#ffffff',
    },
    'ul li > p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      fontSize: 'unset',
    },
    'div.contentfulStyledList p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '.inverted': {
      color: '#00966B',
    },
    '.bignumber': {
      fontSize: '1.5em',
      fontWeight: 700,
    },
    a: {
      color: '#ffffff',
      '&:hover': {
        color: '#000000',
      },
    },
  },
});
