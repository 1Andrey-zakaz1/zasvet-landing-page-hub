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
import { sendEmail } from "@/utils/erpNextApi";

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
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  
  const { toast } = useToast();
  const title = formType === "contact" ? "Связаться с нами" : "Оставить заявку";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните имя и телефон",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        toast({
          title: "Успешно!",
          description: result.message,
        });
        
        // Очищаем форму
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        
        // Закрываем модальное окно
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      toast({
        title: "Ошибка отправки",
        description: error instanceof Error ? error.message : "Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону +7 383 312-00-91",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zasvet-white">
              Имя *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zasvet-white">
              Телефон *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zasvet-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-zasvet-white">
              Сообщение
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Расскажите о вашем проекте..."
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="bg-zasvet-black/50 border-zasvet-gold/30 text-zasvet-white placeholder:text-zasvet-white/60 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zasvet-gold hover:bg-zasvet-gold/90 text-zasvet-black font-semibold"
          >
            {isLoading ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
