
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
    <div className="space-y-2">
      <p className="text-xs text-gray-600 font-medium">Популярные вопросы:</p>
      <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            variant="outline"
            className="justify-start h-auto p-2 text-left bg-white hover:bg-zasvet-gold/10 border-gray-200 hover:border-zasvet-gold text-xs"
          >
            <suggestion.icon className="h-3 w-3 mr-2 text-zasvet-gold flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-zasvet-black truncate">{suggestion.text}</p>
              <p className="text-[10px] text-gray-500">{suggestion.category}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
