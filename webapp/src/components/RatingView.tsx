import React, { FC, useMemo } from 'react'

export interface RatingViewProps {
  rating: number;
}

export const RatingView: FC<RatingViewProps> = (props) => {
  const rating = useMemo(() => {
    return Math.min(5, Math.max(0, props.rating));
  }, [props.rating]);
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div key={index} className="flex items-center">
            {index < rating ? (
              <div className="w-4 h-4 bg-orange-400 mask mask-star-2" />
            ) : (
              <div className="w-4 h-4 bg-gray-200 mask mask-star-2" />
            )}
          </div>
        );
      })}
    </div>
  )
}
