import React, { FC, useMemo } from 'react'
import { CURRENCIES } from '../consts/currencies';

export interface CurrencyIconProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  symbol: keyof typeof CURRENCIES;
}

export const CurrencyIcon: FC<CurrencyIconProps> = ({ symbol, ...props }) => {
  const info = useMemo(() => {
    return CURRENCIES[symbol];
  }, [symbol]);
  return (
    <img src={info.src} alt={info.alt} {...props} />
  )
}
