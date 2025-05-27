
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatSuggestions } from './ChatSuggestions';

interface ChatInputAreaProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  showMainMenu: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress,
  isTyping,
  showMainMenu,
  onSuggestionClick
}) => {
  return (
    <>
      {showMainMenu && (
        <div className="px-4 pb-2 flex-shrink-0 border-t bg-gray-50">
          <div className="py-3">
            <ChatSuggestions onSuggestionClick={onSuggestionClick} />
          </div>
        </div>
      )}

      <div className="p-4 border-t bg-gray-50 flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Задайте вопрос о освещении или расчетах..."
            className="flex-1 text-zasvet-black placeholder:text-gray-500"
            disabled={isTyping}
          />
          <Button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
