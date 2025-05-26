
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
import { SendHorizontal, Loader2 } from "lucide-react";
import { useContactFormSubmit } from "@/hooks/useContactFormSubmit";
import { LeadData } from "@/utils/erpNextApi";

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

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
