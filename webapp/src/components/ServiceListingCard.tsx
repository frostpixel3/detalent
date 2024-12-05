import { FC } from "react";
import { RatingView } from "./RatingView";
import { AccountInfo } from "./AccountInfo";
import { User } from "../types";

export interface ServiceListingCardProps {
  name: string;
  coverImageUrl: string;
  description?: string;
  rating?: number;
  talent?: User;
}

export const ServiceListingCard: FC<ServiceListingCardProps> = ({
  name,
  coverImageUrl,
  talent,
  description,
  rating,
}) => {
  return (
    <div className="bg-base-100 shadow-xl rounded-lg group">
      <div className="w-full h-48 overflow-hidden">
        <div
          className="w-full h-48 bg-no-repeat bg-cover rounded-t-lg transition-all duration-500 ease-in-out transform group-hover:scale-125 overflow-hidden"
          style={{
            backgroundImage: `url(${coverImageUrl})`,
          }}
        />
      </div>
      <div>
        <div className="p-4">
          {rating ? (
            <RatingView rating={rating} />
          ): (
            <div className="text-sm text-gray-400 flex">
              <RatingView rating={0} />
              <span className="ml-1">
                (no reviews yet)
              </span>
            </div>
          )}
          <div className="font-medium mb-2 flex items-center mt-2">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </div>
          </div>
          <div className="text-base-content/75">
            {description}
          </div>
        </div>
        {talent && (
          <div className="border-t">
            <div className="p-4">
              <AccountInfo
                address={talent?.address}
                label={talent.firstName ?? undefined}
                avatarSize={24}
                verified={true}
              />
            </div>
          </div>
        )}
        <p>
        </p>
      </div>
    </div>
  );
};
