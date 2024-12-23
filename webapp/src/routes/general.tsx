import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { DeployPage } from "../pages/DeployPage.tsx";
import { ConfigureContractPage } from "../pages/ConfigureContractPage.tsx";
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { AppTalentServicesIndexPage } from "../pages/app/talent/services/Index.tsx";
import { AppTalentServicesCreate } from "../pages/app/talent/services/Create.tsx";
import { AppTalentServicesViewPage } from "../pages/app/talent/services/View.tsx";
import { AppCustomerProjectsView } from "../pages/app/customer/projects/View.tsx";
import { AppCustomerProjectsIndex } from "../pages/app/customer/projects/Index.tsx";
import { AppTalentProjectsView } from "../pages/app/talent/projects/View.tsx";
import { AppCustomerExplore } from "../pages/app/customer/Explore.tsx";

export const general: RouteObject[] = [
  // ROUTES - START
  {
    path: PATHS.deploy,
    element: <DeployPage />
  },
  {
    path: PATHS.configureContract,
    element: <ConfigureContractPage />
  },
  {
    path: PATHS.index,
    element: <IndexPage />,
  },
  {
    path: PATHS.app,
    element: <AppIndexPage />,
  },
  {
    path: '/app/talent/services',
    element: <AppTalentServicesIndexPage />
  },
  {
    path: '/app/talent/services/create',
    element: <AppTalentServicesCreate />
  },
  {
    path: '/app/talent/services/:id',
    element: <AppTalentServicesViewPage />
  },
  {
    path: '/app/talent/projects/:id',
    element: <AppTalentProjectsView />
  },
  {
    path: '/app/customer/projects',
    element: <AppCustomerProjectsIndex />
  },
  {
    path: '/app/customer/projects/:id',
    element: <AppCustomerProjectsView />
  },
  {
    path: '/app/customer/explore',
    element: <AppCustomerExplore />
  }
  // ROUTES - END
];
