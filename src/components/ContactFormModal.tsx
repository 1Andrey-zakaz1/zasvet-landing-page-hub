import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { SendHorizontal, Loader2, TestTube, Zap, Settings } from "lucide-react";
import { useContactFormSubmit } from "@/hooks/useContactFormSubmit";
import { LeadData, testERPNextConnection } from "@/utils/erpNextApi";
import { runIndependentAPITest } from "@/utils/independentApiTest";
import { testCorsAfterNginxFix } from "@/utils/corsPostFixTest";
import { toast } from "@/hooks/use-toast";

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
  const { isSubmitting, submitForm } = useContactFormSubmit();
  const [isTestingAPI, setIsTestingAPI] = React.useState(false);
  const [isRunningIndependentTest, setIsRunningIndependentTest] = React.useState(false);
  const [isTestingCorsPostFix, setIsTestingCorsPostFix] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const testAPIConnection = async () => {
    setIsTestingAPI(true);
    console.log("🧪 Запускаем тест API подключения...");
    
    try {
      const result = await testERPNextConnection();
      
      if (result.success) {
        toast({
          title: "✅ API подключение работает!",
          description: result.details,
        });
      } else {
        toast({
          title: "❌ Проблема с API подключением",
          description: result.details,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("💥 Ошибка при тестировании API:", error);
      toast({
        title: "❌ Ошибка тестирования API",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsTestingAPI(false);
    }
  };

  const runIndependentTest = async () => {
    setIsRunningIndependentTest(true);
    console.log("⚡ Запускаем независимый тест API...");
    
    try {
      const result = await runIndependentAPITest();
      
      if (result.success) {
        toast({
          title: "🎉 Независимый тест пройден!",
          description: `${result.passed}/${result.total} тестов успешно. Проверьте консоль для деталей.`,
        });
      } else {
        toast({
          title: "⚠️ Независимый тест показал проблемы",
          description: `${result.passed}/${result.total} тестов прошли. Смотрите консоль для подробностей.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("💥 Ошибка в независимом тесте:", error);
      toast({
        title: "❌ Ошибка независимого теста",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsRunningIndependentTest(false);
    }
  };

  const testCorsAfterFix = async () => {
    setIsTestingCorsPostFix(true);
    console.log("🔧 Запускаем тест CORS после настройки nginx...");
    
    try {
      const result = await testCorsAfterNginxFix();
      
      if (result.corsWorking) {
        toast({
          title: "🎉 CORS работает после настройки nginx!",
          description: `${result.passed}/${result.total} тестов пройдено. Настройки nginx сработали!`,
        });
      } else {
        toast({
          title: "⚠️ CORS все еще не работает",
          description: `${result.passed}/${result.total} тестов пройдено. Возможно, нужно перезапустить nginx.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("💥 Ошибка при тестировании CORS после настройки:", error);
      toast({
        title: "❌ Ошибка теста CORS",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsTestingCorsPostFix(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Convert form data to LeadData format
    const leadData: LeadData = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message || undefined,
    };

    await submitForm(leadData, () => {
      form.reset();
      onOpenChange(false);
    });
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
          <DialogTitle className="text-2xl text-zasvet-gold flex items-center justify-between">
            {title}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={testAPIConnection}
                disabled={isTestingAPI}
              >
                {isTestingAPI ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" /> 
                    Тест...
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-3 w-3" /> 
                    Старый
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={runIndependentTest}
                disabled={isRunningIndependentTest}
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                {isRunningIndependentTest ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" /> 
                    Тест...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-3 w-3" /> 
                    Независимый
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={testCorsAfterFix}
                disabled={isTestingCorsPostFix}
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                {isTestingCorsPostFix ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" /> 
                    Тест...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-3 w-3" /> 
                    После nginx
                  </>
                )}
              </Button>
            </div>
          </DialogTitle>
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
                  <FormLabel>Имя <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Введите ваше имя" 
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
                    Отправка...
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
