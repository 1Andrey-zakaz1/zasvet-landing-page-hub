
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
        title: "Лид успешно создан",
        description: `Заявка от ${data.name} отправлена в ERPNext. ID лида: ${result.data?.name || 'неизвестен'}`,
      });
      
      onSuccess();
    } catch (error) {
      console.error("💥 Ошибка при отправке в ERPNext:", error);
      
      // Обрабатываем специальные случаи
      if (error instanceof Error) {
        if (error.message === "DUPLICATE_EMAIL") {
          console.log("📧 Обнаружено дублирование email");
          
          toast({
            title: "Заявка уже существует",
            description: `Заявка с email ${data.email} уже была отправлена ранее. Мы обработаем ваш новый запрос.`,
          });
          
          onSuccess();
          return;
        }
        
        if (error.message === "NETWORK_ERROR") {
          console.log("🌐 Сетевая ошибка - используем резервный метод");
          
          try {
            await submitFallback(data);
            
            toast({
              title: "Заявка принята",
              description: "Возникли проблемы с подключением к основной системе, но ваша заявка сохранена и будет обработана.",
            });
            
            onSuccess();
            return;
          } catch (fallbackError) {
            console.error("💥 Ошибка и в резервном методе:", fallbackError);
          }
        }
      }
      
      // Используем резервный метод для всех остальных ошибок
      try {
        await submitFallback(data);
        
        console.log("🎉 Форма отправлена через резервный метод!");
        
        toast({
          title: "Заявка принята",
          description: "Заявка принята и будет обработана. Мы свяжемся с вами в ближайшее время.",
        });
        
        onSuccess();
      } catch (fallbackError) {
        console.error("💥 Ошибка и в резервном методе:", fallbackError);
        
        toast({
          title: "Ошибка отправки",
          description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону +7 383 312-00-91",
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
