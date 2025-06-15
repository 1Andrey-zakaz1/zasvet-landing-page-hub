
export const testERPConnection = async (): Promise<boolean> => {
  const erpUrl = "https://erp.pkzasvet.ru";
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "dd6c5048c9befb7";
  
  try {
    console.log("🧪 Тестируем подключение к ERPNext...");
    
    // Пробуем простой GET запрос к API
    const response = await fetch(`${erpUrl}/api/method/frappe.auth.get_logged_user`, {
      method: "GET",
      headers: {
        "Authorization": `token ${apiKey}:${apiSecret}`,
        "Accept": "application/json"
      },
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log("🧪 Статус тестового запроса:", response.status);
    const responseText = await response.text();
    console.log("🧪 Ответ тестового запроса:", responseText);
    
    return response.ok;
  } catch (error) {
    console.error("🧪 Ошибка при тестировании подключения:", error);
    return false;
  }
};
