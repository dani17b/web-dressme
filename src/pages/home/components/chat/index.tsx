import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import Markdown from 'react-markdown';

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
        <div className={`flex flex-col ${message.user.side == MessageSide.RIGHT
              ? "justify-end"
              : "justify-start"}`}>
          <Markdown>{message.content}</Markdown>
        </div>
      </CardBody>
    </Card>
  );
};

interface ChatProps {
  messages: Message[];
  onSubmit: (content: string) => void;
}

export const Chat = (props: ChatProps) => {
  const { messages, onSubmit } = props;

  const [content, setContent] = useState("");
  return (
    <div className="h-full w-full absolute flex flex-col">
      <div
        className="overflow-hidden h-full"
      >
        <div className="overflow-auto h-full">
          {messages.map((message, index) => (
            <ChatItem key={index} message={message} />
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <Textarea label="Description" className="w-full" radius="none" value={content} onChange={(e : any) => {
            setContent(e.target.value);
        }}/>
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
