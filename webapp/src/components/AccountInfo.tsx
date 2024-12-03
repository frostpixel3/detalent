import classNames from "classnames";
import React from "react";
import { getShortAddress } from "../utils/getShortAddress";
import { AmountInfo } from "./AmountInfo";
import { Avatar } from "./Avatar";
import { NetworkLabel } from "./NetworkLabel";
import { VerifiedBadge } from "./VerifiedBadge";

export interface AccountInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  label?: string;
  infoPlacement?: "left" | "right";
  secondaryInfo?: 'network' | 'balance'
  networkName?: string;
  networkColor?: string;
  balance?: number;
  addressTextStyle?: string;
  avatarSize?: number;
  verified?: boolean;
}

export const AccountInfo = ({
  address,
  label,
  infoPlacement = "right",
  secondaryInfo,
  networkName,
  networkColor,
  balance,
  addressTextStyle = 'text-base-content text-sm text-left',
  avatarSize = 32,
  verified,
  ...rest
}: AccountInfoProps) => {
  const renderInfo = () => {
    const className = classNames(
      "AccountInfo-address",
      {
        "ml-3": infoPlacement === "right",
        "mr-3": infoPlacement === "left",
      },
      addressTextStyle,
    );
    const secondaryInfoWapperClassName = classNames({
      "text-right": infoPlacement === "left",
      "text-left": infoPlacement === "right",
    });
    return (
      <div className={className}>
        {label ? label : getShortAddress(address)}
        {secondaryInfo && (
          <div className={secondaryInfoWapperClassName}>
            {secondaryInfo === 'network' && (
              <NetworkLabel name={networkName} color={networkColor} />
            )}
            {secondaryInfo === 'balance' && balance !== undefined && balance !== null && (
              <AmountInfo amount={balance} symbol="USD" tooltip={false} />
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="AccountInfo flex items-center" {...rest}>
      {infoPlacement === "left" && renderInfo()}
      <Avatar size={avatarSize} address={address} />
      {infoPlacement === "right" && renderInfo()}
      <div>
        {verified && (
          <VerifiedBadge className="w-4 h-4 ml-1" />
        )}
      </div>
    </div>
  );
};
