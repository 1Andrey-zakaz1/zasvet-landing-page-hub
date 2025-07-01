
// Независимый тест API без предвзятости существующей логики
export const runIndependentAPITest = async () => {
  const baseUrl = "https://erp.pkzasvet.ru";
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "2ec04bab1aec805";
  
  console.clear();
  console.log("=".repeat(60));
  console.log("🧪 НЕЗАВИСИМЫЙ ТЕСТ API - ЧИСТЫЙ ПОДХОД");
  console.log("=".repeat(60));
  
  const tests = [];
  
  // Тест 1: Простая проверка доступности
  console.log("\n🔸 Тест 1: Проверка доступности домена");
  try {
    const startTime = performance.now();
    const response = await fetch(`${baseUrl}`, { 
      method: 'HEAD',
      mode: 'no-cors'
    });
    const endTime = performance.now();
    
    tests.push({
      name: "Доступность домена",
      status: "OK", 
      time: `${(endTime - startTime).toFixed(0)}ms`,
      details: `Статус: ${response.status}, Тип: ${response.type}`
    });
    console.log("✅ Домен доступен");
  } catch (error) {
    tests.push({
      name: "Доступность домена", 
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ Домен недоступен:", error);
  }
  
  // Тест 2: CORS preflight
  console.log("\n🔸 Тест 2: CORS Preflight (OPTIONS)");
  try {
    const startTime = performance.now();
    const response = await fetch(`${baseUrl}/api/resource/Lead`, {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    const endTime = performance.now();
    
    const corsHeaders = {
      'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
      'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
      'access-control-allow-credentials': response.headers.get('access-control-allow-credentials')
    };
    
    tests.push({
      name: "CORS Preflight",
      status: response.ok ? "OK" : "FAIL",
      time: `${(endTime - startTime).toFixed(0)}ms`,
      details: JSON.stringify(corsHeaders, null, 2)
    });
    
    console.log("📋 CORS заголовки:", corsHeaders);
  } catch (error) {
    tests.push({
      name: "CORS Preflight",
      status: "FAIL", 
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ CORS Preflight провален:", error);
  }
  
  // Тест 3: Простой GET запрос к API
  console.log("\n🔸 Тест 3: Простой GET к API");
  try {
    const startTime = performance.now();
    const response = await fetch(`${baseUrl}/api/method/frappe.auth.get_logged_user`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`
      }
    });
    const endTime = performance.now();
    
    const responseText = await response.text();
    
    tests.push({
      name: "GET API запрос",
      status: response.ok ? "OK" : "FAIL",
      time: `${(endTime - startTime).toFixed(0)}ms`,
      details: `Статус: ${response.status}, Размер ответа: ${responseText.length} байт`
    });
    
    console.log(`📡 Ответ API (${response.status}):`, responseText.substring(0, 200));
  } catch (error) {
    tests.push({
      name: "GET API запрос",
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error) 
    });
    console.log("❌ GET API запрос провален:", error);
  }
  
  // Тест 4: POST запрос для создания лида
  console.log("\n🔸 Тест 4: POST запрос создания лида");
  try {
    const testData = {
      first_name: "Test User",
      mobile_no: "+7900123456", 
      source: "Website Test"
    };
    
    const startTime = performance.now();
    const response = await fetch(`${baseUrl}/api/resource/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${apiKey}:${apiSecret}`
      },
      body: JSON.stringify(testData)
    });
    const endTime = performance.now();
    
    const responseText = await response.text();
    
    tests.push({
      name: "POST создание лида",
      status: response.ok ? "OK" : "FAIL", 
      time: `${(endTime - startTime).toFixed(0)}ms`,
      details: `Статус: ${response.status}, Ответ: ${responseText.substring(0, 100)}`
    });
    
    console.log(`📤 POST результат (${response.status}):`, responseText.substring(0, 200));
  } catch (error) {
    tests.push({
      name: "POST создание лида",
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error)
    });  
    console.log("❌ POST запрос провален:", error);
  }
  
  // Финальный отчет
  console.log("\n" + "=".repeat(60));
  console.log("📊 ИТОГОВЫЙ ОТЧЕТ ТЕСТИРОВАНИЯ");
  console.log("=".repeat(60));
  
  tests.forEach((test, index) => {
    const statusIcon = test.status === "OK" ? "✅" : "❌";
    console.log(`${statusIcon} ${index + 1}. ${test.name}: ${test.status}`);
    if (test.time) console.log(`   ⏱️ Время: ${test.time}`);
    if (test.details) console.log(`   📋 Детали: ${test.details}`);
    console.log("");
  });
  
  const passedTests = tests.filter(t => t.status === "OK").length;
  const totalTests = tests.length;
  
  console.log(`🏆 РЕЗУЛЬТАТ: ${passedTests}/${totalTests} тестов пройдено`);
  
  if (passedTests === totalTests) {
    console.log("🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ! API работает корректно.");
  } else {
    console.log("⚠️ ЕСТЬ ПРОБЛЕМЫ. Необходимо исправить CORS настройки на сервере.");
  }
  
  return {
    passed: passedTests,
    total: totalTests,
    tests: tests,
    success: passedTests === totalTests
  };
};

// Функция для запуска из консоли браузера
export const testAPIFromConsole = () => {
  console.log("🚀 Запуск независимого теста API...");
  runIndependentAPITest()
    .then(result => {
      console.log("✅ Тест завершен:", result);
    })
    .catch(error => {
      console.log("💥 Ошибка при выполнении теста:", error);
    });
};

// Глобальная функция для доступа из консоли
(window as any).testAPI = testAPIFromConsole;
