import React from 'react';
import { CSSObject, Header, MantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useStyles } from './style';
import { RouteType } from '../../routes';
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import logoSrc from '../../assets/images/frontline_map_logo.png';
import { getThemePrimaryColor } from '../../utils/mantine';

function getHeaderCss(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: getThemePrimaryColor(theme),
  };
}

export const FLHeader: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Header height={96} padding="sm" sx={getHeaderCss}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <Link to={RouteType.Landing} title="Home">
            <img className={classes.logo} src={logoSrc} />
          </Link>

          {/* <a
            id="twitter"
            href="https://twitter.com/FrontlineMap"
            title="View tweets"
          >
            
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="circle" size="2x"/>
              <FontAwesomeIcon icon={['fab', 'twitter']} inverse size="1x"/>
            </span>
          </a>

          <a
            id="facebook"
            href="https://www.facebook.com/FrontlineMap"
            title="View facebook page"
          >
            <FontAwesomeIcon icon={['fab', 'facebook']} size="4x"/>
          </a>

          <a
            id="instagram"
            href="https://www.instagram.com/FrontlineMap"
            title="View instagram page"
          >
            <FontAwesomeIcon icon={['fab', 'instagram']} size="4x"/>
          </a> */}
        </div>

        <ul className={classes.linksContainer}>
          <li className={classes.linkItem}>
            <Link className={classes.link} to={RouteType.RequestPpe}>
              REQUEST PPE
            </Link>
          </li>
          <li className={classes.linkItem}>
            <Link className={classes.link} to={RouteType.RegisterSupplies}>
              GIVE PPE
            </Link>
          </li>
          <li className={classes.linkItem}>
            <Link className={classes.link} to={RouteType.About}>
              ABOUT
            </Link>
          </li>
          <li className={classes.linkItem}>
            <Link className={classes.link} to={RouteType.Partners}>
              PARTNERS
            </Link>
          </li>
        </ul>
      </div>
    </Header>
  );
};
