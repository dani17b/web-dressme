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
