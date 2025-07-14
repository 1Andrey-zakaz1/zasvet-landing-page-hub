import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formType?: "contact" | "request";
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  open,
  onOpenChange,
  formType = "contact",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  
  const { toast } = useToast();
  const title = formType === "contact" ? "Связаться с нами" : "Оставить заявку";

  const sendToAPI = async (data: any) => {
    const apiData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || '',
      message: data.message || ''
    };

    const response = await fetch('http://147.45.158.24:8090/contact_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const createMailtoLink = (data: any) => {
    const subject = encodeURIComponent('Новое сообщение с сайта');
    const body = encodeURIComponent(`
Имя: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Компания: ${data.company}

Сообщение:
${data.message}
    `.trim());
    
    const mailtoLink = `mailto:info@pkzasvet.ru?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните имя и email",
        variant: "destructive",
      });
      return;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email адрес",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await sendToAPI(formData);
      
      toast({
        title: "Спасибо!",
        description: "Ваше сообщение отправлено в ERPNext. Мы свяжемся с вами в ближайшее время.",
      });
      
      // Очищаем форму
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      
      // Закрываем модальное окно
      onOpenChange(false);
      
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      
      // Показываем альтернативные способы связи
      toast({
        title: "Возникла техническая проблема",
        description: "Пожалуйста, свяжитесь с нами напрямую: info@pkzasvet.ru или +7 (999) 123-45-67",
        variant: "destructive",
      });
      
      // Создаем mailto ссылку как резерв
      setTimeout(() => {
        const data = {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message
        };
        createMailtoLink(data);
      }, 2000);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Форматирование телефона
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.startsWith('8')) {
        formattedValue = '7' + formattedValue.slice(1);
      }
      if (formattedValue.startsWith('7') && formattedValue.length <= 11) {
        formattedValue = formattedValue.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
      }
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zasvet-black border-zasvet-gold/30 text-zasvet-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-zasvet-gold mb-4">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <p className="text-zasvet-white/80 text-sm">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-zasvet-white">
              Имя <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Введите ваше имя"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-zasvet-white">
              Фамилия
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Введите вашу фамилию"
              value={formData.lastName}
              onChange={handleInputChange}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zasvet-white">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zasvet-white">
              Телефон
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-zasvet-white">
              Компания
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Название компании"
              value={formData.company}
              onChange={handleInputChange}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-zasvet-white">
              Сообщение
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Расскажите о вашем вопросе или пожелании..."
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 resize-none focus:border-zasvet-gold focus:ring-zasvet-gold/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-zasvet-gold to-yellow-500 hover:from-zasvet-gold/90 hover:to-yellow-500/90 text-zasvet-black font-semibold transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:opacity-70"
          >
            <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Отправить сообщение
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-zasvet-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-zasvet-gold/30 text-center">
          <h3 className="text-zasvet-white font-medium mb-3">Или свяжитесь с нами напрямую:</h3>
          <div className="space-y-1 text-sm text-zasvet-white/80">
            <p><strong className="text-zasvet-gold">Email:</strong> info@pkzasvet.ru</p>
            <p><strong className="text-zasvet-gold">Телефон:</strong> +7 (999) 123-45-67</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
