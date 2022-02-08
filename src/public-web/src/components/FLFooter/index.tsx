import React from 'react';
import { Group } from '@mantine/core';
import cn from 'classnames';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import { RouteType } from '../../routes';

export const FLFooter: React.FC<{ className?: string }> = ({ className }) => {
  const { classes } = useStyles();
  return (
    <footer className={cn(className, classes.footer)}>
      <Group
        className={classes.groupContainer}
        align="center"
        position="apart"
        spacing="xs"
      >
        <div className={classes.container}>
          <span>Charity Reg Number 1191255&nbsp;</span>
          <span>
            <Link
              className={classes.footerLinkItem}
              to={RouteType.TermsAndConditions}
            >
              Terms and Conditions
            </Link>
          </span>
        </div>
        <div className={classes.container}>
          This site is open source
          <a
            className={classes.footerLinkItem}
            href="https://github.com/WeAreBeep/FrontLineLive"
          >
            Contribute
          </a>
        </div>
        <ul
          className={classes.container}
          style={{ listStyle: 'none', display: 'flex', marginBlock: 0 }}
        >
          <li className={classes.footerLinkItem}>
            <Link to={RouteType.ContactUs}>Contact Us</Link>
          </li>
          <li className={classes.footerLinkItem}>
            <a href="https://careers.smartrecruiters.com/frontlinelive">
              Volunteer
            </a>
          </li>
        </ul>
      </Group>
    </footer>
  );
};
