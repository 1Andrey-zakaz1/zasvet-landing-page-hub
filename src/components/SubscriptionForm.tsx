
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContactFormSubmit } from "@/hooks/useContactFormSubmit";

const subscriptionSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  email: z.string().email("Некорректный email"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const SubscriptionForm = () => {
  const { isSubmitting, submitForm } = useContactFormSubmit();
  
  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    const leadData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: "Подписка",
    };

    await submitForm(leadData, () => {
      form.reset();
    });
  };

  return (
    <div>
      <h3 className="text-zasvet-gold font-semibold text-lg mb-4">Подписка</h3>
      <p className="mb-4">Подпишитесь на наши новости</p>
      
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
                    placeholder="Ваше имя" 
                    {...field}
                    className="bg-zasvet-gray/30 border border-zasvet-gray/50 text-white placeholder:text-zasvet-white/60 focus:ring-zasvet-gold"
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
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ваш телефон" 
                    {...field}
                    className="bg-zasvet-gray/30 border border-zasvet-gray/50 text-white placeholder:text-zasvet-white/60 focus:ring-zasvet-gold"
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
                    type="email"
                    placeholder="Ваш email" 
                    {...field}
                    className="bg-zasvet-gray/30 border border-zasvet-gray/50 text-white placeholder:text-zasvet-white/60 focus:ring-zasvet-gold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black w-full"
          >
            {isSubmitting ? "Отправка..." : "Подписаться"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscriptionForm;
