import React, { FC } from 'react'

export interface HeaderProps {
  title: string | React.ReactNode;
  toolbar?: React.ReactNode;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div className="bg-white w-full p-4">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <div className="text-lg font-semibold text-gray-600">
            {props.title}
          </div>
        </div>
        <div>
          {props.toolbar}
        </div>
      </div>
    </div>
  )
}
