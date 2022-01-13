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
      limit={matches.length}
      filter={alwaysTrue}
      styles={autocompleteStyles}
      nothingFound={'Type in full postcode to find address'}
    />
  );
});
