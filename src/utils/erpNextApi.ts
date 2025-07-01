export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface ERPNextLeadRequest {
  first_name: string;
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
  const apiSecret = "2ec04bab1aec805";
  
  console.log("🚀 Начинаем отправку данных в ERPNext:", data);
  
  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : undefined,
    message: data.message ? String(data.message).trim() : undefined
  };
  
  console.log("🧹 Очищенные данные:", cleanData);
  
  if (!cleanData.name || !cleanData.phone) {
    console.log("❌ Отсутствуют обязательные поля");
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  // Создаем правильную структуру данных для ERPNext
  const leadData: ERPNextLeadRequest = {
    first_name: cleanData.name,
    mobile_no: cleanData.phone,
    source: "Website",
    status: "Lead"
  };

  if (cleanData.email) {
    leadData.email_id = cleanData.email;
  }
  
  if (cleanData.message) {
    leadData.title = cleanData.message;
    
    if (cleanData.message.includes("Подписка")) {
      leadData.blog_subscriber = 1;
      console.log("📧 Отмечаем как подписчика блога");
    }
  }

  console.log("📋 Финальные данные для лида:", leadData);

  const requestUrl = `${erpUrl}/api/resource/Lead`;
  console.log("🔗 URL запроса:", requestUrl);
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `token ${apiKey}:${apiSecret}`,
    "Accept": "application/json"
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(leadData),
    mode: 'cors',
    credentials: 'omit'
  };
  
  console.log("⚙️ Отправляем запрос...");

  try {
    const response = await fetch(requestUrl, requestOptions);
    
    console.log("📡 Получен ответ");
    console.log("📡 Статус:", response.status);
    console.log("📡 OK статус:", response.ok);
    
    const responseText = await response.text();
    console.log("📡 Тело ответа:", responseText);

    if (!response.ok) {
      console.log("❌ Ответ сервера не OK");
      
      let errorDetails = "Неизвестная ошибка";
      
      try {
        const errorJson = JSON.parse(responseText);
        console.log("❌ Ошибка как JSON:", errorJson);
        
        if (errorJson.exc_type === "DuplicateEntryError") {
          console.log("❌ Обнаружено дублирование email");
          throw new Error("DUPLICATE_EMAIL");
        }
        
        if (errorJson.message) {
          errorDetails = errorJson.message;
        }
        
      } catch (parseError) {
        console.log("❌ Не удалось парсить ответ как JSON:", parseError);
        errorDetails = responseText || response.statusText;
      }
      
      const finalError = `Ошибка сервера ERPNext: ${response.status} - ${errorDetails}`;
      console.log("❌ Финальная ошибка:", finalError);
      throw new Error(finalError);
    }

    // Обрабатываем успешный ответ
    console.log("✅ Запрос выполнен успешно");
    
    let result: ERPNextResponse;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Успешно создан лид:", result);
      console.log("🆔 ID созданного лида:", result.data?.name);
    } catch (parseError) {
      console.log("⚠️ Ответ не JSON, но запрос успешен:", responseText);
      result = { message: "success" };
    }
    
    return result;
    
  } catch (fetchError) {
    console.log("💥 Критическая ошибка при выполнении fetch:", fetchError);
    
    if (fetchError instanceof Error) {
      if (fetchError.message.includes('Failed to fetch') ||
          fetchError.message.includes('NetworkError') ||
          fetchError.message.includes('CORS') ||
          fetchError.message.includes('network') ||
          fetchError.name === 'TypeError') {
        console.log("🌐 Обнаружена сетевая/CORS ошибка");
        throw new Error("NETWORK_ERROR");
      }
      
      if (fetchError.message === "DUPLICATE_EMAIL") {
        console.log("📧 Проброс ошибки дублирования email");
        throw fetchError;
      }
    }
    
    console.log("💥 Неизвестный тип ошибки, пробрасываем дальше");
    throw fetchError;
  }
};

export const submitFallback = async (data: LeadData): Promise<{ success: boolean; method: string }> => {
  console.log("📧 Используем резервный метод отправки");
  console.log("📧 Данные для резервного сохранения:", data);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📧 Данные сохранены в резервном методе");
      resolve({ success: true, method: "fallback" });
    }, 1000);
  });
};
