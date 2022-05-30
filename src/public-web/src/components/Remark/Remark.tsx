import React, { useEffect } from 'react';
import { useRemark } from './RemarkContext';

interface Props {
  remark: string;
}

export const Remark: React.FC<Props> = ({ remark }) => {
  const {
    actions: { unregister, register },
  } = useRemark();
  useEffect(() => {
    register(remark);
    return () => {
      unregister(remark);
    };
  }, [remark, register, unregister]);

  return <sup>{remark}</sup>;
};
