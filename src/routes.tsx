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
    element: <div>Inicio, poner lo principal</div>,
    title : "Inicio",
    public: true,
  },
  {
    path: "/wardoble",
    title : "Mi armario",
    element: <div>Gestionar armario</div>,
    menuLink: {
      name: "Inicio",
      link: "/home",
      key: "home",
    },
    public: true,
  }
];
