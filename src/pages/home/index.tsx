import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useApi } from "./api";
import { useNavigate } from "react-router-dom";
import { Chat, Message, MessageSide } from "./components/chat";
import { useState } from "react";
import { USERS } from "@/const/Users";
import { QueryResponse } from "@/clients/dressme/src";
import { processMessage } from "./utils";

export const Home = () => {
  const { executeQuery } = useApi();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [outfitLoading, setOutfitLoading] = useState(true);

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
        style={{
          backgroundColor: "red",
        }}
        className="grid grid-cols-8 gap-2 h-full"
      >
        <div className="col-span-3 relative">
            {outfitLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <Spinner size="md" />
                </div>
            )}
            Contenido con la sugerencia de outfit
        </div>
        <div className="col-span-5 h-full">
          <div
            className="w-full h-full"
            style={{
              backgroundColor: "green",
            }}
          >
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
                    debugger;
                    // TODO hacer una peticion a los articulos correspondientes
                    // TODO componer la vista
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
