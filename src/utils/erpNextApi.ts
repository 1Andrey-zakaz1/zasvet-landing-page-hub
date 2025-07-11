export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
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

// Улучшенная функция для тестирования API подключения
export const testERPNextConnection = async (): Promise<{ success: boolean; details: string }> => {
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "21c69324f115682";
  const apiSecret = "f60fe9bdacf6644";
  
  console.log("🔍 РАСШИРЕННАЯ ДИАГНОСТИКА API ПОДКЛЮЧЕНИЯ");
  console.log("=" .repeat(50));
  console.log("🔗 Целевой URL:", erpUrl);
  console.log("🌐 Текущий домен:", window.location.origin);
  console.log("🕐 Время запуска:", new Date().toISOString());
  
  try {
    // Тест 1: Проверим, что сервер вообще отвечает через простой запрос
    console.log("\n1️⃣ ТЕСТ: Проверка доступности сервера (простой запрос)");
    
    try {
      // Попробуем сначала самый простой запрос
      const simpleResponse = await fetch(`${erpUrl}/api/method/ping`, {
        method: "GET",
        mode: 'no-cors' // Попробуем без CORS для проверки доступности
      });
      
      console.log("✅ Сервер доступен (no-cors режим)");
      console.log("📡 Статус ответа:", simpleResponse.status);
      console.log("📡 Тип ответа:", simpleResponse.type);
      
    } catch (noCorsError) {
      console.log("❌ Сервер недоступен даже в no-cors режиме:", noCorsError);
      return {
        success: false,
        details: `Сервер недоступен: ${noCorsError instanceof Error ? noCorsError.message : String(noCorsError)}`
      };
    }
    
    // Тест 2: Проверим CORS с минимальными заголовками
    console.log("\n2️⃣ ТЕСТ: Минимальный CORS запрос");
    
    const minimalResponse = await fetch(`${erpUrl}/api/method/ping`, {
      method: "GET",
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log("✅ Минимальный CORS запрос успешен");
    console.log("📡 Статус:", minimalResponse.status);
    console.log("📡 Заголовки ответа:");
    for (const [key, value] of minimalResponse.headers.entries()) {
      console.log(`    ${key}: ${value}`);
    }
    
    const minimalText = await minimalResponse.text();
    console.log("📡 Тело ответа:", minimalText.substring(0, 200));
    
    // Тест 3: Проверим OPTIONS запрос (preflight)
    console.log("\n3️⃣ ТЕСТ: OPTIONS preflight запрос");
    
    const optionsResponse = await fetch(`${erpUrl}/api/method/ping`, {
      method: "OPTIONS",
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    
    console.log("📡 OPTIONS статус:", optionsResponse.status);
    console.log("📡 OPTIONS заголовки:");
    for (const [key, value] of optionsResponse.headers.entries()) {
      console.log(`    ${key}: ${value}`);
    }
    
    // Тест 4: Проверим авторизацию
    console.log("\n4️⃣ ТЕСТ: Авторизационный запрос");
    
    const authHeaders = {
      "Authorization": `token ${apiKey}:${apiSecret}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    
    const authResponse = await fetch(`${erpUrl}/api/method/frappe.auth.get_logged_user`, {
      method: "GET",
      headers: authHeaders,
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log("🔐 Auth статус:", authResponse.status);
    const authText = await authResponse.text();
    console.log("🔐 Auth ответ:", authText);
    
    if (authResponse.ok) {
      console.log("🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!");
      return {
        success: true,
        details: `Все тесты пройдены. Сервер доступен, CORS работает, авторизация OK.`
      };
    } else {
      return {
        success: false,
        details: `Авторизация не работает. Статус: ${authResponse.status}. Проверьте API ключи.`
      };
    }

  } catch (error) {
    console.log("💥 ОШИБКА В РАСШИРЕННОЙ ДИАГНОСТИКЕ");
    console.log("💥 Тип ошибки:", typeof error);
    console.log("💥 Название ошибки:", error instanceof Error ? error.name : "неизвестно");
    console.log("💥 Сообщение ошибки:", error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      // Анализируем тип ошибки
      if (errorMessage.includes('failed to fetch')) {
        return {
          success: false,
          details: `CORS БЛОКИРОВКА: Браузер заблокировал запрос из-за политики CORS. 
          
РЕШЕНИЯ:
1. Добавьте домен "${window.location.origin}" в CORS настройки ERPNext
2. Или добавьте "*" для разрешения всех доменов (временно)
3. Проверьте настройки в System Settings → CORS или Website Settings
4. Если есть доступ к серверу, добавьте в site_config.json настройки CORS

ТЕХНИЧЕСКАЯ ОШИБКА: ${error.message}`
        };
      }
      
      if (errorMessage.includes('network')) {
        return {
          success: false,
          details: `СЕТЕВАЯ ОШИБКА: Не удается подключиться к серверу ${erpUrl}. Проверьте доступность сервера.`
        };
      }
    }
    
    return {
      success: false,
      details: `Неизвестная ошибка: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

export const sendEmail = async (data: LeadData): Promise<EmailResponse> => {
  console.log("🎯 ERPNext API: Начинаем отправку заявки");
  console.log("🎯 ERPNext API: Входные данные:", data);
  
  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : '',
    message: data.message ? String(data.message).trim() : ''
  };
  
  console.log("🎯 ERPNext API: Очищенные данные:", cleanData);
  
  if (!cleanData.name || !cleanData.phone) {
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  // Учетные данные ERPNext API
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "21c69324f115682";
  const apiSecret = "f60fe9bdacf6644";
  
  console.log("🎯 ERPNext API: Подготовка к отправке");
  console.log("🎯 ERPNext API: URL:", erpUrl);
  
  // Подготавливаем данные для создания Communication документа
  const communicationData = {
    doctype: "Communication",
    communication_type: "Communication", 
    content: `Новая заявка с сайта:

Имя: ${cleanData.name}
Телефон: ${cleanData.phone}
Email: ${cleanData.email || 'Не указан'}
Сообщение: ${cleanData.message || 'Не указано'}

Дата подачи: ${new Date().toLocaleString('ru-RU')}`,
    sender: cleanData.email || "website@pkzasvet.ru",
    sender_full_name: cleanData.name,
    phone_no: cleanData.phone,
    subject: `Заявка с сайта от ${cleanData.name}`,
    communication_medium: "Website",
    sent_or_received: "Received",
    status: "Open"
  };
  
  console.log("🎯 ERPNext API: Данные документа:", communicationData);
  
  try {
    console.log("📤 ERPNext API: Отправляем запрос...");
    
    const response = await fetch(`${erpUrl}/api/resource/Communication`, {
      method: "POST",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify(communicationData)
    });
    
    console.log("📡 ERPNext API: Статус ответа:", response.status);
    console.log("📡 ERPNext API: Status text:", response.statusText);
    
    const responseText = await response.text();
    console.log("📡 ERPNext API: Ответ сервера:", responseText);
    
    if (response.ok) {
      console.log("✅ ERPNext API: Заявка успешно создана!");
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("✅ ERPNext API: Parsed data:", responseData);
      } catch (e) {
        console.log("✅ ERPNext API: Ответ не JSON, но статус OK");
      }
      
      return {
        success: true,
        message: "Заявка успешно отправлена в CRM систему! Мы свяжемся с вами в ближайшее время."
      };
    } else {
      console.error("❌ ERPNext API: Ошибка сервера");
      console.error("❌ ERPNext API: Статус:", response.status);
      console.error("❌ ERPNext API: Ответ:", responseText);
      
      // Попробуем понять ошибку из ответа
      let errorMessage = "Не удалось отправить заявку";
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.exc) {
          errorMessage = "Ошибка сервера CRM";
        }
      } catch (e) {
        // Если не JSON, используем стандартное сообщение
      }
      
      throw new Error(`ERPNext API Error: ${response.status} - ${errorMessage}`);
    }
    
  } catch (error) {
    console.error("💥 ERPNext API: Детальная ошибка:", error);
    
    if (error instanceof Error) {
      console.error("💥 ERPNext API: Сообщение ошибки:", error.message);
      
      // Анализируем тип ошибки
      if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
        throw new Error("CORS_ERROR: Проблема с доступом к CRM серверу. Обратитесь к администратору.");
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error("AUTH_ERROR: Ошибка авторизации в CRM системе.");
      }
      
      if (error.message.includes('404')) {
        throw new Error("API_ERROR: CRM API недоступен.");
      }
      
      if (error.message.includes('500')) {
        throw new Error("SERVER_ERROR: Внутренняя ошибка CRM сервера.");
      }
      
      // Если это наша кастомная ошибка, пробрасываем как есть
      if (error.message.includes('ERPNext API Error:')) {
        throw error;
      }
    }
    
    console.error("💥 ERPNext API: Неопознанная ошибка");
    throw new Error("Ошибка отправки заявки в CRM систему. Попробуйте позже или свяжитесь с нами по телефону +7 383 312-00-91");
  }
};

