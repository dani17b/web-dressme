import { Route } from "../../routes";
import React from "react";
import { Layout } from "../layout";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Loading } from "../loading";

interface PrivateRouteProps {
  route: Route;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { route } = props;

  const navigate = useNavigate();
  

  if (route.removeLayout) {
    return (
      <div className="w-full h-full relative">
        {route.element}
      </div>
    );
  }

  return (
    <Layout title={route.title}>
      {route.element}
    </Layout>
  );
};
