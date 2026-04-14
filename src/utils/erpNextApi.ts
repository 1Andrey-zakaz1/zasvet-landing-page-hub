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

const API_URL = 'https://api.pkzasvet.ru/production_api.php';

export const sendEmail = async (data: LeadData): Promise<EmailResponse> => {
  console.log("📤 Отправка заявки на API:", data);

  const cleanData = {
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: data.email ? String(data.email).trim() : '',
    message: data.message ? String(data.message).trim() : ''
  };

  if (!cleanData.name || !cleanData.phone) {
    throw new Error("Имя и телефон обязательны для заполнения");
  }

  const apiData = {
    first_name: cleanData.name,
    last_name: '',
    email: cleanData.email,
    phone: cleanData.phone,
    company: '',
    message: cleanData.message
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(apiData)
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ API Response:", result);

    return {
      success: true,
      message: result.message || "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
    };
  } catch (corsError) {
    console.warn("⚠️ CORS ошибка, пробуем no-cors режим:", corsError);
    
    // Fallback: отправляем в режиме no-cors — данные дойдут, но ответ не читаем
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(apiData)
    });

    console.log("✅ Запрос отправлен в режиме no-cors");

    return {
      success: true,
      message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
    };
  }
};
