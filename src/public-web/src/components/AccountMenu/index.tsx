import React, { useCallback } from 'react';
import { Menu, ActionIcon, Text } from '@mantine/core';
import authgear from '@authgear/web';
import { FormattedMessage } from '@oursky/react-messageformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSessionState } from '../../contexts/AuthgearContext';
import { config } from '../../config';

const control = (
  <ActionIcon>
    <Text>
      <FontAwesomeIcon icon={['fas', 'user']} />
    </Text>
  </ActionIcon>
);

export function AccountMenu(): React.ReactElement | null {
  const sessionState = useSessionState();
  const href = config.authgear.endpoint + '/settings';
  const onClickSignOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    authgear.logout().catch((e) => console.error(e));
  }, []);

  if (sessionState !== 'AUTHENTICATED') {
    return null;
  }

  return (
    <Menu control={control}>
      <Menu.Item component="a" href={href} target="_blank">
        <FormattedMessage id="account_menu_settings" />
      </Menu.Item>
      <Menu.Item onClick={onClickSignOut}>
        <FormattedMessage id="account_menu_sign_out" />
      </Menu.Item>
    </Menu>
  );
}
