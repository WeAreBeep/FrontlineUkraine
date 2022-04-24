import React from 'react';
import { FormattedMessage } from '../../../../locale/FormattedMessage';
import { MessageID } from '../../../../locale/type';

const ITEM_KEYS: MessageID[] = [
  'i_need_form_form_intro_procedure_list_item_1',
  'i_need_form_form_intro_procedure_list_item_2',
];

export const ProcedureList: React.FC = () => {
  return (
    <ul>
      {ITEM_KEYS.map((k) => (
        <li key={k}>
          <FormattedMessage id={k} />
        </li>
      ))}
    </ul>
  );
};
