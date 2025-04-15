
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { openCalculatorChat } from './TelegramBotWidget';

// Consultant photo URL - this could be replaced with an actual uploaded image
const CONSULTANT_PHOTO = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=250&h=250&q=80";

const ElectronicConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Здравствуйте! Я ваш электронный консультант по подбору светильников. Чем могу помочь?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage('');
    
    // After a short delay, simulate consultant response
    setTimeout(() => {
      const responses = [
        "Чтобы помочь подобрать светильник, мне нужно знать где он будет использоваться. Это для дома, офиса или другого помещения?",
        "Для подбора оптимального освещения, важно знать размер помещения. Какая у вас площадь?",
        "Хотите перейти к нашему калькулятору расчётов для более точного подбора светильников?",
      ];
      
      // Choose response based on conversation length
      const responseIndex = Math.min(messages.length - 1, responses.length - 1);
      
      setMessages(prev => [...prev, { 
        text: responses[responseIndex],
        isUser: false
      }]);
      
      // If this is the last predefined message, offer to open calculator
      if (responseIndex === responses.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Нажмите кнопку ниже для перехода к калькулятору подбора светильников",
            isUser: false
          }]);
        }, 1000);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openCalculator = () => {
    setIsOpen(false);
    // Use the openCalculatorChat function from TelegramBotWidget
    setTimeout(() => {
      openCalculatorChat('lighting');
    }, 500);
  };

  return (
    <>
      {/* Floating button to open consultant dialog */}
      <div className="fixed bottom-24 right-6 z-40 group">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              className="rounded-full w-16 h-16 shadow-lg bg-white hover:bg-gray-100 text-zasvet-black border-2 border-zasvet-gold flex items-center justify-center"
              size="icon"
              aria-label="Консультант"
            >
              <User className="h-8 w-8 text-zasvet-gold" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="left">
            <div className="flex flex-col space-y-2">
              <div className="text-lg font-medium">Нужна помощь с выбором светильника?</div>
              <p className="text-sm text-gray-500">Наш консультант поможет подобрать оптимальное решение</p>
              <Button onClick={() => setIsOpen(true)} className="bg-zasvet-gold hover:bg-zasvet-darkgold text-[#161616]">
                <MessageCircle className="mr-2 h-4 w-4" />
                Начать консультацию
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Main consultant dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] bg-white">
          <DialogHeader className="p-4 bg-zasvet-black text-zasvet-white flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3 border-2 border-zasvet-gold">
                <AvatarImage src={CONSULTANT_PHOTO} alt="Консультант" />
                <AvatarFallback>КС</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-lg">Консультант по освещению</DialogTitle>
                <p className="text-xs text-zasvet-white/70">Онлайн</p>
              </div>
            </div>
            <DialogClose className="text-zasvet-white hover:text-zasvet-gold">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>
          
          <div className="flex flex-col h-[60vh]">
            {/* Chat messages area */}
            <Card className="flex-1 overflow-y-auto rounded-none border-0 shadow-none">
              <CardContent className="p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src={CONSULTANT_PHOTO} alt="Консультант" />
                        <AvatarFallback>КС</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-zasvet-gold text-[#161616]' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                      {message.text.includes("Нажмите кнопку ниже") && (
                        <Button 
                          onClick={openCalculator}
                          className="mt-2 w-full bg-zasvet-black hover:bg-zasvet-darkgold text-white"
                        >
                          Открыть калькулятор
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Message input area */}
            <div className="p-3 border-t bg-gray-50 flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Введите сообщение..."
                className="min-h-[3rem] resize-none flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-zasvet-gold hover:bg-zasvet-darkgold text-[#161616]"
                disabled={!newMessage.trim()}
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ElectronicConsultant;
