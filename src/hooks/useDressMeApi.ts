import { useEffect, useRef, useState } from "react";
import { Configuration } from "@/clients/dressme/src/runtime";
import * as apis from "@/clients/dressme/src/apis";
import { useConfig } from "@/context/ConfigContext";

interface DressMeApi {
    article: apis.ArticleApiInterface;
    query: apis.QueryApiInterface;
}

const getConfiguration = (apiURL: string) => {
  return new Configuration({
    basePath: apiURL,
    middleware: []
  });
};

const getApi = (config: Configuration) => {
  return {
    article : new apis.ArticleApi(config),
    query : new apis.QueryApi(config),
  }
};

export const useDressMeApi = () => {
  const config = useConfig();
  const [api, setApi] = useState<DressMeApi | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const configuration = getConfiguration(config.apiURL);
    const apiInstances = getApi(configuration);
    setApi(apiInstances);
    initializedRef.current = true;
  }, []);

  return {
    initialized: initializedRef.current,
    ...api,
  };
};
