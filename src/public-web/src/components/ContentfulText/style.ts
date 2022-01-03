import { createStyles } from '@mantine/core';
import { getThemePrimaryColor } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  contentfulTextInverted: {
    'ul.hashtag_list li span': {
      color: getThemePrimaryColor(theme),
    },
    'h1, h2, p, ul, a': {
      color: getThemePrimaryColor(theme),
    },
  },
  contentfulTextNormal: {
    'ul.hashtag_list li span': {
      color: '#f7f0f0',
    },
    'h1, h2, p, ul, a': {
      color: theme.white,
    },
  },
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
      marginLeft: '0.5rem',
    },
    h1: {
      fontSize: '2.5rem',
      margin: '1rem auto',
      fontWeight: 500,
      lineHeight: '1.1em',
    },
    h2: {
      fontSize: '2rem',
      margin: '1rem auto',
      whiteSpace: 'normal',
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
    h3: {
      whiteSpace: 'normal',
    },
    p: {
      fontSize: '1rem',
      letterSpacing: '0.002em',
    },
    ul: {
      fontSize: '1.2rem',
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
      color: getThemePrimaryColor(theme),
    },
    '.bignumber': {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    a: {
      '&:hover': {
        color: '#000000',
      },
    },
  },
}));
