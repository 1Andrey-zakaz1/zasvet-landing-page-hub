
import type { ChatResponse } from './types';

export const getDefaultResponse = (): ChatResponse => ({
  content: 'Добро пожаловать! Я помогу вам найти нужную информацию 🤖\n\n🛠️ **Доступные инструменты:**\n• **Интерактивный каталог** - поиск светильников по характеристикам\n• **Калькулятор окупаемости** - расчет экономии от LED\n• **Калькулятор освещенности** - проектирование освещения\n• **Калькулятор кабеля** - подбор сечения проводов\n\n❓ **Или задайте вопрос:**\n• О технических характеристиках\n• О нашей компании и продукции\n• Запросите консультацию специалиста\n\nВыберите нужный раздел или опишите, чем могу помочь!',
  actions: [
    {
      type: 'navigate',
      label: 'Интерактивный каталог',
      data: { sectionId: 'catalog' }
    },
    {
      type: 'navigate',
      label: 'Калькулятор окупаемости',
      data: { sectionId: 'led-calculator' }
    },
    {
      type: 'navigate',
      label: 'Калькулятор освещенности',
      data: { sectionId: 'illumination-calculator' }
    },
    {
      type: 'navigate',
      label: 'Связаться с нами',
      data: { sectionId: 'contacts' }
    }
  ]
});
