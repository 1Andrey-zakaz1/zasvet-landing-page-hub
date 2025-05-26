
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Loader2 } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  email: z.string().email({ message: "Введите корректный email" }).optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const submitToERPNext = async (data: FormValues) => {
    const erpUrl = "https://erp.pkzasvet.ru";
    const apiKey = "10fe15d4ec5f1cf";
    const apiSecret = "6a6dd351e2c6421";
    
    console.log("🚀 Начинаем отправку данных в ERPNext с новыми ключами:", data);
    console.log("🔑 Используем API Key:", apiKey);
    console.log("🔐 Используем API Secret:", apiSecret.substring(0, 5) + "...");
    
    try {
      // Формируем данные для создания лида в ERPNext
      const leadData = {
        lead_name: data.name,
        mobile_no: data.phone,
        email_id: data.email || "",
        notes: data.message || "",
        source: "Сайт",
        status: "Lead"
      };

      console.log("📋 Подготовленные данные для ERPNext:", leadData);
      console.log("🔗 URL для запроса:", `${erpUrl}/api/resource/Lead`);
      console.log("🎫 Используем формат аутентификации: token");

      const response = await fetch(`${erpUrl}/api/resource/Lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${apiKey}:${apiSecret}`,
        },
        body: JSON.stringify(leadData),
      });

      console.log("📡 Ответ сервера - статус:", response.status);
      console.log("📡 Ответ сервера - статус текст:", response.statusText);
      console.log("📡 Заголовки ответа:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Ошибка ERPNext - полный текст ответа:", errorText);
        
        // Попробуем распарсить JSON если возможно
        try {
          const errorJson = JSON.parse(errorText);
          console.error("❌ Ошибка ERPNext - JSON:", errorJson);
        } catch (e) {
          console.error("❌ Не удалось распарсить ответ как JSON");
        }
        
        throw new Error(`Ошибка сервера: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log("✅ Успешно создан лид в ERPNext:", result);
      
      return result;
    } catch (error) {
      console.error("💥 Критическая ошибка при отправке в ERPNext:", error);
      
      // Дополнительная информация об ошибке
      if (error instanceof TypeError) {
        console.error("🌐 Возможно проблема с сетью или CORS:", error.message);
      }
      
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log("🎯 Начало обработки формы с данными:", data);
    setIsSubmitting(true);

    try {
      await submitToERPNext(data);
      
      console.log("🎉 Форма успешно отправлена!");
      
      toast({
        title: "Заявка отправлена",
        description: "Ваша заявка успешно создана в системе. Мы свяжемся с вами в ближайшее время.",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("💥 Ошибка при обработке формы:", error);
      
      let errorMessage = "Не удалось отправить заявку. ";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage += "Проблема с подключением к серверу. ";
      } else if (error instanceof Error) {
        errorMessage += `Детали: ${error.message}`;
      }
      
      errorMessage += " Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.";
      
      toast({
        title: "Ошибка отправки",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = formType === "contact" 
    ? "Связаться с нами" 
    : "Оставить заявку";
  
  const description = formType === "contact"
    ? "Заполните форму ниже, и мы свяжемся с вами в ближайшее время"
    : "Оставьте свои контактные данные, и наш менеджер свяжется с вами";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zasvet-black border-zasvet-gold/30 text-zasvet-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-zasvet-gold">{title}</DialogTitle>
          <DialogDescription className="text-zasvet-white/80">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Введите ваше имя" 
                      {...field} 
                      className="bg-zasvet-black/50 border-zasvet-gold/30 focus:border-zasvet-gold" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Телефон <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+7 (___) ___-__-__" 
                      {...field} 
                      className="bg-zasvet-black/50 border-zasvet-gold/30 focus:border-zasvet-gold"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="example@mail.ru" 
                      type="email" 
                      {...field} 
                      className="bg-zasvet-black/50 border-zasvet-gold/30 focus:border-zasvet-gold" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сообщение</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Напишите ваше сообщение здесь" 
                      {...field} 
                      className="bg-zasvet-black/50 border-zasvet-gold/30 focus:border-zasvet-gold min-h-[100px]" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                variant="gold" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Отправка в ERPNext...
                  </>
                ) : (
                  <>
                    <SendHorizontal className="mr-2 h-4 w-4" /> 
                    Отправить
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
