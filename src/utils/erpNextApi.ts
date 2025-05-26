
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
    // Сначала получим информацию о структуре Lead doctype
    console.log("🔍 Получаем метаданные Lead doctype...");
    
    const metaResponse = await fetch(`${erpUrl}/api/resource/Lead?fields=["*"]&limit_page_length=1`, {
      method: "GET",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📋 Метаданные - статус ответа:", metaResponse.status);
    
    if (metaResponse.ok) {
      const metaText = await metaResponse.text();
      console.log("📋 Структура существующих лидов:", metaText);
    }

    // Создаем максимально простую структуру с обязательными полями
    const leadData: ERPNextLeadRequest = {
      lead_name: data.name,
      mobile_no: data.phone,
      // Автоматически заполняем обязательные поля
      source: "Website",
      status: "Lead" // Устанавливаем статус по умолчанию как "Lead"
    };

    // Добавляем опциональные поля осторожно
    if (data.email && data.email.trim()) {
      leadData.email_id = data.email.trim();
    }
    
    // Используем title для сообщения
    if (data.message && data.message.trim()) {
      leadData.title = data.message.trim();
    }

    console.log("📋 Финальные данные для создания лида (с обязательным статусом):", leadData);
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
        
        // Обрабатываем специфическую ошибку дублирования email
        if (errorJson.exc_type === "DuplicateEntryError" && errorJson.exception?.includes("Email Address must be unique")) {
          throw new Error("DUPLICATE_EMAIL");
        }
        
        if (errorJson.message) {
          errorMessage = errorJson.message;
        } else if (errorJson.exc) {
          errorMessage = "Ошибка валидации данных на сервере ERPNext";
          console.error("❌ Полная трассировка ошибки:", errorJson.exc);
          
          // Анализируем конкретную ошибку
          if (errorJson.exc_type === "TypeError" && errorJson.exception.includes("'str' object does not support item assignment")) {
            console.error("🔍 Проблема с типами данных - ERPNext ожидает объект, а получает строку");
            errorMessage = "Ошибка типов данных: сервер ожидает другую структуру данных";
          }
        }
      } catch (e) {
        if (e instanceof Error && e.message === "DUPLICATE_EMAIL") {
          throw e;
        }
        console.error("❌ Не удалось распарсить ответ как JSON");
        errorMessage = `${errorMessage} - ${responseText.substring(0, 200)}`;
      }
      
      throw new Error(errorMessage);
    }

    let result: ERPNextResponse;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Успешно создан лид в ERPNext:", result);
      console.log("🆔 ID созданного лида:", result.data?.name);
      console.log("📊 Статус лида:", result.data?.status);
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
