
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { sendEmail, LeadData } from "@/utils/erpNextApi";

export const useContactFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: LeadData, onSuccess: () => void) => {
    console.log("🎯 ДИАГНОСТИКА: Хук начинает обработку формы");
    console.log("🎯 ДИАГНОСТИКА: Входные данные:", data);
    console.log("⏰ ДИАГНОСТИКА: Время начала:", new Date().toISOString());
    
    setIsSubmitting(true);

    try {
      console.log("📧 ДИАГНОСТИКА: Отправляем заявку по email...");
      const result = await sendEmail(data);
      
      console.log("🎉 ДИАГНОСТИКА: Email отправлен!");
      console.log("📋 ДИАГНОСТИКА: Результат:", result);
      console.log("⏰ ДИАГНОСТИКА: Время успеха:", new Date().toISOString());
      
      toast({
        title: "Заявка отправлена",
        description: result.message,
      });
      
      console.log("🎯 ДИАГНОСТИКА: Вызываем onSuccess callback");
      onSuccess();
      
    } catch (error) {
      console.log("💥 ДИАГНОСТИКА: Поймана ошибка в хуке:", error);
      console.log("⏰ ДИАГНОСТИКА: Время ошибки:", new Date().toISOString());
      
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону +7 962 831 16 06",
        variant: "destructive",
      });
      
    } finally {
      console.log("🎯 ДИАГНОСТИКА: Завершение обработки формы");
      console.log("⏰ ДИАГНОСТИКА: Время завершения:", new Date().toISOString());
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm
  };
};
