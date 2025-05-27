
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { ChatHeader } from './ChatHeader';
import { ChatMessagesArea } from './ChatMessagesArea';
import { ChatInputArea } from './ChatInputArea';
import type { Message } from './types';

interface ChatDialogProps {
  showMainMenu: boolean;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onBackToMenu: () => void;
  onSuggestionClick: (suggestion: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

export const ChatDialog: React.FC<ChatDialogProps> = ({
  showMainMenu,
  messages,
  isTyping,
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress,
  onBackToMenu,
  onSuggestionClick,
  messagesEndRef,
  scrollAreaRef
}) => {
  return (
    <DialogContent className="sm:max-w-[500px] md:max-w-[600px] h-[85vh] p-0 flex flex-col bg-white">
      <ChatHeader 
        showMainMenu={showMainMenu} 
        onBackToMenu={onBackToMenu} 
      />

      <div className="flex-1 flex flex-col min-h-0">
        <ChatMessagesArea
          messages={messages}
          isTyping={isTyping}
          onBackToMenu={onBackToMenu}
          messagesEndRef={messagesEndRef}
          scrollAreaRef={scrollAreaRef}
        />

        <ChatInputArea
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
          isTyping={isTyping}
          showMainMenu={showMainMenu}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    </DialogContent>
  );
};
