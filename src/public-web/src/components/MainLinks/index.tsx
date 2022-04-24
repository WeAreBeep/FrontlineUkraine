import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { RouteType } from '../../routes';
import { useStyles } from './style';
import { useLocale } from '../../locale/LocaleProvider';

export const MainLinks: React.FC<{
  className?: string;
  variant: 'header' | 'navbar';
  onClick?: () => void;
}> = ({ className, variant, onClick }) => {
  const { renderToString } = useLocale();
  const { classes } = useStyles();
  const { containerClassVariant, linkItemVariant, linkClassVariant } =
    useMemo(() => {
      if (variant === 'header') {
        return {
          containerClassVariant: classes.headerLinksContainer,
          linkClassVariant: classes.headerLink,
          linkItemVariant: null,
        };
      }
      return {
        containerClassVariant: classes.navLinksContainer,
        linkClassVariant: classes.navLink,
        linkItemVariant: classes.navLinkItem,
      };
    }, [classes, variant]);
  const links = useMemo(
    () => [
      {
        routeType: RouteType.RegisterNeed,
        name: renderToString('nav_link_item_i_need'),
      },
      {
        routeType: RouteType.RegisterSupply,
        name: renderToString('nav_link_item_i_have'),
      },
      {
        routeType: RouteType.About,
        name: renderToString('nav_link_item_about'),
      },
      {
        routeType: RouteType.Suppliers,
        name: renderToString('nav_link_item_suppliers'),
      },
      {
        routeType: RouteType.Partners,
        name: renderToString('nav_link_item_partners'),
      },
    ],
    [renderToString]
  );
  return (
    <ul
      className={cn(classes.linksContainer, containerClassVariant, className)}
    >
      {links.map(({ routeType, name }) => (
        <li key={routeType} className={cn(classes.linkItem, linkItemVariant)}>
          <Link
            className={cn(classes.link, linkClassVariant)}
            to={routeType}
            onClick={onClick}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
