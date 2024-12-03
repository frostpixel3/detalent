import React, { FC } from "react";
import classNames from "classnames";
import { formatCryptoAmount } from "../utils/formatCryptoAmount";
import { useSymbolRate } from "../hooks/useSymbolRate";
import { CURRENCIES } from "../consts/currencies";
import { CurrencyIcon } from "./CurrencyIcon";

export interface AmountInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol: keyof typeof CURRENCIES;
  amount: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  iconPlacement?: "left" | "right";
  tooltip?: boolean;
  ellipsis?: boolean;
  estimate?: boolean;
  estimatedFiatSymbol?: string;
  icon?: React.ReactNode;
}

export const AmountInfo: FC<AmountInfoProps> = ({
  symbol,
  amount = 0,
  iconPlacement = "left",
  maximumFractionDigits = 4,
  minimumFractionDigits = 0,
  tooltip = true,
  ellipsis = true,
  estimate = false,
  estimatedFiatSymbol = "USD",
  className,
  icon = null,
  ...rest
}) => {
  const { data: rate } = useSymbolRate(
    symbol,
    Object.keys(CURRENCIES),
    {
      enabled: estimate,
    }
  );
  const renderIcon = () => {
    const tooltipClassName = tooltip
      ? classNames("tooltip shrink-0", {
          "tooltip-left": iconPlacement === "left",
          "tooltip-right": iconPlacement === "right",
        })
      : "shrink-0";
    if (!icon && !CURRENCIES[symbol]) {
      return null;
    }
    return (
      <div className={tooltipClassName} data-tip={symbol.toUpperCase()}>
        <CurrencyIcon symbol={symbol} className="w-4 h-4 mr-1" />
      </div>
    );
  };
  const estimatedFiatAmount =
    rate && rate[estimatedFiatSymbol] && symbol !== estimatedFiatSymbol
      ? amount * rate[estimatedFiatSymbol]
      : null;
  const amountClassName = classNames("whitespace-nowrap", {
    "overflow-hidden text-ellipsis": ellipsis,
  });
  const formattedAmount = formatCryptoAmount({
    amount,
    minimumFractionDigits,
    maximumFractionDigits,
  });
  const formattedEstimatedFiat = estimatedFiatAmount
    ? formatCryptoAmount({
        amount: estimatedFiatAmount,
        maximumFractionDigits: 2,
      })
    : null;
  return (
    <div
      {...rest}
      className={classNames("AmountInfo inline-flex items-center", className)}
    >
      {iconPlacement === "left" && renderIcon()}
      <div
        className={amountClassName}
        title={`${formattedAmount} ${symbol.toUpperCase()}`}
      >
        {formattedAmount}
      </div>
      {formattedEstimatedFiat && (
        <div className="opacity-50 ml-2 text-xs">
          ~ {formattedEstimatedFiat} {estimatedFiatSymbol.toUpperCase()}
        </div>
      )}
      {iconPlacement === "right" && renderIcon()}
    </div>
  );
};
