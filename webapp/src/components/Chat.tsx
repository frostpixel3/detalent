import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { FC } from 'react'
import { useForm } from 'react-hook-form';
import { Message } from '../types';
import { Form } from './Form';
import { TextFormInput } from './forms/inputs/TextFormInput';

export interface ChatProps {
  onSendMessage: (data: { message: string }) => void;
  messages: Message[];
  sender: 'CUSTOMER' | 'TALENT';
}

export const Chat: FC<ChatProps> = (props) => {
  const sendMessageForm = useForm<{ message: string }>();
  const onSendMessage = (data: { message: string }) => {
    props.onSendMessage(data);
    sendMessageForm.reset();
  };
  return (
    <div>
      <div className="w-full border border-y p-4 bg-gray-50">
        <div className="flex">
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-400" /> Messages
        </div>
      </div>
      <div className="h-[400px]">
        {props.messages?.map((message) => (
          <div key={message.id} className="p-4">
            <div className={classNames('chat', {
              "chat-end": message.sender === props.sender,
              "chat-start": message.sender === 'TALENT',
            })}>
              <div className={classNames('chat-bubble', {
                'chat-bubble-primary': message.sender === props.sender,
              })}>
                {message.message}
              </div>
            </div>
            <div className="w-full">
              <div className={classNames("text-sm text-gray-400", {
                'flex items-end justify-end': message.sender === props.sender,
              })}>
                {message.createdAt}
              </div>
            </div>
          </div>
        )
        )}
      </div>
      <div>
        <Form form={sendMessageForm} onSubmit={onSendMessage}>
          <div className="bottom-0 left-0 fixed w-full">
            <div className="pl-[256px]">
              <div className="flex p-3 justify-center items-center gap-3">
                <div className="w-full">
                  <TextFormInput name="message" label="" />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
