
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { submitToERPNext, submitFallback, LeadData } from "@/utils/erpNextApi";

export const useContactFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: LeadData, onSuccess: () => void) => {
    console.log("🎯 ДИАГНОСТИКА: Хук начинает обработку формы");
    console.log("🎯 ДИАГНОСТИКА: Входные данные:", data);
    
    setIsSubmitting(true);

    try {
      console.log("🎯 ДИАГНОСТИКА: Вызываем submitToERPNext...");
      const result = await submitToERPNext(data);
      
      console.log("🎉 ДИАГНОСТИКА: Форма успешно отправлена!");
      console.log("📋 ДИАГНОСТИКА: Результат:", result);
      
      toast({
        title: "Лид успешно создан",
        description: `Заявка от ${data.name} отправлена в ERPNext. ID лида: ${result.data?.name || 'неизвестен'}`,
      });
      
      console.log("🎯 ДИАГНОСТИКА: Вызываем onSuccess callback");
      onSuccess();
      
    } catch (error) {
      console.log("💥 ДИАГНОСТИКА: Поймана ошибка в хуке:", error);
      
      if (error instanceof Error) {
        console.log("💥 ДИАГНОСТИКА: Анализируем тип ошибки:", error.message);
        
        if (error.message === "DUPLICATE_EMAIL") {
          console.log("📧 ДИАГНОСТИКА: Обработка дублирования email");
          
          toast({
            title: "Заявка уже существует",
            description: `Заявка с email ${data.email} уже была отправлена ранее. Мы обработаем ваш новый запрос.`,
          });
          
          onSuccess();
          return;
        }
        
        if (error.message === "NETWORK_ERROR") {
          console.log("🌐 ДИАГНОСТИКА: Обработка сетевой ошибки - переходим к резервному методу");
          
          try {
            await submitFallback(data);
            
            toast({
              title: "Заявка принята",
              description: "Возникли проблемы с подключением к основной системе, но ваша заявка сохранена и будет обработана.",
            });
            
            onSuccess();
            return;
          } catch (fallbackError) {
            console.log("💥 ДИАГНОСТИКА: Ошибка и в резервном методе:", fallbackError);
          }
        }
      }
      
      // Для всех остальных ошибок пытаемся резервный метод
      console.log("🔄 ДИАГНОСТИКА: Пробуем резервный метод для прочих ошибок");
      try {
        await submitFallback(data);
        
        console.log("🎉 ДИАГНОСТИКА: Резервный метод сработал!");
        
        toast({
          title: "Заявка принята",
          description: "Заявка принята и будет обработана. Мы свяжемся с вами в ближайшее время.",
        });
        
        onSuccess();
      } catch (fallbackError) {
        console.log("💥 ДИАГНОСТИКА: Критическая ошибка - даже резервный метод не работает:", fallbackError);
        
        toast({
          title: "Ошибка отправки",
          description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону +7 383 312-00-91",
          variant: "destructive",
        });
      }
    } finally {
      console.log("🎯 ДИАГНОСТИКА: Завершение обработки формы");
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm
  };
};
