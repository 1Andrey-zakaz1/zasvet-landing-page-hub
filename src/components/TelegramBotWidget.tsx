
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

const TELEGRAM_BOT_USERNAME = 'SpektraNskCalculyatorBot';

const TelegramBotWidget = () => {
  const [calculationType, setCalculationType] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Обработчик события для открытия бота с определенным типом расчета
    const handleOpenCalculatorChat = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent.detail?.type;
      
      if (type) {
        setCalculationType(type);
        setIsOpen(true);
      }
    };
    
    window.addEventListener('openCalculatorChat', handleOpenCalculatorChat);
    
    return () => {
      window.removeEventListener('openCalculatorChat', handleOpenCalculatorChat);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group">
        <Button
          onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
          <DialogHeader className="p-4 bg-zasvet-black text-zasvet-white flex flex-row items-center justify-between">
            <DialogTitle className="text-lg">Калькулятор расчетов</DialogTitle>
            <DialogClose className="text-zasvet-white hover:text-zasvet-gold">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>
          <div className="w-full h-[70vh]">
            <iframe 
              title="Telegram Bot"
              src={`https://t.me/${TELEGRAM_BOT_USERNAME}${calculationType ? `?start=${encodeURIComponent(calculationType)}` : ''}`}
              width="100%" 
              height="100%" 
              frameBorder="0"
              allow="clipboard-write; clipboard-read"
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Экспортируем функцию для вызова из других компонентов
export const openCalculatorChat = (type: string) => {
  // Отправляем событие для открытия чата с определенным типом расчета
  const event = new CustomEvent('openCalculatorChat', { detail: { type } });
  window.dispatchEvent(event);
};

export default TelegramBotWidget;
