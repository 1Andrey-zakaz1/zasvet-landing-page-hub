
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TelegramChat from './TelegramChat';

const TelegramBotWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [calculationType, setCalculationType] = useState<string | undefined>(undefined);

  const toggleChat = () => {
    setChatOpen(prev => !prev);
  };

  // Экспортируем функцию для открытия чата с определенным типом расчета
  const openChatWithCalculation = (type: string) => {
    setCalculationType(type);
    setChatOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group">
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 shadow-lg bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-black flex items-center justify-center"
          size="icon"
          aria-label="Открыть чат с калькулятором"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        <span className="absolute -top-10 right-0 bg-zasvet-black text-zasvet-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Калькулятор расчетов
        </span>
      </div>
      
      <TelegramChat 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        openForCalculation={calculationType} 
      />
    </>
  );
};

// Экспортируем функцию для вызова из других компонентов
export const openCalculatorChat = (type: string) => {
  // Находим экземпляр виджета и вызываем его метод
  const event = new CustomEvent('openCalculatorChat', { detail: { type } });
  window.dispatchEvent(event);
};

export default TelegramBotWidget;
