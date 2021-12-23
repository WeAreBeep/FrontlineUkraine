import React from 'react';
import { useStyles } from './style';

interface Props {
    html: string
}

export function ContentfulText({ html }: Props) {
    const { classes } = useStyles();
    return <div className={classes.contentfulText} dangerouslySetInnerHTML={{ __html: html }} />
}