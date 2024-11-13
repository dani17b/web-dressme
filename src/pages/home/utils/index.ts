import { Article, ArticleResponse } from "@/clients/dressme/src";

export const processMessage = (messageContent: string) => {
  const searchStrOpen = "<!--";
  const indexesOpen = [
    // @ts-ignore
    ...messageContent.matchAll(new RegExp(searchStrOpen, "gi")),
  ].map((a) => a.index);

  const searchStrClose = "-->";
  const indexesClose = [
    // @ts-ignore
    ...messageContent.matchAll(new RegExp(searchStrClose, "gi")),
  ].map((a) => a.index);

  // Primero se obtienes los articulos
  let articlesKeys = [];
  for(let i = 0; i < indexesOpen.length; i++) {
    const article = messageContent.substring(indexesOpen[i], indexesClose[i]);

    articlesKeys.push(article.slice(indexesOpen.length).split(':')[1].trim());
  }

  // Eliminar los comentarios
  let refIndex = 0;
  let message = '';
  for(let i = 0; i < indexesOpen.length; i++) {
    message += messageContent.substring(refIndex, indexesOpen[i]);
    refIndex = indexesClose[i] + searchStrClose.length;
  }

  message += messageContent.substring(refIndex);

  return {
    message,
    articlesKeys,
  };
};

export const getOutfit = (articles : ArticleResponse[] | undefined) => {
    const TORSO_CATEGORIES = ['t-shirt'];
    const LEGS_CATEGORIES = ['pants'];
    const FEET_CATEGORIES = ['shoes'];

    // Hay 3 partes en un outfit, torso, que puede tener 2 piezas piernas que puede tener 1 pieza y zapatos que puede tener 1 pieza
    const outfit = {
        torso : articles?.filter((article : ArticleResponse) => TORSO_CATEGORIES.indexOf(article.category) != -1),
        legs : articles?.filter((article : ArticleResponse) => LEGS_CATEGORIES.indexOf(article.category) != -1),
        feet : articles?.filter((article : ArticleResponse) => FEET_CATEGORIES.indexOf(article.category) != -1),
    };

    return outfit;
}
