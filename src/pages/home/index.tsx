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
            <Outfit outfit={outfit} loading={outfitLoading}/>
        </div>
        <div className="col-span-5 relative">
          
            <Chat
              messages={messages}
              loading={outfitLoading}
              onSubmit={(content: string) => {
                setOutfitLoading(true);

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
                    
                    // Analizar el resultado para pintar el outfit que se muestra en la respuesta
                    setMessages((prevMessages : Message[]) => [...prevMessages, messageResponse]);

                    getArticles(messageContent.articlesKeys).then((articles) => {
                        setOutfit(getOutfit(articles));
                        setOutfitLoading(false);
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
