
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { sendEmail, submitFallback, LeadData } from "@/utils/erpNextApi";

export const useContactFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: LeadData, onSuccess: () => void) => {
    console.log("🎯 ДИАГНОСТИКА: Хук начинает обработку формы");
    console.log("🎯 ДИАГНОСТИКА: Входные данные:", data);
    console.log("⏰ ДИАГНОСТИКА: Время начала:", new Date().toISOString());
    console.log("🌐 ДИАГНОСТИКА: User Agent:", navigator.userAgent);
    console.log("🌐 ДИАГНОСТИКА: URL страницы:", window.location.href);
    
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
      
      if (error instanceof Error) {
        console.log("💥 ДИАГНОСТИКА: Анализируем тип ошибки:", error.message);
        console.log("💥 ДИАГНОСТИКА: Stack trace:", error.stack);
        
        // Специальная обработка EmailJS ошибок
        if (error.message === "EMAILJS_ACCOUNT_NOT_FOUND") {
          console.log("❌ ДИАГНОСТИКА EmailJS: Аккаунт не найден");
          
          toast({
            title: "Ошибка настройки EmailJS",
            description: "Аккаунт EmailJS не найден. Проверьте Service ID и учетные данные. Используем резервный метод.",
            variant: "destructive",
          });
          
          try {
            await submitFallback(data);
            onSuccess();
            return;
          } catch (fallbackError) {
            console.log("💥 ДИАГНОСТИКА: Ошибка и в резервном методе:", fallbackError);
          }
        }
        
        if (error.message === "EMAILJS_FORBIDDEN") {
          console.log("❌ ДИАГНОСТИКА EmailJS: Доступ запрещен");
          
          toast({
            title: "Ошибка авторизации EmailJS",
            description: "Неверный Public Key EmailJS. Используем резервный метод.",
            variant: "destructive",
          });
          
          try {
            await submitFallback(data);
            onSuccess();
            return;
          } catch (fallbackError) {
            console.log("💥 ДИАГНОСТИКА: Ошибка и в резервном методе:", fallbackError);
          }
        }
        
        if (error.message === "EMAILJS_INVALID_TEMPLATE") {
          console.log("❌ ДИАГНОСТИКА EmailJS: Неверный шаблон");
          
          toast({
            title: "Ошибка шаблона EmailJS",
            description: "Неверный Template ID или параметры шаблона. Используем резервный метод.",
            variant: "destructive",
          });
          
          try {
            await submitFallback(data);
            onSuccess();
            return;
          } catch (fallbackError) {
            console.log("💥 ДИАГНОСТИКА: Ошибка и в резервном методе:", fallbackError);
          }
        }
        
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
            console.log("🔄 ДИАГНОСТИКА: Запускаем резервный метод...");
            await submitFallback(data);
            
            console.log("✅ ДИАГНОСТИКА: Резервный метод выполнен успешно");
            
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
      console.log("🔄 ДИАГНОСТИКА: Тип прочей ошибки:", typeof error);
      
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
      console.log("⏰ ДИАГНОСТИКА: Время завершения:", new Date().toISOString());
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm
  };
};
