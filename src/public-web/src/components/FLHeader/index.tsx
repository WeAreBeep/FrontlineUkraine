import React from 'react';
import { CSSObject, Header, MantineTheme, Burger } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useStyles } from './style';
import { RouteType } from '../../routes';
import { HEADER_HEIGHT } from '../FLAppShell/style';
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import logoSrc from '../../assets/images/frontline_map_logo.png';
import { getThemePrimaryColor } from '../../utils/mantine';
import { MainLinks } from '../MainLinks';

function getHeaderCss(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: getThemePrimaryColor(theme),
  };
}

interface Props {
  burgerOpened: boolean;
  onBurgerClick: () => void;
}

export const FLHeader: React.FC<Props> = ({ burgerOpened, onBurgerClick }) => {
  const { classes } = useStyles();
  return (
    <Header height={HEADER_HEIGHT} padding="sm" sx={getHeaderCss} fixed={true}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <Burger
            className={classes.burger}
            opened={burgerOpened}
            onClick={onBurgerClick}
            color="white"
          />
          <Link to={RouteType.Landing} title="Home">
            <img className={classes.logo} src={logoSrc} alt="Logo" />
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

        <MainLinks variant="header" className={classes.linksContainer} />
      </div>
    </Header>
  );
};
