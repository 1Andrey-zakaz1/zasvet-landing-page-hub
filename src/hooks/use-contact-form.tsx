
import React, { createContext, useContext, useState } from "react";
import ContactFormModal from "@/components/ContactFormModal";

type ContactFormType = "contact" | "request";

interface ContactFormContextType {
  openContactForm: (type?: ContactFormType) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
};

export const ContactFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<ContactFormType>("contact");

  const openContactForm = (type: ContactFormType = "contact") => {
    setFormType(type);
    setIsOpen(true);
  };

  return (
    <ContactFormContext.Provider value={{ openContactForm }}>
      {children}
      <ContactFormModal 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        formType={formType} 
      />
    </ContactFormContext.Provider>
  );
};
