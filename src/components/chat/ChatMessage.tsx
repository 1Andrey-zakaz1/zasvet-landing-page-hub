
import React from 'react';
import { Brain, User, Calculator, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const handleActionClick = (action: any) => {
    switch (action.type) {
      case 'navigate':
        const element = document.getElementById(action.data.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Закрываем чат через секунду после навигации
          setTimeout(() => {
            const closeButton = document.querySelector('[data-dialog-close]') as HTMLElement;
            closeButton?.click();
          }, 1000);
        }
        break;
      case 'calculate':
        // Переходим к калькулятору и заполняем поля
        const calcElement = document.getElementById(action.data.calculatorId);
        if (calcElement) {
          calcElement.scrollIntoView({ behavior: 'smooth' });
          // Здесь можно добавить автозаполнение полей калькулятора
        }
        break;
      case 'external':
        window.open(action.data.url, '_blank');
        break;
    }
  };

  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.type === 'user' 
          ? 'bg-zasvet-gold text-zasvet-black' 
          : 'bg-zasvet-black text-zasvet-gold'
      }`}>
        {message.type === 'user' ? (
          <User className="h-4 w-4" />
        ) : (
          <Brain className="h-4 w-4" />
        )}
      </div>
      
      <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-lg ${
          message.type === 'user'
            ? 'bg-zasvet-gold text-zasvet-black'
            : 'bg-gray-100 text-zasvet-black'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {message.actions && message.actions.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                onClick={() => handleActionClick(action)}
                variant="outline"
                size="sm"
                className="mr-2 mb-2 text-xs bg-white hover:bg-zasvet-gold hover:text-zasvet-black border-zasvet-gold text-zasvet-black"
              >
                {action.type === 'navigate' && <ArrowRight className="h-3 w-3 mr-1" />}
                {action.type === 'calculate' && <Calculator className="h-3 w-3 mr-1" />}
                {action.type === 'external' && <ExternalLink className="h-3 w-3 mr-1" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};
