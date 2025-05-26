import type { ChatResponse, KnowledgeItem } from './types';
import { searchCatalog, formatCatalogResponse } from './catalogSearch';

// База знаний компании
const knowledgeBase: KnowledgeItem[] = [
  // Расчеты освещения
  {
    keywords: ['рассчитать', 'расчет', 'освещение', 'склад', 'офис', 'помещение', 'калькулятор'],
    response: 'Для расчета освещения у нас есть специальные калькуляторы:\n\n• Калькулятор LED-освещения - для расчета количества светильников\n• Калькулятор освещенности - для точного расчета уровня освещения\n• Калькулятор кабеля - для расчета сечения проводов\n\nВыберите нужный калькулятор ниже:',
    actions: [
      {
        type: 'navigate',
        label: 'LED калькулятор',
        data: { sectionId: 'led-calculator' }
      },
      {
        type: 'navigate',
        label: 'Калькулятор освещенности',
        data: { sectionId: 'illumination-calculator' }
      },
      {
        type: 'navigate',
        label: 'Калькулятор кабеля',
        data: { sectionId: 'cable-calculator' }
      }
    ]
  },
  
  // Продукты и каталог
  {
    keywords: ['светильники', 'продукты', 'каталог', 'выбрать', 'подойдут', 'рекомендации'],
    response: 'В нашем каталоге представлены качественные LED-светильники для различных задач:\n\n• Промышленные светильники - для складов и производств\n• Офисные светильники - для комфортной работы\n• Уличные светильники - для наружного освещения\n• Специальные серии с разными характеристиками\n\nВы можете искать светильники прямо здесь или посмотреть каталог.',
    actions: [
      {
        type: 'navigate',
        label: 'Открыть каталог',
        data: { sectionId: 'catalog' }
      }
    ]
  },
  
  // IP-рейтинг и технические характеристики
  {
    keywords: ['ip', 'рейтинг', 'защита', 'влагозащита', 'пылезащита', 'ip65', 'ip54'],
    response: 'IP-рейтинг показывает уровень защиты светильника от внешних воздействий:\n\n• Первая цифра - защита от пыли (0-6)\n• Вторая цифра - защита от влаги (0-8)\n\nНапример:\n• IP20 - для сухих помещений (офисы)\n• IP54 - для влажных помещений \n• IP65 - для улицы и агрессивных сред\n\nВ каталоге можно фильтровать по IP-рейтингу.',
    actions: [
      {
        type: 'navigate',
        label: 'Фильтр по IP в каталоге',
        data: { sectionId: 'catalog' }
      }
    ]
  },
  
  // Консультация и контакты
  {
    keywords: ['консультация', 'специалист', 'связаться', 'помощь', 'вопрос', 'менеджер'],
    response: 'Наши специалисты готовы помочь с выбором освещения и расчетами!\n\nВы можете:\n• Заполнить форму обратной связи\n• Связаться с нами по телефону\n• Получить персональную консультацию\n\nОпишите вашу задачу, и мы подберем оптимальное решение.',
    actions: [
      {
        type: 'navigate',
        label: 'Форма обратной связи',
        data: { sectionId: 'contacts' }
      }
    ]
  },
  
  // Компания
  {
    keywords: ['компания', 'о нас', 'засвет', 'производство', 'завод'],
    response: 'ПК "Zасвет" - российская производственная компания, специализирующаяся на разработке и производстве LED-светильников.\n\n• Собственное производство\n• Контроль качества на всех этапах\n• Гарантия на всю продукцию\n• Техническая поддержка\n• Проектирование освещения\n\nМы помогаем снизить затраты на электроэнергию до 80%!'
  }
];

// Функция для определения, является ли запрос поиском по каталогу
const isCatalogSearchQuery = (message: string): boolean => {
  const catalogKeywords = [
    'найти', 'найди', 'поиск', 'ищу', 'покажи', 'есть ли',
    'минивольт', 'сокол', 'гармония', 'бутик', 'простор',
    'ватт', 'вт', 'люмен', 'лм', 'светильник', 'мощность', 'мощностью'
  ];
  
  const lowerMessage = message.toLowerCase();
  
  // Проверяем текстовые ключевые слова
  const hasKeywords = catalogKeywords.some(keyword => lowerMessage.includes(keyword));
  
  // Проверяем наличие чисел в запросе - это может быть поиск по техническим характеристикам
  const hasNumbers = /\d+/.test(message);
  
  // Если есть числа и ключевые слова поиска, или просто числа с "вт"/"ватт"
  const hasWattPattern = /\d+\s*(вт|ватт)/i.test(message);
  const hasLumenPattern = /\d+\s*(лм|люмен)/i.test(message);
  
  return hasKeywords || hasWattPattern || hasLumenPattern;
};

// Функция для поиска ответа в базе знаний
const findBestMatch = (userMessage: string): KnowledgeItem | null => {
  const message = userMessage.toLowerCase();
  let bestMatch: KnowledgeItem | null = null;
  let maxMatches = 0;
  
  for (const item of knowledgeBase) {
    const matches = item.keywords.filter(keyword => 
      message.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = item;
    }
  }
  
  return maxMatches > 0 ? bestMatch : null;
};

// Функция обработки сообщения пользователя
export const processUserMessage = async (message: string): Promise<ChatResponse> => {
  console.log('Processing user message:', message);
  console.log('Is catalog search query:', isCatalogSearchQuery(message));
  
  // Сначала проверяем, является ли это поиском по каталогу
  if (isCatalogSearchQuery(message)) {
    console.log('Performing catalog search for:', message);
    const searchResult = searchCatalog(message, 5);
    console.log('Search result:', searchResult);
    const response = formatCatalogResponse(searchResult);
    
    return {
      content: response,
      actions: [
        {
          type: 'navigate',
          label: 'Открыть каталог',
          data: { sectionId: 'catalog' }
        },
        {
          type: 'navigate',
          label: 'LED калькулятор',
          data: { sectionId: 'led-calculator' }
        }
      ]
    };
  }
  
  // Ищем совпадения в базе знаний
  const match = findBestMatch(message);
  
  if (match) {
    return {
      content: match.response,
      actions: match.actions
    };
  }
  
  // Если точного совпадения нет, даем общий ответ с возможностью поиска
  return {
    content: 'Спасибо за ваш вопрос! Я могу помочь с:\n\n• Поиском светильников в каталоге\n• Расчетами освещения\n• Выбором подходящих решений\n• Техническими характеристиками\n• Консультацией по продуктам\n\nВы можете описать, что ищете (например, "светильник 100 ватт") или выбрать один из разделов ниже:',
    actions: [
      {
        type: 'navigate',
        label: 'LED калькулятор',
        data: { sectionId: 'led-calculator' }
      },
      {
        type: 'navigate',
        label: 'Каталог продукции',
        data: { sectionId: 'catalog' }
      },
      {
        type: 'navigate',
        label: 'Связаться с нами',
        data: { sectionId: 'contacts' }
      }
    ]
  };
};
