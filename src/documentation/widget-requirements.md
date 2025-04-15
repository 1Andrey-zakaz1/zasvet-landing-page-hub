
# Требования к форматированию кода виджета для Replit

## Общие требования к оформлению кода

1. **Структура компонента:**
   - Разделить виджет на логические блоки (фото консультанта и диалоговая форма)
   - Использовать чистую и понятную структуру кода
   - Строго придерживаться подхода React с функциональными компонентами

2. **Стиль кодирования:**
   - Использовать TypeScript для типизации
   - Соблюдать единообразие отступов (2 пробела)
   - Следовать стандартным соглашениям ES6+
   - Писать комментарии к сложным частям кода

3. **Интеграция:**
   - Виджет не должен содержать своих глобальных стилей, которые могут повлиять на остальную часть сайта
   - Использовать только предоставленные API для взаимодействия с ботом
   - Не использовать внешние зависимости, кроме явно одобренных

## Требования к дизайну и интерфейсу

1. **Цветовая схема:**
   - Основной фон: #000000 (черный)
   - Акцентный цвет: #ffbd00 (золотой)
   - Дополнительный золотой: #d9a200 (темно-золотой)
   - Текст на черном фоне: #FFFFFF (белый)
   - Текст на золотом фоне: #161616 (темно-серый)
   - Серый для фона элементов: #333333

2. **Шрифты и типографика:**
   - Использовать системные шрифты без засечек
   - Заголовки: font-bold
   - Размер основного текста: 16px (1rem)
   - Размер заголовка виджета: 20-24px (1.25-1.5rem)

3. **Компоновка виджета:**
   - Двухколоночная структура на десктопе (фото слева, форма справа)
   - Одноколоночная структура на мобильных устройствах (фото сверху, форма снизу)
   - Общая ширина: 100% контейнера, в котором размещен виджет
   - Отступы между элементами: 1.5rem (24px)
   - Скругление углов элементов: 0.5rem (8px)

4. **Оформление элементов:**
   - Кнопки: фон #ffbd00, текст #161616, при наведении #d9a200
   - Поля ввода: черная обводка с золотым акцентом при фокусе
   - Карточка консультанта: черный фон с золотой обводкой

5. **Адаптивность:**
   - Переключение на одноколоночную структуру при ширине < 768px
   - Уменьшение отступов на мобильных устройствах
   - Адаптивный размер шрифта

## Технические требования

1. **JavaScript/TypeScript:**
   - Использовать React hooks для управления состоянием
   - Избегать излишних ререндеров (useMemo, useCallback)
   - Строгая типизация всех пропсов и функций

2. **HTML/JSX:**
   - Использовать семантические теги (section, heading, etc.)
   - Соблюдать доступность (aria-атрибуты)
   - Правильные alt-теги для изображений

3. **CSS/Tailwind:**
   - Использовать классы Tailwind для стилизации
   - Следовать структуре классов из существующего проекта
   - Использовать рекомендованные классы для темных тем

## Описание API для интеграции с Telegram-ботом

```typescript
// Отправка сообщения в Telegram бот
const openCalculatorChat = (type: string) => {
  // Отправляет событие для открытия чата с определенным типом расчета
  const event = new CustomEvent('openCalculatorChat', { detail: { type } });
  window.dispatchEvent(event);
};

// Пример использования:
// openCalculatorChat('lighting_selection:Нужно освещение для склада 500м²');
// openCalculatorChat('lighting_calculator'); // Открыть полный калькулятор
```

## Пример корректной разметки

```jsx
<section className="bg-zasvet-black py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="section-title text-zasvet-white mb-12">Подбор освещения</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Секция с фото консультанта */}
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute -top-4 -right-4 bg-zasvet-gold text-zasvet-black rounded-full p-3">
            <Icon className="h-6 w-6" />
          </div>
          <img 
            src="/path-to-image.png" 
            alt="Электронный консультант" 
            className="rounded-lg w-full max-w-sm border-2 border-zasvet-gold/30"
          />
        </div>
        <div className="text-center max-w-sm">
          <h3 className="text-xl font-bold text-zasvet-gold mb-2">Электронный консультант</h3>
          <p className="text-zasvet-white/80">
            Описание консультанта и его возможностей
          </p>
        </div>
      </div>
      
      {/* Диалоговая форма */}
      <div>
        <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl">
          <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
            <CardTitle className="text-xl">Название формы</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Содержимое формы */}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
```

## Требования к изображениям

- Фото консультанта: профессиональное, деловой стиль, нейтральный фон
- Размер: минимум 400x400px, оптимально 600x600px
- Формат: WebP или PNG с прозрачностью, оптимизированный для быстрой загрузки
- Размещение: внутри контейнера с соотношением сторон 1:1 (квадрат)
- Обработка: легкая виньетка или эффект свечения для выделения на темном фоне

## Важные стилевые классы для использования

```css
/* Заголовки разделов */
.section-title {
  @apply text-3xl md:text-4xl font-bold mb-12 relative inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  @apply bg-zasvet-gold;
}

/* Золотой градиент для элементов */
.gold-gradient {
  background: linear-gradient(145deg, #ffbd00, #d9a200);
}

/* Золотой текст */
.gold-text {
  background: linear-gradient(145deg, #ffbd00, #d9a200);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
