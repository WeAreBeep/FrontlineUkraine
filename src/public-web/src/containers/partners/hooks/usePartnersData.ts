// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo } from 'react';
import { useContentful } from 'react-contentful';

interface PartnerData {
  logo: {
    description: string;
    title: string;
    url: string;
  };
  title: string;
  websiteUrl: string;
}

export const usePartnersData: () => {
  state: 'init' | 'loading' | 'loaded';
  data: PartnerData[];
} = () => {
  const {
    data: _data,
    loading,
    fetched,
  } = useContentful({
    contentType: 'partners-page',
    include: 1,
  });
  return useMemo(() => {
    if (loading) {
      return { state: 'loading', data: [] };
    }
    if (fetched) {
      // FIXME: Typing
      const data = _data as any;
      const items = Array.from(data.items);
      if (items.length === 0) {
        return {
          state: 'loaded',
          data: [],
        };
      }
      const partners = Array.from(data.items[0].fields.partners);
      console.log(partners);
      const mappedPartners: PartnerData[] = partners
        .filter((p: any) => typeof p.fields !== 'undefined')
        .map((p: any) => ({
          logo: {
            description: p.fields.logo.fields.description,
            url: p.fields.logo.fields.file.url,
            title: p.fields.logo.fields.title,
          },
          title: p.fields.title,
          websiteUrl: p.fields.websiteUrl,
        }));
      return {
        state: 'loaded',
        data: mappedPartners,
      };
    }
    return {
      state: 'init',
      data: [],
    };
  }, [_data, fetched, loading]);
};
