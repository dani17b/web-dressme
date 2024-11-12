import { useDressMeApi } from "@/hooks/useDressMeApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useApi = () => {

  const dressMeApi = useDressMeApi();

  const articles = useQuery({
    queryKey: ["articles"],
    enabled: dressMeApi.initialized,
    queryFn: async () => {
      const articlesResponse = await dressMeApi.article?.getArticles();

      return articlesResponse;
    },
  });

  const saveArticle = useMutation({
    mutationKey: ["save_article"],
    mutationFn: async (article : any) => {

      if(article.key){
        const updateArticleResponse = await dressMeApi.article?.updateArticle({
          article,
        }, {
          
        });
  
        return updateArticleResponse;
      }

      const saveArticleResponse = await dressMeApi.article?.createArticle({
        article,
      }, {
        
      });

      return saveArticleResponse;
    },
  });

  return {
    articles,
    saveArticle
  };
};