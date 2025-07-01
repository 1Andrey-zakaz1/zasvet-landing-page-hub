
// Независимый тест API без предвзятости существующей логики
export const runIndependentAPITest = async () => {
  const baseUrl = "https://erp.pkzasvet.ru";
  const apiKey = "a2880258cc82ef9";
  const apiSecret = "2ec04bab1aec805";
  
  console.clear();
  console.log("=".repeat(60));
  console.log("🧪 НЕЗАВИСИМЫЙ ТЕСТ API - РАСШИРЕННАЯ ДИАГНОСТИКА");
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
  
  // Тест 2: Проверим простой GET к главной странице с CORS
  console.log("\n🔸 Тест 2: Простой GET к главной странице с CORS");
  try {
    const startTime = performance.now();
    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    const endTime = performance.now();
    
    tests.push({
      name: "GET главная страница (CORS)",
      status: response.ok ? "OK" : "PARTIAL",
      time: `${(endTime - startTime).toFixed(0)}ms`,
      details: `Статус: ${response.status}, Content-Type: ${response.headers.get('content-type')}`
    });
    
    console.log("✅ Главная страница доступна через CORS");
    console.log("📡 CORS заголовки ответа:");
    for (const [key, value] of response.headers.entries()) {
      if (key.toLowerCase().includes('access-control')) {
        console.log(`    ${key}: ${value}`);
      }
    }
  } catch (error) {
    tests.push({
      name: "GET главная страница (CORS)",
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ Главная страница недоступна через CORS:", error);
  }
  
  // Тест 3: Попробуем разные API эндпоинты
  const apiEndpoints = [
    '/api/method/ping',
    '/api/method/version', 
    '/api/method/frappe.utils.get_site_info',
    '/api/method/frappe.auth.get_logged_user'
  ];
  
  for (const endpoint of apiEndpoints) {
    console.log(`\n🔸 Тест API: ${endpoint}`);
    try {
      const startTime = performance.now();
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const endTime = performance.now();
      
      const responseText = await response.text();
      
      tests.push({
        name: `API ${endpoint}`,
        status: response.ok ? "OK" : "PARTIAL",
        time: `${(endTime - startTime).toFixed(0)}ms`,
        details: `Статус: ${response.status}, Размер: ${responseText.length}б`
      });
      
      console.log(`📡 ${endpoint} - Статус: ${response.status}`);
      console.log(`📡 Ответ (первые 200 символов): ${responseText.substring(0, 200)}`);
      
    } catch (error) {
      tests.push({
        name: `API ${endpoint}`,
        status: "FAIL",
        details: error instanceof Error ? error.message : String(error)
      });
      console.log(`❌ ${endpoint} провален:`, error);
    }
  }
  
  // Тест 4: CORS preflight для разных методов
  console.log("\n🔸 Тест 4: CORS Preflight для разных методов");
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  
  for (const method of methods) {
    console.log(`\n🔹 Preflight для ${method}`);
    try {
      const response = await fetch(`${baseUrl}/api/resource/Lead`, {
        method: 'OPTIONS',
        mode: 'cors',
        headers: {
          'Access-Control-Request-Method': method,
          'Access-Control-Request-Headers': 'Content-Type, Authorization',
          'Origin': window.location.origin
        }
      });
      
      const allowedMethods = response.headers.get('access-control-allow-methods');
      const allowedHeaders = response.headers.get('access-control-allow-headers');
      const allowedOrigin = response.headers.get('access-control-allow-origin');
      
      tests.push({
        name: `CORS Preflight ${method}`,
        status: response.ok ? "OK" : "FAIL",
        details: `Methods: ${allowedMethods}, Headers: ${allowedHeaders}, Origin: ${allowedOrigin}`
      });
      
      console.log(`📡 Preflight ${method}:`);
      console.log(`    Allowed Methods: ${allowedMethods}`);
      console.log(`    Allowed Headers: ${allowedHeaders}`);
      console.log(`    Allowed Origin: ${allowedOrigin}`);
      
    } catch (error) {
      tests.push({
        name: `CORS Preflight ${method}`,
        status: "FAIL",
        details: error instanceof Error ? error.message : String(error)
      });
      console.log(`❌ Preflight ${method} провален:`, error);
    }
  }
  
  // Тест 5: Проверим доступность статических файлов
  console.log("\n🔸 Тест 5: Статические файлы");
  const staticFiles = [
    '/assets/css/frappe-web.css',
    '/assets/js/frappe-web.min.js', 
    '/favicon.ico'
  ];
  
  for (const file of staticFiles) {
    try {
      const response = await fetch(`${baseUrl}${file}`, {
        method: 'HEAD',
        mode: 'cors'
      });
      
      tests.push({
        name: `Статический файл ${file}`,
        status: response.ok ? "OK" : "FAIL",
        details: `Статус: ${response.status}`
      });
      
      console.log(`📁 ${file}: ${response.status}`);
      
    } catch (error) {
      tests.push({
        name: `Статический файл ${file}`,
        status: "FAIL", 
        details: error instanceof Error ? error.message : String(error)
      });
      console.log(`❌ ${file} недоступен:`, error);
    }
  }
  
  // Тест 6: Проверим настройки браузера
  console.log("\n🔸 Тест 6: Информация о браузере и настройках");
  console.log("🌐 User Agent:", navigator.userAgent);
  console.log("🌐 Наш домен:", window.location.origin);
  console.log("🌐 Протокол:", window.location.protocol);
  console.log("🌐 Cookies включены:", navigator.cookieEnabled);
  console.log("🌐 Язык:", navigator.language);
  
  // Финальный отчет
  console.log("\n" + "=".repeat(60));
  console.log("📊 ИТОГОВЫЙ ОТЧЕТ РАСШИРЕННОЙ ДИАГНОСТИКИ");
  console.log("=".repeat(60));
  
  tests.forEach((test, index) => {
    const statusIcon = test.status === "OK" ? "✅" : 
                      test.status === "PARTIAL" ? "🟡" : "❌";
    console.log(`${statusIcon} ${index + 1}. ${test.name}: ${test.status}`);
    if (test.time) console.log(`   ⏱️ Время: ${test.time}`);
    if (test.details) console.log(`   📋 Детали: ${test.details}`);
    console.log("");
  });
  
  const passedTests = tests.filter(t => t.status === "OK").length;
  const partialTests = tests.filter(t => t.status === "PARTIAL").length;
  const totalTests = tests.length;
  
  console.log(`🏆 РЕЗУЛЬТАТ: ${passedTests}/${totalTests} тестов пройдено, ${partialTests} частично`);
  
  // Рекомендации на основе результатов
  console.log("\n🔧 РЕКОМЕНДАЦИИ:");
  
  if (passedTests === 0) {
    console.log("❌ Критическая проблема: API полностью недоступен");
    console.log("   • Проверьте, работает ли ERPNext сервер");
    console.log("   • Убедитесь, что порт 80/443 открыт");
    console.log("   • Проверьте настройки файрвола");
  } else if (passedTests < totalTests / 2) {
    console.log("⚠️ CORS проблема подтверждена");
    console.log("   • Проверьте правильность настроек в common_site_config.json");
    console.log("   • Убедитесь, что supervisor/systemd перезапущен");
    console.log("   • Попробуйте добавить '*' в allowed_origins временно");
  } else {
    console.log("🟡 Частичная доступность - возможны проблемы конфигурации");
  }
  
  return {
    passed: passedTests,
    partial: partialTests,
    total: totalTests,
    tests: tests,
    success: passedTests === totalTests
  };
};

// Функция для запуска из консоли браузера
export const testAPIFromConsole = () => {
  console.log("🚀 Запуск расширенного теста API...");
  runIndependentAPITest()
    .then(result => {
      console.log("✅ Расширенный тест завершен:", result);
    })
    .catch(error => {
      console.log("💥 Ошибка при выполнении расширенного теста:", error);
    });
};

// Глобальная функция для доступа из консоли
(window as any).testAPI = testAPIFromConsole;
