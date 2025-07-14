
import React, { createContext, useContext } from "react";

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
  const openContactForm = (type: ContactFormType = "contact") => {
    const url = "https://erp.pkzasvet.ru/contact-us";
    const windowFeatures = "width=800,height=700,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no";
    
    window.open(url, "_blank", windowFeatures);
  };

  return (
    <ContactFormContext.Provider value={{ openContactForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};
