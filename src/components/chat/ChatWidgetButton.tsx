
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ChatWidgetButtonProps {
  onClick: () => void;
}

export const ChatWidgetButton: React.FC<ChatWidgetButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        onClick={onClick}
        className="bg-zasvet-black text-zasvet-gold px-4 py-2 rounded-lg shadow-xl border border-zasvet-gold cursor-pointer hover:bg-zasvet-gray transition-all duration-300 hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-zasvet-gold" />
          <div>
            <div className="font-bold text-center text-sm">Консультант</div>
            <div className="text-xs text-center text-zasvet-gold/80">Навигация и консультации</div>
          </div>
        </div>
      </div>
    </div>
  );
};
