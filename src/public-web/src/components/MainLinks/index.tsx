import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { RouteType } from '../../routes';
import { useStyles } from './style';

const links: { name: string; routeType: RouteType }[] = [
  { routeType: RouteType.RequestPpe, name: 'REQUEST PPE' },
  { routeType: RouteType.RegisterSupplies, name: 'GIVE PPE' },
  { routeType: RouteType.About, name: 'ABOUT' },
  { routeType: RouteType.Partners, name: 'PARTNERS' },
];

export const MainLinks: React.FC<{
  className?: string;
  variant: 'header' | 'navbar';
  onClick?: () => void;
}> = ({ className, variant, onClick }) => {
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
