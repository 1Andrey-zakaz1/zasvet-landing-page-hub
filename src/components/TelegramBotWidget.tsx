import React, { useState, useEffect, useRef } from 'react';
import { Brain, X, ExternalLink, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

// Используем имя бота из предыдущей реализации
const TELEGRAM_BOT_USERNAME = 'SpektraNskCalculyatorBot';

const TelegramBotWidget = () => {
  const [calculationType, setCalculationType] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("redirect");
  const [noTelegramOpen, setNoTelegramOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Инициализация Telegram Web App при открытии модального окна
  useEffect(() => {
    if (isOpen && activeTab === "redirect") {
      // Добавляем скрипт Telegram Web App только если модальное окно открыто
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', TELEGRAM_BOT_USERNAME);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-request-access', 'write');
      
      if (calculationType) {
        script.setAttribute('data-auth-url', `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(calculationType)}`);
      }
      
      // Удаляем предыдущие скрипты Telegram, если они есть
      const telegramContainer = document.getElementById('telegram-login-container');
      if (telegramContainer) {
        while (telegramContainer.firstChild) {
          telegramContainer.removeChild(telegramContainer.firstChild);
        }
        telegramContainer.appendChild(script);
      }
    }
  }, [isOpen, calculationType, activeTab]);

  // Загрузка виджета Telegram для встроенного чата
  useEffect(() => {
    if (isOpen && activeTab === "embed" && iframeRef.current) {
      // Загружаем встроенный виджет Telegram
      setEmbedOpen(true);
    }
  }, [isOpen, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleNoTelegramSubmit = () => {
    // В будущем здесь можно реализовать отправку сообщения через ваш собственный API
    console.log('Сообщение от пользователя без Telegram:', userMessage);
    alert('Ваше сообщение получено! Мы свяжемся с вами в ближайшее время.');
    setUserMessage('');
    setNoTelegramOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Кликабельный прямоугольник с надписью и иконкой */}
        <div 
          onClick={() => setIsOpen(true)}
          className="bg-zasvet-black text-zasvet-gold px-4 py-2 rounded-lg shadow-xl border border-zasvet-gold cursor-pointer hover:bg-zasvet-gray transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-zasvet-gold" />
            <div>
              <div className="font-bold text-center text-sm">AI-Консультант</div>
              <div className="text-xs text-center text-zasvet-gold/80">Расчеты и консультации</div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
          <DialogHeader className="p-4 bg-gradient-to-r from-zasvet-black to-zasvet-gray text-zasvet-white flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-zasvet-gold" />
              <div>
                <DialogTitle className="text-lg">AI-Консультант</DialogTitle>
                <DialogDescription className="text-zasvet-white/70">
                  Общение с Telegram-ботом для расчетов
                </DialogDescription>
              </div>
            </div>
            <DialogClose className="text-zasvet-white hover:text-zasvet-gold">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>
          
          <div className="w-full min-h-[70vh] flex flex-col">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="redirect" className="text-zasvet-black">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть в Telegram
                </TabsTrigger>
                <TabsTrigger value="embed" className="text-zasvet-black">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Общаться на сайте
                </TabsTrigger>
                <TabsTrigger value="noTelegram" className="text-zasvet-black">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Нет Telegram
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="redirect" className="p-6 flex flex-col items-center justify-center">
                <div id="telegram-login-container" className="telegram-login-container w-full flex justify-center"></div>
                
                <div className="mt-6 text-center">
                  <p className="text-zasvet-black mb-4">Нажмите кнопку ниже, чтобы открыть Telegram бота</p>
                  <a 
                    href={`https://t.me/${TELEGRAM_BOT_USERNAME}${calculationType ? `?start=${encodeURIComponent(calculationType)}` : ''}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#0088cc] text-white hover:bg-[#0077b5] transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 110 20 10 10 0 010-20zm5.894 14.553l-1.372.8a1.03 1.03 0 01-1.042-.018c-.712-.454-1.35-.856-1.891-1.2 1.24-1.052 3.053-3.048 3.93-5.035.092-.211-.068-.442-.288-.413a.421.421 0 00-.214.09c-2.152 1.672-4.412 3.356-6.774 5.052-.509-.201-1.096-.334-1.276-.364l-.101-.024a.582.582 0 01-.493-.59c.004-.23.117-.435.302-.532l.596-.3c2.301-1.15 5.825-2.9 8.553-4.242.199-.1.436.077.336.347a158.39 158.39 0 01-1.269 5.286c-.56.209-.199.365-.397.443z"/>
                    </svg>
                    Открыть в Telegram
                  </a>
                </div>
              </TabsContent>
              
              <TabsContent value="embed" className="flex-1">
                <Sheet open={embedOpen} onOpenChange={setEmbedOpen}>
                  <SheetContent side="bottom" className="h-[85vh] sm:h-[85vh] p-0">
                    <SheetHeader className="p-4 bg-zasvet-black text-zasvet-white">
                      <SheetTitle className="text-zasvet-white">Чат с ботом</SheetTitle>
                      <SheetDescription className="text-zasvet-white/70">
                        Общение с Telegram-ботом внутри сайта
                      </SheetDescription>
                    </SheetHeader>
                    <div className="h-full w-full">
                      <iframe
                        ref={iframeRef}
                        title="Telegram Widget"
                        src={`https://telegram.im/@${TELEGRAM_BOT_USERNAME}${calculationType ? `?start=${encodeURIComponent(calculationType)}` : ''}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="w-full h-[calc(100vh-10rem)]"
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-zasvet-black">Общайтесь с ботом прямо на сайте</h3>
                    <p className="text-zasvet-black/70 mb-2">
                      Вы можете использовать нашего бота, не покидая сайт. 
                    </p>
                    <p className="text-zasvet-black/70 mb-6 font-medium">
                      Требуется учетная запись Telegram для работы с ботом.
                    </p>
                    
                    <Button 
                      className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black font-medium text-lg px-8 py-6 h-auto"
                      onClick={() => setEmbedOpen(true)}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Открыть чат на сайте
                    </Button>
                  </div>
                  
                  <div className="w-full max-w-md bg-gray-100 rounded-lg p-4">
                    <h4 className="font-medium text-zasvet-black mb-2">Преимущества общения на сайте:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-zasvet-black/80">
                      <li>Быстрый доступ ко всем функциям калькулятора</li>
                      <li>Сохранение истории расчетов</li>
                      <li>Удобное переключение между разделами сайта</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="noTelegram" className="p-6">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4 text-zasvet-black">У вас нет Telegram?</h3>
                  
                  <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-zasvet-black mb-2">Что такое Telegram?</h4>
                    <p className="text-zasvet-black/80 mb-3">
                      Telegram — это бесплатный мессенджер, который работает на всех устройствах и позволяет легко 
                      общаться с нашим ботом для расчетов. Вы можете установить его на телефон, планшет или компьютер.
                    </p>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-zasvet-black mb-2">Как установить Telegram:</h5>
                      <ol className="list-decimal pl-5 space-y-1 text-zasvet-black/80">
                        <li>Скачайте приложение из App Store, Google Play или с <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">официального сайта</a></li>
                        <li>Зарегистрируйтесь, указав свой номер телефона</li>
                        <li>Подтвердите регистрацию, введя код из SMS</li>
                      </ol>
                    </div>
                    
                    <a 
                      href="https://telegram.org/dl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#0088cc] text-white hover:bg-[#0077b5] transition-colors"
                    >
                      Установить Telegram
                    </a>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-zasvet-black mb-3">Отправить запрос без Telegram</h4>
                    <p className="text-zasvet-black/70 mb-4">
                      Если вы не хотите устанавливать Telegram, вы можете оставить свое сообщение ниже, 
                      и мы свяжемся с вами для предоставления необходимых расчетов.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-zasvet-black mb-1">
                          Ваше сообщение
                        </label>
                        <Textarea 
                          id="message"
                          placeholder="Опишите, какие расчеты вам нужны..."
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleNoTelegramSubmit}
                        className="w-full bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black"
                        disabled={!userMessage.trim()}
                      >
                        Отправить запрос
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
