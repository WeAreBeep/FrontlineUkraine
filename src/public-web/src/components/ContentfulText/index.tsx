import React, { useMemo } from 'react';
import { CSSObject, Global, MantineTheme } from '@mantine/core';
import { useStyles } from './style';
import { useContentful } from 'react-contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import cn from 'classnames';
import { useLocale } from '../../locale/LocaleProvider';
import ReactDOMServer from 'react-dom/server';

interface Props {
  contentType: string;
  inverted?: boolean;
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

export const ContentfulText: React.FC<Props> = ({ contentType, inverted }) => {
  const { locale } = useLocale();
  const { classes } = useStyles();
  const { data } = useContentful({
    contentType,
    include: 1,
    locale,
  });
  const rawHtml = useMemo(() => {
    const doc = data == null ? null : (data as any).items[0]?.fields?.content;
    if (doc) {
      return {
        __html: documentToHtmlString(doc, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              // render the EMBEDDED_ASSET as you need
              return ReactDOMServer.renderToStaticMarkup(<img
                src={node.data.target.fields.file.url as string}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
                alt={node.data.target.fields.description}
              />)
            },
          }
        }),
      };
    }
    return {
      __html: '',
    };
  }, [data]);
  return (
    <>
      <Global styles={getVimeoGlobalStyle} />
      <div
        className={cn(classes.contentfulText, {
          [classes.contentfulTextInverted]: inverted,
          [classes.contentfulTextNormal]: inverted == null || !inverted,
        })}
        dangerouslySetInnerHTML={rawHtml}
      />
    </>
  );
};
