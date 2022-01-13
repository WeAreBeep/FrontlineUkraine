import React, { useCallback, useEffect, useState } from 'react';
import {
  Group,
  Text,
  Loader,
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { AddressEntry } from '../../models/posttag';
import { useAPIContext } from '../../contexts/APIContext';

const autocompleteStyles: AutocompleteProps['styles'] = {
  dropdown: {
    maxHeight: 200,
    overflowY: 'scroll',
  },
};

const data: PosttagAutocompleteItem[] = [
  {
    label: 'Flat 143, 46 Palmers Road',
    value: '143',
    data: {
      type: 'loaded',
      data: {
        idx: '143',
        label: 'Flat 143, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 143, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 115, 46 Palmers Road',
    value: '115',
    data: {
      type: 'loaded',
      data: {
        idx: '115',
        label: 'Flat 115, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 115, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 109, 46 Palmers Road',
    value: '109',
    data: {
      type: 'loaded',
      data: {
        idx: '109',
        label: 'Flat 109, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 109, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 110, 46 Palmers Road',
    value: '110',
    data: {
      type: 'loaded',
      data: {
        idx: '110',
        label: 'Flat 110, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 110, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 111, 46 Palmers Road',
    value: '111',
    data: {
      type: 'loaded',
      data: {
        idx: '111',
        label: 'Flat 111, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 111, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 112, 46 Palmers Road',
    value: '112',
    data: {
      type: 'loaded',
      data: {
        idx: '112',
        label: 'Flat 112, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 112, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 113, 46 Palmers Road',
    value: '113',
    data: {
      type: 'loaded',
      data: {
        idx: '113',
        label: 'Flat 113, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 113, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 114, 46 Palmers Road',
    value: '114',
    data: {
      type: 'loaded',
      data: {
        idx: '114',
        label: 'Flat 114, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 114, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 116, 46 Palmers Road',
    value: '116',
    data: {
      type: 'loaded',
      data: {
        idx: '116',
        label: 'Flat 116, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 116, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 107, 46 Palmers Road',
    value: '107',
    data: {
      type: 'loaded',
      data: {
        idx: '107',
        label: 'Flat 107, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 107, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 117, 46 Palmers Road',
    value: '117',
    data: {
      type: 'loaded',
      data: {
        idx: '117',
        label: 'Flat 117, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 117, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 118, 46 Palmers Road',
    value: '118',
    data: {
      type: 'loaded',
      data: {
        idx: '118',
        label: 'Flat 118, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 118, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 119, 46 Palmers Road',
    value: '119',
    data: {
      type: 'loaded',
      data: {
        idx: '119',
        label: 'Flat 119, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 119, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 120, 46 Palmers Road',
    value: '120',
    data: {
      type: 'loaded',
      data: {
        idx: '120',
        label: 'Flat 120, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 120, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 121, 46 Palmers Road',
    value: '121',
    data: {
      type: 'loaded',
      data: {
        idx: '121',
        label: 'Flat 121, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 121, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 122, 46 Palmers Road',
    value: '122',
    data: {
      type: 'loaded',
      data: {
        idx: '122',
        label: 'Flat 122, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 122, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 108, 46 Palmers Road',
    value: '108',
    data: {
      type: 'loaded',
      data: {
        idx: '108',
        label: 'Flat 108, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 108, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 106, 46 Palmers Road',
    value: '106',
    data: {
      type: 'loaded',
      data: {
        idx: '106',
        label: 'Flat 106, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 106, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 124, 46 Palmers Road',
    value: '124',
    data: {
      type: 'loaded',
      data: {
        idx: '124',
        label: 'Flat 124, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 124, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 97, 46 Palmers Road',
    value: '97',
    data: {
      type: 'loaded',
      data: {
        idx: '97',
        label: 'Flat 97, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 97, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 92, 46 Palmers Road',
    value: '92',
    data: {
      type: 'loaded',
      data: {
        idx: '92',
        label: 'Flat 92, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 92, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 93, 46 Palmers Road',
    value: '93',
    data: {
      type: 'loaded',
      data: {
        idx: '93',
        label: 'Flat 93, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 93, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 96, 46 Palmers Road',
    value: '96',
    data: {
      type: 'loaded',
      data: {
        idx: '96',
        label: 'Flat 96, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 96, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 98, 46 Palmers Road',
    value: '98',
    data: {
      type: 'loaded',
      data: {
        idx: '98',
        label: 'Flat 98, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 98, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 91, 46 Palmers Road',
    value: '91',
    data: {
      type: 'loaded',
      data: {
        idx: '91',
        label: 'Flat 91, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 91, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 94, 46 Palmers Road',
    value: '94',
    data: {
      type: 'loaded',
      data: {
        idx: '94',
        label: 'Flat 94, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 94, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 90, 46 Palmers Road',
    value: '90',
    data: {
      type: 'loaded',
      data: {
        idx: '90',
        label: 'Flat 90, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 90, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 105, 46 Palmers Road',
    value: '105',
    data: {
      type: 'loaded',
      data: {
        idx: '105',
        label: 'Flat 105, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 105, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 99, 46 Palmers Road',
    value: '99',
    data: {
      type: 'loaded',
      data: {
        idx: '99',
        label: 'Flat 99, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 99, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 100, 46 Palmers Road',
    value: '100',
    data: {
      type: 'loaded',
      data: {
        idx: '100',
        label: 'Flat 100, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 100, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 101, 46 Palmers Road',
    value: '101',
    data: {
      type: 'loaded',
      data: {
        idx: '101',
        label: 'Flat 101, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 101, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 102, 46 Palmers Road',
    value: '102',
    data: {
      type: 'loaded',
      data: {
        idx: '102',
        label: 'Flat 102, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 102, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 103, 46 Palmers Road',
    value: '103',
    data: {
      type: 'loaded',
      data: {
        idx: '103',
        label: 'Flat 103, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 103, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 104, 46 Palmers Road',
    value: '104',
    data: {
      type: 'loaded',
      data: {
        idx: '104',
        label: 'Flat 104, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 104, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 123, 46 Palmers Road',
    value: '123',
    data: {
      type: 'loaded',
      data: {
        idx: '123',
        label: 'Flat 123, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 123, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 125, 46 Palmers Road',
    value: '125',
    data: {
      type: 'loaded',
      data: {
        idx: '125',
        label: 'Flat 125, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 125, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 142, 46 Palmers Road',
    value: '142',
    data: {
      type: 'loaded',
      data: {
        idx: '142',
        label: 'Flat 142, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 142, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 134, 46 Palmers Road',
    value: '134',
    data: {
      type: 'loaded',
      data: {
        idx: '134',
        label: 'Flat 134, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 134, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 89, 46 Palmers Road',
    value: '89',
    data: {
      type: 'loaded',
      data: {
        idx: '89',
        label: 'Flat 89, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 89, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 129, 46 Palmers Road',
    value: '129',
    data: {
      type: 'loaded',
      data: {
        idx: '129',
        label: 'Flat 129, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 129, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 130, 46 Palmers Road',
    value: '130',
    data: {
      type: 'loaded',
      data: {
        idx: '130',
        label: 'Flat 130, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 130, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 131, 46 Palmers Road',
    value: '131',
    data: {
      type: 'loaded',
      data: {
        idx: '131',
        label: 'Flat 131, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 131, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 132, 46 Palmers Road',
    value: '132',
    data: {
      type: 'loaded',
      data: {
        idx: '132',
        label: 'Flat 132, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 132, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 133, 46 Palmers Road',
    value: '133',
    data: {
      type: 'loaded',
      data: {
        idx: '133',
        label: 'Flat 133, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 133, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 135, 46 Palmers Road',
    value: '135',
    data: {
      type: 'loaded',
      data: {
        idx: '135',
        label: 'Flat 135, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 135, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 87, 46 Palmers Road',
    value: '87',
    data: {
      type: 'loaded',
      data: {
        idx: '87',
        label: 'Flat 87, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 87, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 136, 46 Palmers Road',
    value: '136',
    data: {
      type: 'loaded',
      data: {
        idx: '136',
        label: 'Flat 136, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 136, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 137, 46 Palmers Road',
    value: '137',
    data: {
      type: 'loaded',
      data: {
        idx: '137',
        label: 'Flat 137, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 137, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 138, 46 Palmers Road',
    value: '138',
    data: {
      type: 'loaded',
      data: {
        idx: '138',
        label: 'Flat 138, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 138, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 139, 46 Palmers Road',
    value: '139',
    data: {
      type: 'loaded',
      data: {
        idx: '139',
        label: 'Flat 139, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 139, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 140, 46 Palmers Road',
    value: '140',
    data: {
      type: 'loaded',
      data: {
        idx: '140',
        label: 'Flat 140, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 140, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 141, 46 Palmers Road',
    value: '141',
    data: {
      type: 'loaded',
      data: {
        idx: '141',
        label: 'Flat 141, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 141, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 88, 46 Palmers Road',
    value: '88',
    data: {
      type: 'loaded',
      data: {
        idx: '88',
        label: 'Flat 88, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 88, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 86, 46 Palmers Road',
    value: '86',
    data: {
      type: 'loaded',
      data: {
        idx: '86',
        label: 'Flat 86, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 86, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 126, 46 Palmers Road',
    value: '126',
    data: {
      type: 'loaded',
      data: {
        idx: '126',
        label: 'Flat 126, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 126, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 77, 46 Palmers Road',
    value: '77',
    data: {
      type: 'loaded',
      data: {
        idx: '77',
        label: 'Flat 77, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 77, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 127, 46 Palmers Road',
    value: '127',
    data: {
      type: 'loaded',
      data: {
        idx: '127',
        label: 'Flat 127, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 127, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 128, 46 Palmers Road',
    value: '128',
    data: {
      type: 'loaded',
      data: {
        idx: '128',
        label: 'Flat 128, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 128, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 73, 46 Palmers Road',
    value: '73',
    data: {
      type: 'loaded',
      data: {
        idx: '73',
        label: 'Flat 73, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 73, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 74, 46 Palmers Road',
    value: '74',
    data: {
      type: 'loaded',
      data: {
        idx: '74',
        label: 'Flat 74, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 74, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 75, 46 Palmers Road',
    value: '75',
    data: {
      type: 'loaded',
      data: {
        idx: '75',
        label: 'Flat 75, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 75, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 76, 46 Palmers Road',
    value: '76',
    data: {
      type: 'loaded',
      data: {
        idx: '76',
        label: 'Flat 76, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 76, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 78, 46 Palmers Road',
    value: '78',
    data: {
      type: 'loaded',
      data: {
        idx: '78',
        label: 'Flat 78, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 78, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 85, 46 Palmers Road',
    value: '85',
    data: {
      type: 'loaded',
      data: {
        idx: '85',
        label: 'Flat 85, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 85, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 79, 46 Palmers Road',
    value: '79',
    data: {
      type: 'loaded',
      data: {
        idx: '79',
        label: 'Flat 79, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 79, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 80, 46 Palmers Road',
    value: '80',
    data: {
      type: 'loaded',
      data: {
        idx: '80',
        label: 'Flat 80, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 80, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 81, 46 Palmers Road',
    value: '81',
    data: {
      type: 'loaded',
      data: {
        idx: '81',
        label: 'Flat 81, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 81, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 82, 46 Palmers Road',
    value: '82',
    data: {
      type: 'loaded',
      data: {
        idx: '82',
        label: 'Flat 82, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 82, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 83, 46 Palmers Road',
    value: '83',
    data: {
      type: 'loaded',
      data: {
        idx: '83',
        label: 'Flat 83, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 83, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 84, 46 Palmers Road',
    value: '84',
    data: {
      type: 'loaded',
      data: {
        idx: '84',
        label: 'Flat 84, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 84, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
  {
    label: 'Flat 95, 46 Palmers Road',
    value: '95',
    data: {
      type: 'loaded',
      data: {
        idx: '95',
        label: 'Flat 95, 46 Palmers Road',
        postcode: 'E2 0TD',
        addressLineOne: 'Flat 95, 46 Palmers Road',
        addressLineTwo: 'London',
      },
    },
  },
];

interface LoadingItemData {
  type: 'loading';
}

interface LoadedItemData {
  type: 'loaded';
  data: AddressEntry;
}

type AutocompleteItemData = LoadingItemData | LoadedItemData;

type PosttagAutocompleteItem = AutocompleteItem & {
  data: AutocompleteItemData;
};

// !important: Forwarding ref is required
const SelectItemComponent: React.FC<PosttagAutocompleteItem> = React.forwardRef<
  HTMLDivElement,
  PosttagAutocompleteItem
>((props, ref) => {
  const { label, data, ...others } = props;
  return (
    <div ref={ref} {...others}>
      {data.type === 'loading' && (
        <Loader
          size="sm"
          sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      )}
      {data.type === 'loaded' && (
        <Group noWrap={true}>
          <Text>{label}</Text>
        </Group>
      )}
    </div>
  );
});

export type PosttagAddressAutocompleteProps = Omit<
  AutocompleteProps,
  'data' | 'itemComponent' | 'filter' | 'searchable'
> & {
  onAddressSelect: (item: AddressEntry) => void;
};

const alwaysTrue = () => true;

export const PosttagAddressAutocomplete = React.forwardRef<
  HTMLInputElement,
  PosttagAddressAutocompleteProps
>((props, ref) => {
  const {
    actions: { searchAddress },
  } = useAPIContext();
  const { value, onChange, onAddressSelect, ...others } = props;
  const [debouncedValue] = useDebouncedValue(value, 700);
  const [matches, setMatches] = useState<PosttagAutocompleteItem[]>([]);
  const setLoading = useCallback(() => {
    setMatches([
      {
        data: { type: 'loading' },
        value: 'loading',
      },
    ]);
  }, []);
  const handleItemSubmit = useCallback(
    (item: PosttagAutocompleteItem) => {
      if (item.data.type === 'loaded') {
        onChange?.(item.data.data.postcode);
        onAddressSelect(item.data.data);
      }
    },
    [onAddressSelect, onChange]
  );

  useEffect(() => {
    const fetch = async () => {
      if (debouncedValue == null || debouncedValue.length === 0) {
        return;
      }
      setLoading();
      try {
        const response = await searchAddress(debouncedValue);
        setMatches(
          response.data.map((d) => ({
            label: d.label,
            value: d.idx,
            data: {
              type: 'loaded',
              data: d,
            },
          }))
        );
      } catch (e: unknown) {
        console.error(e);
      }
    };
    fetch().catch(console.error);
  }, [debouncedValue, searchAddress, setLoading]);

  return (
    <Autocomplete
      ref={ref}
      {...others}
      value={value}
      onItemSubmit={handleItemSubmit}
      onChange={onChange}
      itemComponent={SelectItemComponent}
      data={matches}
      limit={data.length}
      filter={alwaysTrue}
      styles={autocompleteStyles}
      nothingFound={'Type in full postcode to find address'}
    />
  );
});
