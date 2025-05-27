
import React from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ChatHeaderProps {
  showMainMenu: boolean;
  onBackToMenu: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ showMainMenu, onBackToMenu }) => {
  return (
    <DialogHeader className="p-4 bg-gradient-to-r from-zasvet-black to-zasvet-gray text-zasvet-white flex flex-row items-center justify-between border-b flex-shrink-0">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-zasvet-gold" />
        <div>
          <DialogTitle className="text-lg">Консультант</DialogTitle>
          <p className="text-zasvet-white/70 text-sm">
            Помощник по освещению и расчетам
          </p>
        </div>
      </div>
      {!showMainMenu && (
        <Button
          onClick={onBackToMenu}
          variant="outline"
          size="sm"
          className="bg-transparent border-zasvet-gold text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Меню
        </Button>
      )}
    </DialogHeader>
  );
};
