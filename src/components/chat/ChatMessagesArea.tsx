
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import type { Message } from './types';

interface ChatMessagesAreaProps {
  messages: Message[];
  isTyping: boolean;
  onBackToMenu: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessagesArea: React.FC<ChatMessagesAreaProps> = ({ 
  messages, 
  isTyping, 
  onBackToMenu, 
  messagesEndRef, 
  scrollAreaRef 
}) => {
  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onBackToMenu={onBackToMenu}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-zasvet-black/60">
            <HelpCircle className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Консультант печатает...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
