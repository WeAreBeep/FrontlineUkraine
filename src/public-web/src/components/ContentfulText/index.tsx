import React from 'react';
import { useStyles } from './style';

interface Props {
    html: string
}

export const ContentfulText: React.FC<Props> = ({ html }) => {
    const { classes } = useStyles();
    return <div className={classes.contentfulText} dangerouslySetInnerHTML={{ __html: html }} />
}