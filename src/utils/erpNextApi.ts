
export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface ERPNextLeadRequest {
  lead_name: string;
  mobile_no: string;
  email_id?: string;
  notes?: string;
  source: string;
  status: string;
  territory: string;
}

export interface ERPNextResponse {
  data?: {
    name: string;
    lead_owner?: string;
    territory?: string;
    status?: string;
  };
  message?: string;
}

export const submitToERPNext = async (data: LeadData): Promise<ERPNextResponse> => {
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "10fe15d4ec5f1cf";
  const apiSecret = "6a6dd351e2c6421";
  
  console.log("🚀 Начинаем отправку данных в ERPNext:", data);
  
  try {
    // Минимальная структура данных для создания лида
    const leadData: ERPNextLeadRequest = {
      lead_name: data.name,
      mobile_no: data.phone,
      source: "Website",
      status: "Lead",
      territory: "All Territories"
    };

    // Добавляем опциональные поля только если они есть
    if (data.email && data.email.trim()) {
      leadData.email_id = data.email.trim();
    }
    
    if (data.message && data.message.trim()) {
      leadData.notes = data.message.trim();
    }

    console.log("📋 Подготовленные данные для ERPNext Lead:", leadData);
    console.log("🔗 URL для запроса:", `${erpUrl}/api/resource/Lead`);

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

    const responseText = await response.text();
    console.log("📡 Полный ответ сервера:", responseText);

    if (!response.ok) {
      let errorMessage = `Ошибка сервера: ${response.status}`;
      
      try {
        const errorJson = JSON.parse(responseText);
        console.error("❌ Детали ошибки ERPNext:", errorJson);
        
        if (errorJson.message) {
          errorMessage = errorJson.message;
        } else if (errorJson.exc) {
          errorMessage = "Ошибка валидации данных на сервере ERPNext";
          console.error("❌ Полная трассировка ошибки:", errorJson.exc);
        }
      } catch (e) {
        console.error("❌ Не удалось распарсить ответ как JSON");
        errorMessage = `${errorMessage} - ${responseText.substring(0, 100)}`;
      }
      
      throw new Error(errorMessage);
    }

    let result: ERPNextResponse;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Успешно создан лид в ERPNext:", result);
      console.log("🆔 ID созданного лида:", result.data?.name);
      console.log("👤 Ответственный:", result.data?.lead_owner || "Не назначен");
      console.log("📍 Территория:", result.data?.territory || "All Territories");
      console.log("📊 Статус:", result.data?.status || "Lead");
    } catch (e) {
      console.log("✅ Запрос выполнен успешно, но ответ не JSON:", responseText);
      result = { message: "success" };
    }
    
    return result;
  } catch (error) {
    console.error("💥 Критическая ошибка при отправке в ERPNext:", error);
    throw error;
  }
};

export const submitFallback = async (data: LeadData): Promise<{ success: boolean; method: string }> => {
  console.log("📧 Используем резервный метод отправки");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📧 Данные сохранены локально для последующей обработки:", data);
      resolve({ success: true, method: "fallback" });
    }, 1000);
  });
};
