
import React from 'react';
import { Calculator, Lightbulb, HelpCircle, Search, Cable, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      icon: Search,
      text: 'Как найти нужный светильник в каталоге?',
      category: 'Каталог'
    },
    {
      icon: Calculator,
      text: 'Рассчитать окупаемость LED-освещения',
      category: 'Расчеты'
    },
    {
      icon: Lightbulb,
      text: 'Сколько светильников нужно для помещения?',
      category: 'Проектирование'
    },
    {
      icon: Cable,
      text: 'Какое сечение кабеля выбрать?',
      category: 'Электрика'
    },
    {
      icon: Zap,
      text: 'Что означает IP-рейтинг светильника?',
      category: 'Вопросы'
    },
    {
      icon: HelpCircle,
      text: 'Нужна консультация специалиста',
      category: 'Помощь'
    }
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 font-medium">Популярные вопросы:</p>
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            variant="outline"
            className="justify-start h-auto p-3 text-left bg-white hover:bg-zasvet-gold/10 border-gray-200 hover:border-zasvet-gold"
          >
            <suggestion.icon className="h-4 w-4 mr-3 text-zasvet-gold flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-zasvet-black">{suggestion.text}</p>
              <p className="text-xs text-gray-500">{suggestion.category}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
