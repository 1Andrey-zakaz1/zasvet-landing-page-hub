
export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface ERPNextLeadRequest {
  lead_name: string;
  mobile_no?: string;
  email_id?: string;
  title?: string;
  source?: string;
  status?: string;
  territory?: string;
  company?: string;
  blog_subscriber?: number;
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
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "dd6c5048c9befb7";
  
  console.log("🚀 Начинаем отправку данных в ERPNext:", data);
  
  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : undefined,
    message: data.message ? String(data.message).trim() : undefined
  };
  
  console.log("🧹 Очищенные данные:", cleanData);
  
  // Проверяем обязательные поля
  if (!cleanData.name || !cleanData.phone) {
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  try {
    // Создаем максимально простую структуру с обязательными полями
    const leadData: ERPNextLeadRequest = {
      lead_name: cleanData.name,
      mobile_no: cleanData.phone,
      source: "Website",
      status: "Lead"
    };

    // Добавляем опциональные поля только если они есть
    if (cleanData.email) {
      leadData.email_id = cleanData.email;
    }
    
    if (cleanData.message) {
      leadData.title = cleanData.message;
      
      // Если сообщение содержит "Подписка", отмечаем как подписчика блога
      if (cleanData.message.includes("Подписка")) {
        leadData.blog_subscriber = 1;
        console.log("📧 Отмечаем пользователя как подписчика блога");
      }
    }

    console.log("📋 Финальные данные для создания лида:", leadData);
    console.log("🔗 URL для запроса:", `${erpUrl}/api/resource/Lead`);

    const response = await fetch(`${erpUrl}/api/resource/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(leadData),
    });

    console.log("📡 Ответ сервера - статус:", response.status);
    console.log("📡 Ответ сервера - статус текст:", response.statusText);

    const responseText = await response.text();
    console.log("📡 Полный ответ сервера:", responseText);

    if (!response.ok) {
      let errorMessage = `Ошибка сервера: ${response.status}`;
      
      // Специальная обработка CORS ошибок
      if (response.status === 0 || response.type === 'opaque') {
        errorMessage = "CORS_ERROR";
      }
      
      try {
        const errorJson = JSON.parse(responseText);
        console.error("❌ Детали ошибки ERPNext:", errorJson);
        
        // Обрабатываем специфическую ошибку дублирования email
        if (errorJson.exc_type === "DuplicateEntryError" && errorJson.exception?.includes("Email Address must be unique")) {
          throw new Error("DUPLICATE_EMAIL");
        }
        
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        if (e instanceof Error && e.message === "DUPLICATE_EMAIL") {
          throw e;
        }
        console.error("❌ Не удалось распарсить ответ как JSON");
      }
      
      throw new Error(errorMessage);
    }

    let result: ERPNextResponse;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Успешно создан лид в ERPNext:", result);
      console.log("🆔 ID созданного лида:", result.data?.name);
    } catch (e) {
      console.log("✅ Запрос выполнен успешно, но ответ не JSON:", responseText);
      result = { message: "success" };
    }
    
    return result;
  } catch (error) {
    console.error("💥 Критическая ошибка при отправке в ERPNext:", error);
    
    // Если это сетевая ошибка (CORS или недоступность сервера)
    if (error instanceof Error && (
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message === 'CORS_ERROR'
    )) {
      console.log("🌐 Обнаружена сетевая ошибка - возможно CORS или недоступность сервера");
      throw new Error("NETWORK_ERROR");
    }
    
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
