import { Dresser } from "./pages/dresser";
import { Home } from "./pages/home";

export interface Route {
  path: string;
  element: JSX.Element;
  public?: boolean;
  title? : string;
  showInMenu?: boolean;
  visibleForRoles?: string[];
  menuLink?: {
    name: string;
    link: string;
    key: string;
  };
  removeLayout?: boolean;
}

export const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
    title : "Inicio",
    public: true,
  },
  {
    path: "/dresser",
    title : "Mi armario",
    element: <Dresser />,
    menuLink: {
      name: "Inicio",
      link: "/home",
      key: "home",
    },
    public: true,
  }
];
