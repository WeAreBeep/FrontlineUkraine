import React, { useMemo } from 'react';
import { useRemark } from './RemarkContext';

export const RemarkLegend: React.FC = () => {
  const {
    state: { remarks, symbolCount },
  } = useRemark();

  const symbolsInUse = useMemo(() => {
    return Object.keys(symbolCount).filter(
      (symbol) => (symbolCount[symbol] ?? 0) > 0
    );
  }, [symbolCount]);

  return (
    <ul>
      {symbolsInUse.map((symbol) => {
        if (remarks[symbol] == null || remarks[symbol] === '') {
          return <React.Fragment key={symbol}></React.Fragment>;
        }
        return (
          <li key={symbol}>
            <sup>{symbol}</sup>
            &nbsp;
            <span>{remarks[symbol]}</span>
          </li>
        );
      })}
    </ul>
  );
};
