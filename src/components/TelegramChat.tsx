
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Начальные сообщения при открытии чата
const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Добро пожаловать! Я бот-калькулятор от Спектра НСК. Чем я могу помочь?',
    isBot: true,
    timestamp: new Date(),
  },
  {
    id: 2,
    text: 'Вы можете воспользоваться расчетами для освещения, электропроводки и других задач.',
    isBot: true,
    timestamp: new Date(),
  }
];

interface TelegramChatProps {
  isOpen: boolean;
  onClose: () => void;
  openForCalculation?: string; // Опциональный параметр для открытия определенного калькулятора
}

const TelegramChat: React.FC<TelegramChatProps> = ({ isOpen, onClose, openForCalculation }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Прокрутка к последнему сообщению при обновлении списка
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Обработка запросов на расчеты при открытии чата
  useEffect(() => {
    if (openForCalculation && isOpen) {
      handleCalculationRequest(openForCalculation);
    }
  }, [openForCalculation, isOpen]);
  
  const handleCalculationRequest = (calculationType: string) => {
    let botResponse = '';
    
    switch (calculationType) {
      case 'освещение':
        botResponse = 'Для расчета освещения, пожалуйста, укажите параметры помещения (площадь и высоту потолков):';
        break;
      case 'кабель':
        botResponse = 'Для расчета сечения кабеля, пожалуйста, укажите мощность оборудования и длину кабеля:';
        break;
      case 'окупаемость':
        botResponse = 'Для расчета окупаемости светильников, пожалуйста, укажите текущую мощность и потребление, а также стоимость новых светильников:';
        break;
      case 'аналоги':
        botResponse = 'Для подбора аналога светильника, пожалуйста, укажите модель текущего светильника:';
        break;
      default:
        botResponse = 'Я могу помочь с расчетами освещения, сечения кабеля, окупаемости и подбором аналогов. Что именно вас интересует?';
    }
    
    // Добавляем запрос пользователя и ответ бота
    const userMessage: Message = {
      id: messages.length + 1,
      text: `Помогите мне с расчетом: ${calculationType}`,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Имитация задержки ответа бота
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    // Имитация ответа бота
    setTimeout(() => {
      // Простая логика имитации ответа бота
      let botResponse = 'Извините, я пока не могу обработать этот запрос. Рекомендую перейти в полную версию Telegram бота для более детальной консультации.';
      
      if (newMessage.toLowerCase().includes('освещени')) {
        botResponse = 'Для расчета освещения мне нужны данные о помещении. Какая у вас площадь и высота потолков?';
      } else if (newMessage.toLowerCase().includes('кабел') || newMessage.toLowerCase().includes('провод')) {
        botResponse = 'Для расчета сечения кабеля мне нужна информация о мощности подключаемого оборудования и длине кабельной линии.';
      } else if (newMessage.toLowerCase().includes('цен') || newMessage.toLowerCase().includes('стоимост')) {
        botResponse = 'Стоимость наших светильников зависит от модели и количества. Могу предложить составить для вас коммерческое предложение.';
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  if (minimized) {
    return (
      <div className="fixed bottom-20 right-6 z-50 bg-zasvet-black border-2 border-zasvet-gold text-zasvet-white rounded-lg shadow-xl p-2">
        <div className="flex justify-between items-center">
          <span className="text-zasvet-gold font-semibold">Спектра НСК Калькулятор</span>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMinimized(false)} 
              className="h-7 w-7 text-zasvet-gold hover:text-zasvet-white hover:bg-zasvet-gold/20"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="h-7 w-7 text-zasvet-gold hover:text-zasvet-white hover:bg-zasvet-gold/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-20 right-6 z-50 bg-zasvet-black border-2 border-zasvet-gold text-zasvet-white rounded-lg shadow-xl w-80 md:w-96 max-h-[70vh] flex flex-col">
      {/* Заголовок чата */}
      <div className="flex justify-between items-center p-3 border-b border-zasvet-gold/30 bg-zasvet-gold/10">
        <span className="text-zasvet-gold font-semibold">Спектра НСК Калькулятор</span>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMinimized(true)} 
            className="h-7 w-7 text-zasvet-gold hover:text-zasvet-white hover:bg-zasvet-gold/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-7 w-7 text-zasvet-gold hover:text-zasvet-white hover:bg-zasvet-gold/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: '400px' }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isBot 
                  ? 'bg-zasvet-gold/10 text-zasvet-white' 
                  : 'bg-zasvet-gold text-zasvet-black'
              }`}
            >
              <p>{message.text}</p>
              <div className={`text-xs mt-1 ${message.isBot ? 'text-zasvet-white/60' : 'text-zasvet-black/60'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Форма отправки сообщений */}
      <div className="border-t border-zasvet-gold/30 p-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="flex gap-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 rounded-md bg-zasvet-black border border-zasvet-gold/50 text-zasvet-white px-3 py-2 focus:outline-none focus:border-zasvet-gold"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black rounded-md"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <div className="text-xs text-zasvet-white/50 mt-2 text-center">
          Для более подробной консультации, перейдите в наш <a href="http://t.me/SpektraNskCalculyatorBot" target="_blank" rel="noopener noreferrer" className="text-zasvet-gold underline">Telegram бот</a>
        </div>
      </div>
    </div>
  );
};

export default TelegramChat;
