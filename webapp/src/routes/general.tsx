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
  }
  // ROUTES - END
];
