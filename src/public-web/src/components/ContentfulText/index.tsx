import React, {useMemo} from 'react';
import { CSSObject, Global, MantineTheme } from '@mantine/core';
import { useStyles } from './style';
import {useContentful} from "react-contentful";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface Props {
  contentType: string;
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

export const ContentfulText: React.FC<Props> = ({ contentType }) => {
  const { classes } = useStyles();
  const { data } = useContentful({
    contentType,
    include: 1
  });
  const rawHtml = useMemo(() => {
    const doc = data == null ? null : (data as any).items[0].fields.content;
    if (doc) {
      return {
        __html: documentToHtmlString(doc, {}),
      }
    }
    return {
      __html: ''
    };
  }, [data])
  return (
    <>
      <Global styles={getVimeoGlobalStyle} />
      <div
        className={classes.contentfulText}
        dangerouslySetInnerHTML={rawHtml}
      />
    </>
  );
};
