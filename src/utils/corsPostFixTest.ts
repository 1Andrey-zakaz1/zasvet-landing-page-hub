
// Тест CORS после настройки nginx
export const testCorsAfterNginxFix = async () => {
  const baseUrl = "https://erp.pkzasvet.ru";
  
  console.clear();
  console.log("🔧 ТЕСТ CORS ПОСЛЕ НАСТРОЙКИ NGINX");
  console.log("=" .repeat(50));
  console.log("🕐 Время теста:", new Date().toISOString());
  console.log("🌐 Наш домен:", window.location.origin);
  
  const tests = [];
  
  // Тест 1: Проверяем OPTIONS запрос к /api/resource/Lead
  console.log("\n🔸 Тест 1: OPTIONS запрос к /api/resource/Lead");
  try {
    const optionsResponse = await fetch(`${baseUrl}/api/resource/Lead`, {
      method: "OPTIONS",
      mode: 'cors',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
        'Origin': window.location.origin
      }
    });
    
    console.log("📡 OPTIONS статус:", optionsResponse.status);
    console.log("📡 OPTIONS заголовки ответа:");
    
    const corsHeaders = {};
    for (const [key, value] of optionsResponse.headers.entries()) {
      console.log(`    ${key}: ${value}`);
      if (key.toLowerCase().includes('access-control')) {
        corsHeaders[key] = value;
      }
    }
    
    const allowOrigin = optionsResponse.headers.get('access-control-allow-origin');
    const allowMethods = optionsResponse.headers.get('access-control-allow-methods');
    const allowHeaders = optionsResponse.headers.get('access-control-allow-headers');
    
    tests.push({
      name: "OPTIONS /api/resource/Lead",
      status: optionsResponse.ok ? "OK" : "FAIL",
      details: `Origin: ${allowOrigin}, Methods: ${allowMethods}, Headers: ${allowHeaders}`
    });
    
    console.log("🔍 Анализ CORS заголовков:");
    console.log(`   - Access-Control-Allow-Origin: ${allowOrigin || 'ОТСУТСТВУЕТ'}`);
    console.log(`   - Access-Control-Allow-Methods: ${allowMethods || 'ОТСУТСТВУЕТ'}`);
    console.log(`   - Access-Control-Allow-Headers: ${allowHeaders || 'ОТСУТСТВУЕТ'}`);
    
    if (allowOrigin && (allowOrigin === '*' || allowOrigin === window.location.origin)) {
      console.log("✅ Origin разрешен");
    } else {
      console.log("❌ Origin НЕ разрешен!");
    }
    
    if (allowMethods && allowMethods.includes('POST')) {
      console.log("✅ POST метод разрешен");
    } else {
      console.log("❌ POST метод НЕ разрешен!");
    }
    
    if (allowHeaders && allowHeaders.includes('Authorization') && allowHeaders.includes('Content-Type')) {
      console.log("✅ Необходимые заголовки разрешены");
    } else {
      console.log("❌ Необходимые заголовки НЕ разрешены!");
    }
    
  } catch (error) {
    tests.push({
      name: "OPTIONS /api/resource/Lead",
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ OPTIONS запрос провален:", error);
  }
  
  // Тест 2: Пробуем реальный POST запрос с авторизацией
  console.log("\n🔸 Тест 2: Реальный POST запрос к /api/resource/Lead");
  try {
    const testLeadData = {
      first_name: "CORS Test User",
      mobile_no: "+7 999 999 9999",
      source: "Website Test",
      status: "Lead"
    };
    
    const postResponse = await fetch(`${baseUrl}/api/resource/Lead`, {
      method: "POST",
      mode: 'cors',
      credentials: 'omit',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "token a2880258cc82ef9:2ec04bab1aec805",
        "Accept": "application/json"
      },
      body: JSON.stringify(testLeadData)
    });
    
    console.log("📡 POST статус:", postResponse.status);
    console.log("📡 POST заголовки ответа:");
    for (const [key, value] of postResponse.headers.entries()) {
      console.log(`    ${key}: ${value}`);
    }
    
    const responseText = await postResponse.text();
    console.log("📡 POST тело ответа:", responseText.substring(0, 500));
    
    tests.push({
      name: "POST /api/resource/Lead",
      status: postResponse.ok ? "OK" : postResponse.status === 403 ? "AUTH_ERROR" : "FAIL",
      details: `Статус: ${postResponse.status}, Размер ответа: ${responseText.length}б`
    });
    
    if (postResponse.ok) {
      console.log("🎉 POST запрос успешен!");
    } else if (postResponse.status === 403) {
      console.log("🔐 Ошибка авторизации (но CORS работает!)");
    } else {
      console.log("❌ POST запрос провален, но причина может быть не в CORS");
    }
    
  } catch (error) {
    tests.push({
      name: "POST /api/resource/Lead",
      status: "CORS_FAIL",
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ POST запрос провален (возможно CORS):", error);
  }
  
  // Тест 3: Проверяем GET запрос для сравнения
  console.log("\n🔸 Тест 3: GET запрос для сравнения");
  try {
    const getResponse = await fetch(`${baseUrl}/api/method/ping`, {
      method: "GET",
      mode: 'cors',
      headers: {
        "Accept": "application/json"
      }
    });
    
    console.log("📡 GET статус:", getResponse.status);
    const getText = await getResponse.text();
    console.log("📡 GET ответ:", getText.substring(0, 200));
    
    tests.push({
      name: "GET /api/method/ping",
      status: getResponse.ok ? "OK" : "FAIL",
      details: `Статус: ${getResponse.status}`
    });
    
  } catch (error) {
    tests.push({
      name: "GET /api/method/ping",
      status: "FAIL",
      details: error instanceof Error ? error.message : String(error)
    });
    console.log("❌ GET запрос провален:", error);
  }
  
  // Финальный отчет
  console.log("\n" + "=".repeat(50));
  console.log("📊 ОТЧЕТ О СОСТОЯНИИ CORS ПОСЛЕ НАСТРОЙКИ NGINX");
  console.log("=".repeat(50));
  
  tests.forEach((test, index) => {
    const statusIcon = test.status === "OK" ? "✅" : 
                      test.status === "AUTH_ERROR" ? "🔐" :
                      test.status === "CORS_FAIL" ? "🚫" : "❌";
    console.log(`${statusIcon} ${index + 1}. ${test.name}: ${test.status}`);
    if (test.details) console.log(`   📋 ${test.details}`);
  });
  
  const passedTests = tests.filter(t => t.status === "OK" || t.status === "AUTH_ERROR").length;
  const totalTests = tests.length;
  
  console.log(`\n🏆 РЕЗУЛЬТАТ: ${passedTests}/${totalTests} тестов показывают работающий CORS`);
  
  if (tests.some(t => t.name.includes("OPTIONS") && t.status === "OK")) {
    console.log("🎯 ВЫВОД: Настройки nginx сработали! CORS должен работать.");
    console.log("💡 Если форма все еще не работает, проблема не в CORS.");
  } else {
    console.log("⚠️ ВЫВОД: OPTIONS запросы все еще не работают.");
    console.log("🔧 Возможно, нужно перезапустить nginx или проверить конфигурацию.");
  }
  
  return {
    passed: passedTests,
    total: totalTests,
    tests: tests,
    corsWorking: tests.some(t => t.name.includes("OPTIONS") && t.status === "OK")
  };
};

// Функция для быстрого запуска из консоли
export const testCorsNow = () => {
  console.log("🚀 Запуск теста CORS после настройки nginx...");
  testCorsAfterNginxFix()
    .then(result => {
      console.log("✅ Тест завершен:", result);
    })
    .catch(error => {
      console.log("💥 Ошибка при тестировании:", error);
    });
};

// Глобальная функция
(window as any).testCorsNow = testCorsNow;
