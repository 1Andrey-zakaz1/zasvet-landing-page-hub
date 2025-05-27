
import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { ChatWidgetButton } from './chat/ChatWidgetButton';
import { ChatDialog } from './chat/ChatDialog';
import { processUserMessage } from './chat/chatLogic';
import type { Message } from './chat/types';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Привет! Я консультант компании "Zасвет". Помогу вам с расчетами освещения, выбором светильников и ответлю на вопросы о наших продуктах. Что вас интересует?',
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
      <ChatWidgetButton onClick={() => setIsOpen(true)} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <ChatDialog
          showMainMenu={showMainMenu}
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          onBackToMenu={handleBackToMenu}
          onSuggestionClick={handleSuggestionClick}
          messagesEndRef={messagesEndRef}
          scrollAreaRef={scrollAreaRef}
        />
      </Dialog>
    </>
  );
};

export default ChatWidget;
