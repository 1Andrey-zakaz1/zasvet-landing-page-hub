
import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, Send, MessageSquare, Calculator, Lightbulb, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat/ChatMessage';
import { ChatSuggestions } from './chat/ChatSuggestions';
import { processUserMessage } from './chat/chatLogic';
import type { Message } from './chat/types';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Привет! Я AI-консультант компании "Zасвет". Помогу вам с расчетами освещения, выбором светильников и ответлю на вопросы о наших продуктах. Что вас интересует?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const handleBackToMenu = () => {
    setShowMainMenu(true);
    const backToMenuMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: 'Возвращаемся к главному меню. Выберите интересующий вас вопрос:',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, backToMenuMessage]);
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Скрываем главное меню после первого вопроса
    if (showMainMenu) {
      setShowMainMenu(false);
    }

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Имитируем задержку обработки
    setTimeout(async () => {
      const botResponse = await processUserMessage(messageText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        actions: [
          ...(botResponse.actions || []),
          {
            type: 'menu',
            label: 'Назад к меню',
            data: { action: 'backToMenu' }
          }
        ]
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div 
          onClick={() => setIsOpen(true)}
          className="bg-zasvet-black text-zasvet-gold px-4 py-2 rounded-lg shadow-xl border border-zasvet-gold cursor-pointer hover:bg-zasvet-gray transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-zasvet-gold" />
            <div>
              <div className="font-bold text-center text-sm">AI-Консультант</div>
              <div className="text-xs text-center text-zasvet-gold/80">Навигация и консультации</div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[600px] max-h-[85vh] p-0 flex flex-col bg-white">
          <DialogHeader className="p-4 bg-gradient-to-r from-zasvet-black to-zasvet-gray text-zasvet-white flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-zasvet-gold" />
              <div>
                <DialogTitle className="text-lg">AI-Консультант</DialogTitle>
                <p className="text-zasvet-white/70 text-sm">
                  Помощник по освещению и расчетам
                </p>
              </div>
            </div>
            {!showMainMenu && (
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                size="sm"
                className="bg-transparent border-zasvet-gold text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Меню
              </Button>
            )}
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-[500px] max-h-[60vh]">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    onBackToMenu={handleBackToMenu}
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

            {showMainMenu && (
              <div className="px-4 pb-2 flex-shrink-0">
                <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
              </div>
            )}

            <div className="p-4 border-t bg-gray-50 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос о освещении или расчетах..."
                  className="flex-1 text-zasvet-black placeholder:text-gray-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatWidget;
