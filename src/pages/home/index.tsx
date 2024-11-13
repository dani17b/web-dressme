import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useApi } from "./api";
import { useNavigate } from "react-router-dom";
import { Chat, Message, MessageSide } from "./components/chat";
import { useState } from "react";
import { USERS } from "@/const/Users";
import { QueryResponse } from "@/clients/dressme/src";
import { getOutfit, processMessage } from "./utils";
import { Outfit } from "./components/outfit";

export const Home = () => {
  const { executeQuery, getArticles } = useApi();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [outfitLoading, setOutfitLoading] = useState(false);
  const [outfit, setOutfit] = useState<any>(getOutfit([]));

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex">
        <h1 className="w-full">Genera tu outfit</h1>
        <Button
          onPress={() => {
            navigate("/dresser");
          }}
          radius="none"
        >
          Mi armario
        </Button>
      </div>
      <div
        className="grid grid-cols-8 gap-2 h-full"
      >
        <div className="col-span-3 relative">
            {outfitLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <Spinner size="md" />
                </div>
            )}
            <Outfit outfit={outfit} />
        </div>
        <div className="col-span-5 relative">
          
            <Chat
              messages={messages}
              onSubmit={(content: string) => {
                const messageToSend = {
                  user: {
                    ...USERS.user,
                    side: MessageSide.RIGHT,
                  },
                  content: content,
                };

                setMessages([...messages, messageToSend]);

                executeQuery.mutate(content, {
                  onSuccess: (response: QueryResponse | undefined) => {
                    // @ts-ignore
                    let messageContent = processMessage(response?.content?.content || "");

                    const messageResponse: Message = {
                        user: {
                            ...USERS.bot,
                            side: MessageSide.LEFT,
                        },
                        
                        content: messageContent.message,
                    };
                    
                    // TODO analizar el resultado para pintar el outfit que se muestra en la respuesta
                    setMessages((prevMessages : Message[]) => [...prevMessages, messageResponse]);

                    // TODO poner a cargar el outfit
                    getArticles(messageContent.articlesKeys).then((articles) => {
                        console.log(articles);

                        // TODO rehacer la composicion del outfit
                        setOutfit(getOutfit(articles));
                    });
                  },
                });
              }}
            />
        </div>
      </div>
    </div>
  );
};
