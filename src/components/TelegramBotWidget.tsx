
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TELEGRAM_BOT_URL = 'http://t.me/SpektraNskCalculyatorBot';

const TelegramBotWidget = () => {
  const [calculationType, setCalculationType] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Обработчик события для открытия бота с определенным типом расчета
    const handleOpenCalculatorChat = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent.detail?.type;
      
      if (type) {
        setCalculationType(type);
        openTelegramBot(type);
      }
    };
    
    window.addEventListener('openCalculatorChat', handleOpenCalculatorChat);
    
    return () => {
      window.removeEventListener('openCalculatorChat', handleOpenCalculatorChat);
    };
  }, []);

  const openTelegramBot = (type?: string) => {
    // Базовый URL Telegram бота
    let botUrl = TELEGRAM_BOT_URL;
    
    // Если указан тип расчета, добавляем его как start параметр
    if (type) {
      botUrl += `?start=${encodeURIComponent(type)}`;
    }
    
    // Открываем Telegram бота в новом окне
    window.open(botUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Button
        onClick={() => openTelegramBot()}
        className="rounded-full w-16 h-16 shadow-lg bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-black flex items-center justify-center"
        size="icon"
        aria-label="Открыть Telegram бота"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
      <span className="absolute -top-10 right-0 bg-zasvet-black text-zasvet-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Калькулятор расчетов
      </span>
    </div>
  );
};

// Экспортируем функцию для вызова из других компонентов
export const openCalculatorChat = (type: string) => {
  // Отправляем событие для открытия чата с определенным типом расчета
  const event = new CustomEvent('openCalculatorChat', { detail: { type } });
  window.dispatchEvent(event);
};

export default TelegramBotWidget;
