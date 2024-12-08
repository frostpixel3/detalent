import classNames from "classnames";
import { FC } from "react";
import { CurrencyIcon } from "./CurrencyIcon";
import { formatCryptoAmount } from "../utils/formatCryptoAmount";
import { CURRENCIES } from "../consts/currencies";
import { useSymbolRate } from "../hooks/useSymbolRate";

export interface AmountInputProps {
  symbol: keyof typeof CURRENCIES;
  estimate?: boolean;
  estimatedFiatSymbol?: string;
  value: number;
  onChange: (value: number) => void;
}

export const AmountInput: FC<AmountInputProps> = ({
  symbol,
  estimate = false,
  estimatedFiatSymbol = "USD",
  value,
  onChange,
}) => {
  const { data: rate } = useSymbolRate(symbol, Object.keys(CURRENCIES), {
    enabled: estimate,
  });
  const className = classNames("input input-bordered");
  const estimatedFiatAmount =
    rate && rate[estimatedFiatSymbol] && symbol !== estimatedFiatSymbol
      ? (value || 0) * rate[estimatedFiatSymbol]
      : null;
  const formattedEstimatedFiat = estimatedFiatAmount !== null
    ? formatCryptoAmount({
        amount: (estimatedFiatAmount || 0),
        maximumFractionDigits: 2,
      })
    : null;
  return (
    <div>
      <label className="input-group">
        <input
          type="text"
          className={className}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span>
          <div
            className="tooltip tooltip-right shrink-0"
            data-tip={symbol.toUpperCase()}
          >
            <CurrencyIcon symbol={symbol} className="w-4 h-4" />
          </div>
        </span>
      </label>
      {estimate && (
        <label className="label">
          {(estimatedFiatAmount !== null || estimatedFiatAmount !== undefined) && (
            <span className="label-text-alt">
              <div className="opacity-50 ml-2 text-xs">
                ~ {formattedEstimatedFiat} {estimatedFiatSymbol.toUpperCase()}
              </div>
            </span>
          )}
        </label>
      )}
    </div>
  );
};
