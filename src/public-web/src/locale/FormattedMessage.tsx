import {
  FormattedMessageProps as MFFormattedMessageProps,
  FormattedMessage as MFFormattedMessage,
} from '@oursky/react-messageformat';
import { MessageID } from './type';
import React from 'react';

export type FormattedMessageProps = Omit<MFFormattedMessageProps, 'id'> & {id: MessageID};
export const FormattedMessage: React.FC<FormattedMessageProps> = (props) => {
  return <MFFormattedMessage {...props} />
}

