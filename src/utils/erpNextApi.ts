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
  console.log("📧 ДИАГНОСТИКА EmailJS: Начинаем отправку");
  console.log("📧 ДИАГНОСТИКА EmailJS: Входные данные:", data);
  
  // Статический импорт EmailJS - исправляем проблему с динамическим импортом
  const emailjs = (await import('@emailjs/browser')).default;
  console.log("📧 ДИАГНОСТИКА EmailJS: Библиотека загружена:", emailjs);
  
  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : '',
    message: data.message ? String(data.message).trim() : ''
  };
  
  console.log("📧 ДИАГНОСТИКА EmailJS: Очищенные данные:", cleanData);
  
  if (!cleanData.name || !cleanData.phone) {
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  // Учетные данные EmailJS - проверьте эти значения в вашем EmailJS dashboard
  const serviceId = 'service_yandex';  // Попробуем оригинальный service ID
  const templateId = 'template_yb1rrki';
  const publicKey = 'EKSgYUwgXasi-p-UW';
  
  console.log("📧 ДИАГНОСТИКА EmailJS: Учетные данные:");
  console.log("  Service ID:", serviceId);
  console.log("  Template ID:", templateId);  
  console.log("  Public Key:", publicKey);
  
  // Параметры для EmailJS шаблона
  const templateParams = {
    from_name: cleanData.name,
    from_phone: cleanData.phone,
    from_email: cleanData.email || 'Не указан',
    message: cleanData.message || 'Не указано',
    to_email: 'zakaz@pkzasvet.ru',
    reply_to: cleanData.email || 'noreply@pkzasvet.ru',
    submission_time: new Date().toLocaleString('ru-RU')
  };
  
  console.log("📧 ДИАГНОСТИКА EmailJS: Параметры шаблона:", templateParams);
  
  try {
    console.log("📤 ДИАГНОСТИКА EmailJS: Отправляем через EmailJS напрямую...");
    
    // Отправляем письмо через EmailJS с правильными параметрами
    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      {
        publicKey: publicKey  // Передаем как объект с publicKey
      }
    );
    
    console.log("✅ ДИАГНОСТИКА EmailJS: Письмо отправлено успешно!");
    console.log("✅ ДИАГНОСТИКА EmailJS: Результат:", result);
    
    return {
      success: true,
      message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
    };
    
  } catch (error) {
    console.error("❌ ДИАГНОСТИКА EmailJS: Детальная ошибка:", error);
    console.error("❌ ДИАГНОСТИКА EmailJS: Тип ошибки:", typeof error);
    console.error("❌ ДИАГНОСТИКА EmailJS: Конструктор ошибки:", error?.constructor?.name);
    
    // Логируем все свойства ошибки
    if (error && typeof error === 'object') {
      console.error("❌ ДИАГНОСТИКА EmailJS: Свойства ошибки:");
      for (const [key, value] of Object.entries(error)) {
        console.error(`  ${key}:`, value);
      }
    }
    
    // Специальная обработка для EmailJS ошибок
    if (error && typeof error === 'object' && 'status' in error) {
      const emailJsError = error as { status: number; text: string };
      console.error("❌ ДИАГНОСТИКА EmailJS: Статус ошибки:", emailJsError.status);
      console.error("❌ ДИАГНОСТИКА EmailJS: Текст ошибки:", emailJsError.text);
      
      switch (emailJsError.status) {
        case 404:
          console.error("❌ ДИАГНОСТИКА EmailJS: 404 - Аккаунт не найден. Проверьте Service ID и учетные данные.");
          throw new Error("EMAILJS_ACCOUNT_NOT_FOUND");
        case 400:
          console.error("❌ ДИАГНОСТИКА EmailJS: 400 - Неверные параметры запроса.");
          throw new Error("EMAILJS_BAD_REQUEST");
        case 403:
          console.error("❌ ДИАГНОСТИКА EmailJS: 403 - Доступ запрещен. Проверьте Public Key.");
          throw new Error("EMAILJS_FORBIDDEN");
        case 422:
          console.error("❌ ДИАГНОСТИКА EmailJS: 422 - Неверный шаблон или параметры.");
          throw new Error("EMAILJS_INVALID_TEMPLATE");
        default:
          console.error("❌ ДИАГНОСТИКА EmailJS: Неизвестная ошибка статус:", emailJsError.status);
          throw new Error("EMAILJS_UNKNOWN_ERROR");
      }
    }
    
    // Проверяем тип ошибки для общих случаев
    if (error instanceof Error) {
      console.error("❌ ДИАГНОСТИКА EmailJS: Стандартная ошибка:", error.message);
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error("NETWORK_ERROR");
      }
      if (error.message.includes('forbidden') || error.message.includes('unauthorized')) {
        throw new Error("AUTH_ERROR");
      }
    }
    
    console.error("❌ ДИАГНОСТИКА EmailJS: Неопознанная ошибка, переходим к fallback");
    throw new Error("EMAIL_SEND_ERROR");
  }
};

