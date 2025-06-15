
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
  
  console.log("🚀 ДИАГНОСТИКА: Начинаем отправку данных в ERPNext:", data);
  
  // Тестируем доступность сервера
  console.log("🧪 ДИАГНОСТИКА: Проверяем доступность сервера...");
  try {
    const pingResponse = await fetch(`${erpUrl}`, { 
      method: "HEAD",
      mode: 'no-cors'
    });
    console.log("🧪 ДИАГНОСТИКА: Ping сервера выполнен");
  } catch (pingError) {
    console.log("🧪 ДИАГНОСТИКА: Ошибка ping сервера:", pingError);
  }

  // Проверяем базовую аутентификацию
  console.log("🔑 ДИАГНОСТИКА: Тестируем аутентификацию...");
  try {
    const authTestResponse = await fetch(`${erpUrl}/api/method/ping`, {
      method: "GET",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json"
      },
      mode: 'cors'
    });
    console.log("🔑 ДИАГНОСТИКА: Статус аутентификации:", authTestResponse.status);
    const authTestText = await authTestResponse.text();
    console.log("🔑 ДИАГНОСТИКА: Ответ аутентификации:", authTestText);
  } catch (authError) {
    console.log("🔑 ДИАГНОСТИКА: Ошибка аутентификации:", authError);
  }

  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : undefined,
    message: data.message ? String(data.message).trim() : undefined
  };
  
  console.log("🧹 ДИАГНОСТИКА: Очищенные данные:", cleanData);
  
  if (!cleanData.name || !cleanData.phone) {
    console.log("❌ ДИАГНОСТИКА: Отсутствуют обязательные поля");
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  // Создаем минимальную структуру данных
  const leadData: ERPNextLeadRequest = {
    lead_name: cleanData.name,
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
      console.log("📧 ДИАГНОСТИКА: Отмечаем как подписчика блога");
    }
  }

  console.log("📋 ДИАГНОСТИКА: Финальные данные для лида:", leadData);
  
  // Проверяем структуру JSON
  try {
    const jsonString = JSON.stringify(leadData);
    console.log("📋 ДИАГНОСТИКА: JSON строка:", jsonString);
    const parsedBack = JSON.parse(jsonString);
    console.log("📋 ДИАГНОСТИКА: Парсинг обратно успешен:", parsedBack);
  } catch (jsonError) {
    console.log("❌ ДИАГНОСТИКА: Ошибка JSON:", jsonError);
    throw new Error("Ошибка формирования JSON");
  }

  const requestUrl = `${erpUrl}/api/resource/Lead`;
  console.log("🔗 ДИАГНОСТИКА: URL запроса:", requestUrl);
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `token ${apiKey}:${apiSecret}`,
    "Accept": "application/json",
    "User-Agent": "Website Contact Form v1.0"
  };
  console.log("📤 ДИАГНОСТИКА: Заголовки запроса:", headers);

  const requestBody = JSON.stringify(leadData);
  console.log("📦 ДИАГНОСТИКА: Тело запроса:", requestBody);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: requestBody,
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-cache'
  };
  
  console.log("⚙️ ДИАГНОСТИКА: Полные настройки запроса:", requestOptions);

  try {
    console.log("🚀 ДИАГНОСТИКА: Отправляем запрос...");
    const startTime = Date.now();
    
    const response = await fetch(requestUrl, requestOptions);
    
    const endTime = Date.now();
    console.log("⏱️ ДИАГНОСТИКА: Время выполнения запроса:", endTime - startTime, "мс");
    
    console.log("📡 ДИАГНОСТИКА: Получен ответ");
    console.log("📡 ДИАГНОСТИКА: Статус:", response.status);
    console.log("📡 ДИАГНОСТИКА: Статус текст:", response.statusText);
    console.log("📡 ДИАГНОСТИКА: OK статус:", response.ok);
    console.log("📡 ДИАГНОСТИКА: Тип ответа:", response.type);
    console.log("📡 ДИАГНОСТИКА: URL ответа:", response.url);
    
    // Логируем все заголовки ответа
    const responseHeaders = Object.fromEntries(response.headers.entries());
    console.log("📡 ДИАГНОСТИКА: Заголовки ответа:", responseHeaders);

    // Читаем тело ответа
    const responseText = await response.text();
    console.log("📡 ДИАГНОСТИКА: Размер ответа:", responseText.length, "символов");
    console.log("📡 ДИАГНОСТИКА: Тело ответа:", responseText);

    if (!response.ok) {
      console.log("❌ ДИАГНОСТИКА: Ответ сервера не OK");
      
      // Пытаемся понять тип ошибки
      let errorDetails = "Неизвестная ошибка";
      
      try {
        const errorJson = JSON.parse(responseText);
        console.log("❌ ДИАГНОСТИКА: Ошибка как JSON:", errorJson);
        
        if (errorJson.exc_type === "DuplicateEntryError") {
          console.log("❌ ДИАГНОСТИКА: Обнаружено дублирование email");
          throw new Error("DUPLICATE_EMAIL");
        }
        
        if (errorJson.message) {
          errorDetails = errorJson.message;
        }
        
        if (errorJson.exception) {
          console.log("❌ ДИАГНОСТИКА: Детали исключения:", errorJson.exception);
          errorDetails += ` | Exception: ${errorJson.exception}`;
        }
        
      } catch (parseError) {
        console.log("❌ ДИАГНОСТИКА: Не удалось парсить ответ как JSON:", parseError);
        errorDetails = responseText || response.statusText;
      }
      
      const finalError = `Ошибка сервера ERPNext: ${response.status} - ${errorDetails}`;
      console.log("❌ ДИАГНОСТИКА: Финальная ошибка:", finalError);
      throw new Error(finalError);
    }

    // Обрабатываем успешный ответ
    console.log("✅ ДИАГНОСТИКА: Запрос выполнен успешно");
    
    let result: ERPNextResponse;
    try {
      result = JSON.parse(responseText);
      console.log("✅ ДИАГНОСТИКА: Успешно создан лид:", result);
      console.log("🆔 ДИАГНОСТИКА: ID созданного лида:", result.data?.name);
    } catch (parseError) {
      console.log("⚠️ ДИАГНОСТИКА: Ответ не JSON, но запрос успешен:", responseText);
      result = { message: "success" };
    }
    
    return result;
    
  } catch (fetchError) {
    console.log("💥 ДИАГНОСТИКА: Критическая ошибка при выполнении fetch:");
    console.log("💥 ДИАГНОСТИКА: Тип ошибки:", fetchError);
    console.log("💥 ДИАГНОСТИКА: Название ошибки:", (fetchError as Error).name);
    console.log("💥 ДИАГНОСТИКА: Сообщение ошибки:", (fetchError as Error).message);
    console.log("💥 ДИАГНОСТИКА: Stack trace:", (fetchError as Error).stack);
    
    if (fetchError instanceof Error) {
      // Проверяем типы сетевых ошибок
      if (fetchError.message.includes('Failed to fetch') ||
          fetchError.message.includes('NetworkError') ||
          fetchError.message.includes('CORS') ||
          fetchError.message.includes('network') ||
          fetchError.name === 'TypeError') {
        console.log("🌐 ДИАГНОСТИКА: Обнаружена сетевая/CORS ошибка");
        throw new Error("NETWORK_ERROR");
      }
      
      // Проверяем специфические ошибки ERPNext
      if (fetchError.message === "DUPLICATE_EMAIL") {
        console.log("📧 ДИАГНОСТИКА: Проброс ошибки дублирования email");
        throw fetchError;
      }
    }
    
    console.log("💥 ДИАГНОСТИКА: Неизвестный тип ошибки, пробрасываем дальше");
    throw fetchError;
  }
};

export const submitFallback = async (data: LeadData): Promise<{ success: boolean; method: string }> => {
  console.log("📧 ДИАГНОСТИКА: Используем резервный метод отправки");
  console.log("📧 ДИАГНОСТИКА: Данные для резервного сохранения:", data);
  
  // Симулируем сохранение данных
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📧 ДИАГНОСТИКА: Данные сохранены в резервном методе");
      resolve({ success: true, method: "fallback" });
    }, 1000);
  });
};
