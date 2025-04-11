
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TelegramBotWidget = () => {
  const openTelegramBot = () => {
    window.open('http://t.me/SpektraNskCalculyatorBot', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openTelegramBot}
        className="rounded-full w-16 h-16 shadow-lg bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-black flex items-center justify-center"
        size="icon"
        aria-label="Открыть Telegram бота"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
      <span className="absolute -top-10 right-0 bg-zasvet-black text-zasvet-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Наш Telegram бот
      </span>
    </div>
  );
};

export default TelegramBotWidget;
