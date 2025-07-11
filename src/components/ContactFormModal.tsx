import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const title = formType === "contact" ? "Связаться с нами" : "Оставить заявку";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zasvet-black border-zasvet-gold/30 text-zasvet-white sm:max-w-[600px] h-[700px] p-0">
        <DialogHeader className="px-6 py-4 border-b border-zasvet-gold/30">
          <DialogTitle className="text-2xl text-zasvet-gold">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 w-full">
          <iframe 
            src="https://erp.pkzasvet.ru/форма-обратной-связи" 
            style={{ 
              border: "none", 
              width: "100%", 
              height: "630px",
              display: "block"
            }}
            title="Форма обратной связи ERPNext"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
