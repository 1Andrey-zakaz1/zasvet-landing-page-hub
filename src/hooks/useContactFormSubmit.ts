
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { submitToERPNext, submitFallback, LeadData } from "@/utils/erpNextApi";

export const useContactFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: LeadData, onSuccess: () => void) => {
    console.log("🎯 Начало обработки формы с данными:", data);
    setIsSubmitting(true);

    try {
      // Пытаемся отправить в ERPNext
      const result = await submitToERPNext(data);
      
      console.log("🎉 Форма успешно отправлена в ERPNext!");
      console.log("📋 Результат создания лида:", result);
      
      toast({
        title: "Лид успешно создан в ERPNext",
        description: `Заявка от ${data.name} создана в системе. ID лида: ${result.data?.name || 'неизвестен'}`,
      });
      
      onSuccess();
    } catch (error) {
      console.error("💥 Ошибка при отправке в ERPNext:", error);
      
      try {
        // Используем резервный метод
        await submitFallback(data);
        
        console.log("🎉 Форма отправлена через резервный метод!");
        
        toast({
          title: "Заявка принята",
          description: "Заявка принята и будет обработана. Мы свяжемся с вами в ближайшее время. (резервный режим)",
        });
        
        onSuccess();
      } catch (fallbackError) {
        console.error("💥 Ошибка и в резервном методе:", fallbackError);
        
        let errorMessage = "Не удалось отправить заявку. ";
        
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage += "Проблема с подключением к интернету. ";
          } else if (error.message.includes('401') || error.message.includes('403')) {
            errorMessage += "Ошибка авторизации на сервере. ";
          } else if (error.message.includes('500')) {
            errorMessage += "Внутренняя ошибка сервера. ";
          } else {
            errorMessage += `Ошибка: ${error.message}. `;
          }
        }
        
        errorMessage += "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.";
        
        toast({
          title: "Ошибка отправки",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm
  };
};
