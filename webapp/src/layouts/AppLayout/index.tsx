import React, { FC, useState } from "react";
import {
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import classNames from "classnames";
import { Web3ConnectBox } from "../../components/Web3ConnectBox";
import { useValidAuth } from "../../hooks/useValidAuth";

export interface AppLayoutProps {
  title?: string;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
  noPadding?: boolean;
  noMainScroll?: boolean;
}

export const AppLayout: FC<AppLayoutProps> = ({ children, title, toolbar, noPadding, noMainScroll }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const validAuth = useValidAuth();
  if (!validAuth) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Web3ConnectBox />
      </div>
    )
  }
  return (
    <div className="h-screen flex overflow-hidden bg-base-200">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className={
          classNames("flex-1 relative z-0 overflow-y-auto focus:outline-none overflow-x-hidden", {
            "overflow-y-auto": !noMainScroll,
          })
        }>
          {title && <Header title={title} toolbar={toolbar ?? null} />}
          {noPadding ? (
            <div>
              {children}
            </div>
          ) : (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  {children}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
