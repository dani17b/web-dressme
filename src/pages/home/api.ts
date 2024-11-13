import { useDressMeApi } from "@/hooks/useDressMeApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useApi = () => {
  const dressMeApi = useDressMeApi();

  const executeQuery = useMutation({
    mutationKey: ["execute_query"],
    mutationFn: async (query: string) => {
      const executeQueryResponse = await dressMeApi.query?.evaluateQuery(
        {
          body: {
            data: {
                content: query,
            },
          },
        },
        {}
      );

      return executeQueryResponse;
    },
  });

  const getArticles = async (keys : string[]) => {
      return await dressMeApi.article?.getArticles({
        keys
      });
  }

  return {
    executeQuery,
    getArticles
  };
};
