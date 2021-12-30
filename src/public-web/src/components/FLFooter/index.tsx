import React from 'react';
import { Group } from '@mantine/core';
import cn from 'classnames';
import { useStyles } from './style';

export const FLFooter: React.FC<{ className?: string }> = ({ className }) => {
  const { classes } = useStyles();
  return (
    <footer className={cn(className, classes.footer)}>
      <Group align="center" position="apart">
        <div className={classes.container} style={{ display: 'inline' }}>
          <span>Charity Reg Number 191225&nbsp;</span>
          <span>
            <a className={classes.footerLinkItem} href="/terms-and-conditions">
              Terms and Conditions
            </a>
          </span>
        </div>
        <div className={classes.container} style={{ display: 'inline' }}>
          This site is open source
          <a
            className={classes.footerLinkItem}
            href="https://github.com/WeAreBeep/FrontLineLive"
          >
            Contribute
          </a>
        </div>
        <ol
          className={classes.container}
          style={{ listStyle: 'none', display: 'flex', marginBlock: 0 }}
        >
          <li className={classes.footerLinkItem}>
            <a href="/contact-us">Contact Us</a>
          </li>
          <li className={classes.footerLinkItem}>
            <a href="https://careers.smartrecruiters.com/frontlinelive">
              Volunteer
            </a>
          </li>
        </ol>
      </Group>
    </footer>
  );
};
