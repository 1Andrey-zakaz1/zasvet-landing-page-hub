
import type { ChatResponse } from './types';
import { knowledgeBase } from './knowledgeBase';
import { findBestMatch } from './searchLogic';
import { getDefaultResponse } from './defaultResponses';

// Функция обработки сообщения пользователя
export const processUserMessage = async (message: string): Promise<ChatResponse> => {
  console.log('Processing user message:', message);
  
  // Ищем совпадения в базе знаний
  const match = findBestMatch(message, knowledgeBase);
  
  if (match) {
    return {
      content: match.response,
      actions: match.actions
    };
  }
  
  // Если точного совпадения нет, даем общий ответ с навигацией к инструментам
  return getDefaultResponse();
};
