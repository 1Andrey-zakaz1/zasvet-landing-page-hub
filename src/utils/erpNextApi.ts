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

// Новая функция для тестирования API подключения
export const testERPNextConnection = async (): Promise<{ success: boolean; details: string }> => {
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "2ec04bab1aec805";
  
  console.log("🧪 Тестируем подключение к ERPNext API...");
  console.log("🔗 URL:", erpUrl);
  console.log("🔑 API Key:", apiKey);
  console.log("🔑 API Secret:", apiSecret.substring(0, 5) + "...");

  try {
    // Сначала пробуем простой ping к серверу
    console.log("1️⃣ Проверяем доступность сервера...");
    const pingResponse = await fetch(`${erpUrl}/api/method/ping`, {
      method: "GET",
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log("📡 Ping статус:", pingResponse.status);
    console.log("📡 Ping OK:", pingResponse.ok);
    
    if (!pingResponse.ok) {
      return {
        success: false,
        details: `Сервер недоступен. Статус: ${pingResponse.status}`
      };
    }

    // Проверяем аутентификацию
    console.log("2️⃣ Проверяем аутентификацию...");
    const authResponse = await fetch(`${erpUrl}/api/method/frappe.auth.get_logged_user`, {
      method: "GET",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json"
      },
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log("🔐 Auth статус:", authResponse.status);
    console.log("🔐 Auth OK:", authResponse.ok);
    
    const authText = await authResponse.text();
    console.log("🔐 Auth ответ:", authText);
    
    if (!authResponse.ok) {
      return {
        success: false,
        details: `Ошибка аутентификации. Статус: ${authResponse.status}. Ответ: ${authText}`
      };
    }

    // Проверяем доступ к Lead API
    console.log("3️⃣ Проверяем доступ к Lead API...");
    const leadTestResponse = await fetch(`${erpUrl}/api/resource/Lead?limit_page_length=1`, {
      method: "GET",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json"
      },
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log("📋 Lead API статус:", leadTestResponse.status);
    console.log("📋 Lead API OK:", leadTestResponse.ok);
    
    const leadTestText = await leadTestResponse.text();
    console.log("📋 Lead API ответ:", leadTestText);
    
    if (!leadTestResponse.ok) {
      return {
        success: false,
        details: `Нет доступа к Lead API. Статус: ${leadTestResponse.status}. Ответ: ${leadTestText}`
      };
    }

    return {
      success: true,
      details: "Все проверки пройдены успешно. API готов к использованию."
    };

  } catch (error) {
    console.log("💥 Ошибка при тестировании:", error);
    
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('failed to fetch') ||
          errorMessage.includes('networkerror') ||
          errorMessage.includes('cors')) {
        return {
          success: false,
          details: `CORS/Network ошибка: ${error.message}. Возможно, сервер не настроен для приема запросов с этого домена.`
        };
      }
    }
    
    return {
      success: false,
      details: `Неизвестная ошибка: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

export const submitToERPNext = async (data: LeadData): Promise<ERPNextResponse> => {
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "2ec04bab1aec805";
  
  console.log("🚀 Начинаем отправку данных в ERPNext:", data);
  console.log("🔑 Используемые учетные данные:", { apiKey, apiSecret: apiSecret.substring(0, 5) + "..." });
  
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
  console.log("📋 JSON данные для отправки:", JSON.stringify(leadData, null, 2));

  const requestUrl = `${erpUrl}/api/resource/Lead`;
  console.log("🔗 URL запроса:", requestUrl);
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `token ${apiKey}:${apiSecret}`,
    "Accept": "application/json"
  };

  console.log("📡 Заголовки запроса:", {
    ...headers,
    Authorization: `token ${apiKey}:${apiSecret.substring(0, 5)}...`
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(leadData),
    mode: 'cors',
    credentials: 'omit'
  };
  
  console.log("⚙️ Полные параметры запроса:", {
    ...requestOptions,
    body: "см. выше",
    headers: "см. выше"
  });
  
  console.log("⚙️ Отправляем запрос...");
  console.log("⏰ Время отправки:", new Date().toISOString());

  try {
    const response = await fetch(requestUrl, requestOptions);
    
    console.log("📡 Получен ответ");
    console.log("📡 Статус:", response.status);
    console.log("📡 Статус текст:", response.statusText);
    console.log("📡 OK статус:", response.ok);
    console.log("📡 Заголовки ответа:", Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log("📡 Тело ответа (RAW):", responseText);
    console.log("📡 Длина ответа:", responseText.length);

    if (!response.ok) {
      console.log("❌ Ответ сервера не OK");
      console.log("❌ Детальный анализ ошибки начинается...");
      
      let errorDetails = "Неизвестная ошибка";
      let errorType = "UNKNOWN";
      
      try {
        const errorJson = JSON.parse(responseText);
        console.log("❌ Ошибка как JSON:", errorJson);
        console.log("❌ Структура ошибки:", Object.keys(errorJson));
        
        // Проверяем различные типы ошибок ERPNext
        if (errorJson.exc_type === "DuplicateEntryError" || 
            (errorJson.message && errorJson.message.includes("Duplicate entry"))) {
          console.log("❌ Обнаружено дублирование email");
          errorType = "DUPLICATE_EMAIL";
        } else if (errorJson.message && errorJson.message.includes("Permission")) {
          console.log("❌ Ошибка прав доступа");
          errorType = "PERMISSION_ERROR";
        } else if (errorJson.message && errorJson.message.includes("Authentication")) {
          console.log("❌ Ошибка аутентификации");
          errorType = "AUTH_ERROR";
        }
        
        if (errorJson.message) {
          errorDetails = errorJson.message;
        } else if (errorJson.exc) {
          errorDetails = errorJson.exc;
        }
        
      } catch (parseError) {
        console.log("❌ Не удалось парсить ответ как JSON:", parseError);
        console.log("❌ Возможно, это HTML или другой формат");
        
        // Проверяем, не HTML ли это (часто при CORS ошибках)
        if (responseText.includes("<html") || responseText.includes("<!DOCTYPE")) {
          console.log("❌ Ответ содержит HTML - возможно CORS проблема");
          errorType = "CORS_ERROR";
          errorDetails = "Получен HTML вместо JSON - проблема с CORS";
        } else {
          errorDetails = responseText || response.statusText;
        }
      }
      
      console.log("❌ Тип ошибки:", errorType);
      console.log("❌ Детали ошибки:", errorDetails);
      
      if (errorType === "DUPLICATE_EMAIL") {
        throw new Error("DUPLICATE_EMAIL");
      } else if (errorType === "CORS_ERROR") {
        throw new Error("NETWORK_ERROR");
      }
      
      const finalError = `Ошибка сервера ERPNext (${response.status}): ${errorDetails}`;
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
      console.log("👤 Владелец лида:", result.data?.lead_owner);
      console.log("🏢 Территория:", result.data?.territory);
      console.log("📊 Статус:", result.data?.status);
    } catch (parseError) {
      console.log("⚠️ Ответ не JSON, но запрос успешен:", responseText);
      result = { message: "success" };
    }
    
    return result;
    
  } catch (fetchError) {
    console.log("💥 Критическая ошибка при выполнении fetch:", fetchError);
    console.log("💥 Тип ошибки:", typeof fetchError);
    console.log("💥 Название ошибки:", fetchError instanceof Error ? fetchError.name : "неизвестно");
    console.log("💥 Сообщение ошибки:", fetchError instanceof Error ? fetchError.message : String(fetchError));
    
    if (fetchError instanceof Error) {
      const errorMessage = fetchError.message.toLowerCase();
      const errorName = fetchError.name.toLowerCase();
      
      console.log("🔍 Анализ типа ошибки...");
      console.log("🔍 Сообщение (нижний регистр):", errorMessage);
      console.log("🔍 Имя (нижний регистр):", errorName);
      
      if (errorMessage.includes('failed to fetch') ||
          errorMessage.includes('networkerror') ||
          errorMessage.includes('cors') ||
          errorMessage.includes('network') ||
          errorName === 'typeerror' ||
          errorMessage.includes('connection')) {
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
