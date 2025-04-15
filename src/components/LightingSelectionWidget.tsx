
import React from 'react';
import { Lightbulb, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { openCalculatorChat } from './TelegramBotWidget';

const LightingSelectionWidget = () => {
  const [question, setQuestion] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Open the Telegram bot chat with the user's question
      openCalculatorChat(`lighting_selection:${question}`);
      setQuestion('');
    }
  };

  return (
    <section id="consultant" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Подбор освещения</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Consultant Photo Side */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute -top-4 -right-4 bg-zasvet-gold text-zasvet-black rounded-full p-3">
                <Lightbulb className="h-6 w-6" />
              </div>
              <img 
                src="/lovable-uploads/76c20b7b-830e-49ef-93cd-8419a1e8892d.png" 
                alt="Электронный консультант" 
                className="rounded-lg w-full max-w-sm border-2 border-zasvet-gold/30"
              />
            </div>
            <div className="text-center max-w-sm">
              <h3 className="text-xl font-bold text-zasvet-gold mb-2">Электронный консультант</h3>
              <p className="text-zasvet-white/80">
                Наш умный помощник поможет подобрать оптимальное освещение для вашего проекта.
                Задайте вопрос или опишите вашу задачу!
              </p>
            </div>
          </div>
          
          {/* Dialog Widget Side */}
          <div>
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl">
              <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Калькулятор подбора освещения
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-zasvet-gray/20 rounded-lg p-4 mb-6 text-zasvet-white">
                  <p className="mb-3 text-zasvet-gold font-medium">Консультант:</p>
                  <p>
                    Здравствуйте! Я помогу вам подобрать идеальное освещение для вашего проекта.
                    Расскажите мне о помещении, его размерах и для чего оно используется.
                  </p>
                </div>
                
                <div className="bg-zasvet-gray/30 rounded-lg p-4 mb-4 text-zasvet-white">
                  <p className="mb-2 text-zasvet-gold/80 font-medium">Примеры вопросов:</p>
                  <ul className="list-disc pl-5 space-y-1 text-zasvet-white/90">
                    <li>Какое освещение нужно для офиса площадью 40м²?</li>
                    <li>Помогите подобрать свет для производственного цеха</li>
                    <li>Требуется освещение для торгового зала</li>
                  </ul>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Введите ваш вопрос..."
                      className="bg-zasvet-gray/20 border-zasvet-gold/30 text-zasvet-white pl-4 pr-12 py-6"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black"
                      disabled={!question.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black font-medium"
                    onClick={() => openCalculatorChat('lighting_calculator')}
                  >
                    Открыть полный калькулятор расчетов
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightingSelectionWidget;
