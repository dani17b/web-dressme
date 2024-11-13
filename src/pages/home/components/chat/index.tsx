import { Button, Card, CardBody, Spinner, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Markdown from "react-markdown";
import { CiChat1 } from "react-icons/ci";

export enum MessageSide {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface Message {
  user: {
    name: string;
    photo: string;
    side: MessageSide;
  };
  content: string;
}

interface ChatItemProps {
  message: Message;
}

const ChatItem = (props: ChatItemProps) => {
  const { message } = props;

  return (
    <Card radius="none" className="mb-2">
      <CardBody>
        <div
          className={`flex items-center flex-row ${
            message.user.side == MessageSide.RIGHT
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            style={{
              width: 20,
              height: 20,
            }}
          >
            <img src={message.user.photo} />
          </div>
          <p>{message.user.name}</p>
        </div>
        <div
          className={`flex flex-col ${
            message.user.side == MessageSide.RIGHT
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <Markdown>{message.content}</Markdown>
        </div>
      </CardBody>
    </Card>
  );
};

interface ChatProps {
  messages: Message[];
  onSubmit: (content: string) => void;
  loading: boolean;
}

export const Chat = (props: ChatProps) => {
  const { messages, onSubmit, loading } = props;
  const [content, setContent] = useState("");
  const scrollMessagesRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      // Hacer scroll al final
      // @ts-ignore
      scrollMessagesRef.current?.scrollTo({
        // @ts-ignore
        top: scrollMessagesRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [loading, scrollMessagesRef]);

  return (
    <div className="h-full w-full absolute flex flex-col">
      <div className="overflow-hidden h-full">
        <div className="overflow-auto h-full" ref={scrollMessagesRef}>
          {messages.map((message, index) => (
            <ChatItem key={index} message={message} />
          ))}
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full flex-col">
              <CiChat1 size={48} />
              <p className="mt-2">Empieza a hablar con DressMe</p>
            </div>
          )}
        </div>
        {loading && (
          <div className="flex items-center justify-center h-full w-full z-50 flex-col absolute top-0 bg-white/50">
            <Spinner />
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <Textarea
          label="Description"
          className="w-full"
          radius="none"
          value={content}
          onChange={(e: any) => {
            setContent(e.target.value);
          }}
        />
        <Button
          onPress={() => {
            setContent("");
            onSubmit(content);
          }}
          radius="none"
          className="w-12 h-12 ml-2"
        >
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
};
