import { Dialog, Transition } from "@headlessui/react";
import { BriefcaseIcon, BuildingStorefrontIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment } from "react";
import Logo from "../../assets/logo.png";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { AccountInfo } from "../../components/AccountInfo";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";
import { useAppKitProvider } from "@reown/appkit/react";

export interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navigationTalent = [
  {
    name: 'Your Services',
    path: '/app/talent/services',
    icon: BuildingStorefrontIcon,
  },
];
 
const navigationCustomer = [
  {
    name: 'Explore Talents',
    path: '/app/customer/explore',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Projects In Progress',
    path: '/app/customer/projects',
    icon: BriefcaseIcon,
  },
];

export const Sidebar: FC<SidebarProps> = ({ open, setOpen }) => {
  const disconnect = useDisconnect();
  const { pathname } = useLocation();
  const acc = useAccount();
  const logout = async () => {
    localStorage.removeItem('token');
    await disconnect.disconnectAsync();
    window.location.href = '/';
  };
  const renderMenuContent = () => {
    return (
      <>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <img className="h-5 w-auto" src="/public/detalent-logo-white.png" alt="Workflow" />
          </div>
          <div className="mt-5">
            <label className="text-white text-sm font-semibold opacity-40 ml-2">Talent Center</label>
            <nav className="px-2 space-y-1 mt-2">
              {navigationTalent.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={classNames(
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                    item.path === pathname
                      ? "bg-primary-focus text-primary-content"
                      : "text-primary-content hover:bg-primary-focus/40 hover:text-primary-content"
                  )}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-5">
            <label className="text-white text-sm font-semibold opacity-40 ml-2">Customer Center</label>
            <nav className="px-2 space-y-1 mt-2">
              {navigationCustomer.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={classNames(
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                    item.path === pathname
                      ? "bg-primary-focus text-primary-content"
                      : "text-primary-content hover:bg-primary-focus/40 hover:text-primary-content"
                  )}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 flex bg-primary-focus p-4 w-full">
        <div className="dropdown dropdown-right dropdown-end w-full">
          <div tabIndex={0} role="button" className="btn btn-ghost w-full justify-start">
            <AccountInfo
              address={acc.address}
              addressTextStyle="text-white text-sm text-left"
            />
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a onClick={logout}>Logout</a></li>
          </ul>
        </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={open}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity npm runease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {renderMenuContent()}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" />
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary">
            {renderMenuContent()}
          </div>
        </div>
      </div>
    </>
  );
};
