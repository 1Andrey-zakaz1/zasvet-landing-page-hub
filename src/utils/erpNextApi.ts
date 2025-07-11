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
  console.log("📧 Отправляем заявку на email:", data);
  
  // Очищаем и валидируем данные
  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : '',
    message: data.message ? String(data.message).trim() : ''
  };
  
  if (!cleanData.name || !cleanData.phone) {
    throw new Error("Имя и телефон обязательны для заполнения");
  }
  
  // Формируем письмо
  const emailSubject = `Новая заявка с сайта от ${cleanData.name}`;
  const emailBody = `
Новая заявка с сайта:

Имя: ${cleanData.name}
Телефон: ${cleanData.phone}
Email: ${cleanData.email || 'Не указан'}
Сообщение: ${cleanData.message || 'Не указано'}

Время подачи заявки: ${new Date().toLocaleString('ru-RU')}
`;

  // Используем mailto для открытия почтовой программы
  const mailtoLink = `mailto:zakaz@pkzasvet.ru?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  try {
    // Открываем почтовую программу
    window.open(mailtoLink, '_blank');
    
    console.log("✅ Почтовая программа открыта для отправки заявки");
    
    return {
      success: true,
      message: "Почтовая программа открыта. Отправьте письмо для завершения заявки."
    };
  } catch (error) {
    console.error("❌ Ошибка при открытии почтовой программы:", error);
    
    // В качестве fallback показываем данные для ручного копирования
    alert(`Не удалось открыть почтовую программу. Пожалуйста, отправьте письмо вручную на zakaz@pkzasvet.ru со следующими данными:

${emailBody}`);
    
    return {
      success: true,
      message: "Данные для отправки показаны в уведомлении."
    };
  }
};

export const submitFallback = async (data: LeadData): Promise<{ success: boolean; method: string }> => {
  console.log("📧 Используем резервный метод отправки");
  
  // Формируем данные для копирования
  const formattedData = `
Заявка с сайта:
Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email || 'Не указан'}
Сообщение: ${data.message || 'Не указано'}
Время: ${new Date().toLocaleString('ru-RU')}
  `.trim();
  
  // Копируем в буфер обмена
  try {
    await navigator.clipboard.writeText(formattedData);
    alert(`Данные заявки скопированы в буфер обмена. Отправьте их на zakaz@pkzasvet.ru или свяжитесь с менеджером по телефону +7 383 312-00-91`);
  } catch (error) {
    alert(`Данные заявки:

${formattedData}

Отправьте их на zakaz@pkzasvet.ru или свяжитесь с менеджером по телефону +7 383 312-00-91`);
  }
  
  return { success: true, method: "clipboard" };
};
